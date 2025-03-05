
import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { QueryResult, Record as Neo4jRecord } from 'neo4j-driver';
import { v4 as uuidv4 } from 'uuid';

import { CreateInterviewDTO } from './interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  async findAll(): Promise<Neo4jRecord[]> {
    const res: QueryResult = await this.neo4jService.read('MATCH (i:Interview) RETURN i');
    return res.records.map(record => record.get('i'));
  }

  async createInterview(dto: CreateInterviewDTO) {
    const query = `
      CREATE (i:Interview {
        id: $id,
        score: $score,
        interviewDate: timestamp(),
        followUpCount: $followUpCount,
        questionCount: $questionCount,
        level: $level,
        createdAt: timestamp(),
        updatedAt: timestamp()
      })
      RETURN i
    `;

    const params = {
      ...dto,
      id: uuidv4(),
    };

    try {
      const result: QueryResult = await this.neo4jService.write(query, params);

      const interview = result.records[0]?.get('i');

      if (interview) {
        const interviewData = interview.properties;
        return {
          ...interviewData,
          interviewDate: new Date(interviewData.interviewDate.low).toISOString(),
          createdAt: new Date(interviewData.createdAt.low).toISOString(),
          updatedAt: new Date(interviewData.updatedAt.low).toISOString(),
        };
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      throw new Error('Error creating interview');
    }
  }

  async linkUserToInterview(userId: string, interviewId: string) {
    const query = `
    MATCH (u:User {id: $userId}), (i:Interview {id: $interviewId})
    MERGE (u)-[:PARTICIPATES_IN]->(i)
    RETURN u, i
  `;

    const params = { userId, interviewId };

    const result = await this.neo4jService.write(query, params);
    return result.records.map(record => ({
      user: record.get('u'),
      interview: record.get('i'),
    }));
  }

}
