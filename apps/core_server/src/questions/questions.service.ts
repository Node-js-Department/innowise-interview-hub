import { Neo4jService } from 'nest-neo4j';
import { Injectable } from '@nestjs/common';
import { QueryResult, Record as Neo4jRecord } from 'neo4j-driver';
import { Domain } from './questions.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly neo4jService: Neo4jService,
  ) {}

  async getFollowupQuestions(questionId: string) {
    const query = `
    MATCH (q:Question {id: $questionId})-[:HAS_FOLLOWUP]->(followup:FollowUpQuestion)
    RETURN followup.id AS id, followup.title AS title, followup.weight AS weight
    ORDER BY followup.weight
  `;

  const res = await this.neo4jService.read(query, { questionId });

  return res.records.map(record => ({
    id: record.get('id'),
    title: record.get('title'),
    weight: record.get('weight').toNumber(),
  }));
  }
  
  async findAll(): Promise<any> {
    const query = `
      MATCH (d:Domain)-[:HAS_TOPIC]->(t:Topic)
      OPTIONAL MATCH (t)-[:HAS_THEME]->(th:Theme)
      OPTIONAL MATCH (th)-[:HAS_QUESTION]->(q:Question)
      OPTIONAL MATCH (q)-[:HAS_FOLLOWUP]->(fq:FollowUpQuestion)
      RETURN 
        d.id AS domain_id, d.title AS domain_title, 
        t.id AS topic_id, t.title AS topic_title,
        th.id AS theme_id, th.title AS theme_title,
        q.id AS question_id, q.title AS question_text, q.weight AS question_weight, q.tags AS question_tags,
        COLLECT(DISTINCT fq) AS followups
      ORDER BY d.id, t.id, th.id, q.id;
    `;

    const res: QueryResult = await this.neo4jService.read(query);

   
    const domainsMap = new Map<string, Domain>();

    res.records.forEach(record => {
      const domainId = record.get('domain_id') as string;
      const topicId = record.get('topic_id') as string;
      const themeId = record.get('theme_id') as string;
      const questionId = record.get('question_id') as string | null;

      if (!domainsMap.has(domainId)) {
        domainsMap.set(domainId, {
          id: domainId,
          title: record.get('domain_title'),
          topics: new Map(),
        });
      }
      const domain = domainsMap.get(domainId)!;

      if (topicId && !domain.topics.has(topicId)) {
        domain.topics.set(topicId, {
          id: topicId,
          title: record.get('topic_title'),
          themes: new Map(),
        });
      }
      const topic = domain.topics.get(topicId)!;

      if (themeId && !topic.themes.has(themeId)) {
        topic.themes.set(themeId, {
          id: themeId,
          title: record.get('theme_title'),
          questions: new Map(),
        });
      }
      const theme = topic.themes.get(themeId)!;

      if (questionId && !theme.questions.has(questionId)) {
        theme.questions.set(questionId, {
          id: questionId,
          title: record.get('question_text'),
          weight: record.get('question_weight').toNumber(),
          tags: record.get('question_tags') ?? [],
          followUpQuestions: [],
        });
      }

      if (questionId) {
        const question = theme.questions.get(questionId)!;
        const followups = record.get('followups') ?? [];

        question.followUpQuestions = followups
          .filter((fq: any) => fq && fq.properties)
          .map((fq: any) => ({
            id: fq.properties.id,
            title: fq.properties.title,
            weight: fq.properties.weight.toNumber(),
            tags: fq.properties.tags ?? [],
          }));
      }
    });

    return {
      domains: Array.from(domainsMap.values()).map(domain => ({
        id: domain.id,
        title: domain.title,
        topics: Array.from(domain.topics.values()).map(topic => ({
          id: topic.id,
          title: topic.title,
          themes: Array.from(topic.themes.values()).map(theme => ({
            id: theme.id,
            title: theme.title,
            questions: Array.from(theme.questions.values()),
          })),
        })),
      })),
    };
  }
  }

