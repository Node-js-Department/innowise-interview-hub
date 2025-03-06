import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Record as Neo4jRecord } from 'neo4j-driver';
import Neode from 'neode';

import { NEO4J_TOKEN } from '@/database/neode.provider';

@Injectable()
export class InterviewService {
  constructor(
    private readonly neo4jService: Neo4jService,
    @Inject(NEO4J_TOKEN) private readonly neode: Neode
  ) {}

  async findAll(): Promise<Neo4jRecord[]> {
    const res = await this.neode.readCypher('MATCH (i:Interview) RETURN i', {});
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
}
