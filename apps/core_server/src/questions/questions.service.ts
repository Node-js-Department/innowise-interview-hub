import { Inject, Injectable } from '@nestjs/common';
import { Record as Neo4jRecord } from 'neo4j-driver';
import { NEO4J_TOKEN } from '@/database/neode.provider';
import Neode from 'neode';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(NEO4J_TOKEN) private readonly neode: Neode,
  ) {}

  async findAll(): Promise<Neo4jRecord[]> {
    const res = await this.neode.readCypher(`MATCH (n) RETURN n`, {});
    return res.records.map(record => record.get('n'));
  }
}
