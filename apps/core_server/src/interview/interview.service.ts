import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { QueryResult } from 'neo4j-driver';
import Neode from 'neode';

import { NEO4J_TOKEN } from '@/database/neode.provider';
import { Tfollowup } from '@/questions/questions.dto';

@Injectable()
export class InterviewService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @Inject(NEO4J_TOKEN) private readonly neode: Neode
  ) {}

  async findAll() {
    const res = await this.neo4jService.read('MATCH (i:Interview) RETURN i', {});
    return res.records.map(record => record.get('i'));
  }

  async createInterview(
    interviewerId: string,
    candidateId: string,
    questions: string[],
    timeDuration: string
  ) {

    const interviewerRes = await this.neo4jService.read(
      'MATCH (m:User {id: $interviewerId, role: \'Interviewer\'}) RETURN m',
      { interviewerId }
    );

    const candidateRes = await this.neo4jService.read(
      'MATCH (s:User {id: $candidateId, role: \'Candidate\'}) RETURN s',
      { candidateId }
    );

    const interviewer = interviewerRes.records[0]?.get('m') || null;
    const candidate = candidateRes.records[0]?.get('s') || null;

    if (!interviewer || !candidate) {
      throw new HttpException(
        'Interviewer or candidate not found!',
        HttpStatus.NOT_FOUND
      );
    }

    const questionCheckRes = await this.neo4jService.read(
      `
      MATCH (q:Question)
      WHERE q.id IN $questionIds
      RETURN collect(q.id) AS existingQuestionIds
      `,
      { questionIds: questions }
    );

    const existingQuestionIds = questionCheckRes.records[0]?.get('existingQuestionIds') || [];
    const missingQuestions = questions.filter(id => !existingQuestionIds.includes(id));

    if (missingQuestions.length > 0) {
      throw new HttpException(
        `Some questions not found: ${missingQuestions.join(', ')}`,
        HttpStatus.NOT_FOUND
      );
    }

    const interviewId = `interview_${Date.now()}`;

    const interviewRes = await this.neo4jService.write(
      `
      CREATE (i:Interview {id: $interviewId, duration: $duration, createdAt: timestamp()})
      WITH i
      MATCH (m:User {id: $interviewerId, role: 'Interviewer'})
      MATCH (s:User {id: $candidateId, role: 'Candidate'})
      MERGE (m)-[:HAS_INTERVIEW]->(i)
      MERGE (s)-[:HAS_INTERVIEW]->(i)
      WITH i
      UNWIND $questions AS questionId
        MATCH (q:Question {id: questionId})
        CREATE (iq:InterviewQuestion {questionId: questionId, rate: 0, comment: ''})
        MERGE (i)-[:HAS_INTERVIEW_QUESTION]->(iq)
        MERGE (iq)-[:REFERS_TO]->(q)
      RETURN i

      `,
      {
        interviewId,
        duration: timeDuration,
        interviewerId,
        candidateId,
        questions,
      }
    );

    return interviewRes.records[0]?.get('i');
  }

  async linkUserToInterview(userId: string, interviewId: string) {
    const result = await this.neode.writeCypher(
      `
      MATCH (u:User {id: $userId}), (i:Interview {id: $interviewId})
      MERGE (u)-[:PARTICIPATES_IN]->(i)
      RETURN u, i
      `,
      { userId, interviewId }
    );

    return result.records.map(record => ({
      user: record.get('u'),
      interview: record.get('i'),
    }));
  }

  async getInterviewQuestions(interviewId: string) {
    const query = `
      MATCH (i:Interview {id: $interviewId})-[:HAS_INTERVIEW_QUESTION]->(iq:InterviewQuestion)-[:REFERS_TO]->(q:Question)
      OPTIONAL MATCH (q)-[:HAS_FOLLOWUP]->(followup:FollowUpQuestion)
      WITH q, followup
      ORDER BY q.weight, followup.weight
      WITH q, collect({id: followup.id, title: followup.title, weight: followup.weight}) AS followups
      RETURN q.id AS question_id, 
             q.title AS question_title, 
             q.weight AS question_weight,
             followups;
    `;

    const params = { interviewId };

    const res: QueryResult = await this.neo4jService.read(query, params);

    if (!res.records.length) {
      console.warn(`No questions found for interview ID: ${interviewId}`);
      return [];
    }

    return res.records.map(record => ({
      id: record.get('question_id'),
      title: record.get('question_title'),
      weight: record.get('question_weight').toNumber(),
      followupQuestions: (record.get('followups') || []).map((f: Tfollowup) => ({
        id: f.id,
        title: f.title,
        weight: +f.weight.toString(),
      })),
    }));
  }

  async getInterviewResults(interviewId: string) {
    const query = `
    MATCH (i:Interview {id: $interviewId})
MATCH (i)-[:HAS_INTERVIEW_QUESTION]->(iq:InterviewQuestion)-[:REFERS_TO]->(q:Question)
OPTIONAL MATCH (q)-[:HAS_FOLLOWUP]->(f:FollowUpQuestion)

RETURN 
  i.id AS interviewId,
  i.duration AS interviewDuration,
  i.date AS interviewDate,
  SUM(iq.rate) AS totalScore,  
  AVG(iq.rate) AS avgScore,
  COUNT(DISTINCT q) AS totalQuestions,
  COUNT(DISTINCT f) AS totalFollowQuestions;
  COUNT(DISTINCT CASE WHEN q.isskip = true THEN q END) AS skippedQuestions,  
  COUNT(DISTINCT CASE WHEN f.isskip = true THEN f END) AS skippedFollowQuestions;
  `;

    const params = { interviewId };

    const res: QueryResult = await this.neo4jService.read(query, params);

    if (!res.records.length) {
      throw new Error(`Interview ${interviewId} not found`);
    }

    const record = res.records[0];
    const interviewIdResult: string = record.get('interviewId');
    // const interviewDuration: string = record.get('interviewDuration');
    const interviewDate: string = record.get('date');
    const avgScore: number = +record.get('avgScore').toString();
    const totalQuestions: number = +record.get('totalQuestions').toString();
    const totalFollowQuestions: number = +record.get('totalFollowQuestions').toString();
    // const time = interviewDate - interviewDuration;
    const skippedQuestions: number = +record.get('skippedQuestions').toString();
    const skippedFollowQuestions: number = +record.get('skippedFollowQuestions').toString();
    const countPrimary = totalQuestions - skippedQuestions;
    const countFollowUp = totalFollowQuestions - skippedFollowQuestions;

    return {
      interviewId: interviewIdResult,
      interviewDate,
      avgScore,
      totalQuestions,
      totalFollowQuestions,
      // time,
      countPrimary: `${countPrimary}/${totalQuestions}`,
      countFollowUp: `${countFollowUp}/${totalFollowQuestions}`,
    };
  }
}
