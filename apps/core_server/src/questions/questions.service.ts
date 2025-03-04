import { Neo4jService } from 'nest-neo4j';
import { Injectable } from '@nestjs/common';
import { QueryResult, Record as Neo4jRecord } from 'neo4j-driver';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly neo4jService: Neo4jService,
  ) {}


  async findAll(): Promise<Neo4jRecord[]> {
    // const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)
    // return `There are ${res.records[0].get('count')} nodes in the database`
    const res: QueryResult = await this.neo4jService.read(`MATCH (n) RETURN n`);
    return res.records.map(record => record.get('n'));
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }


  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
