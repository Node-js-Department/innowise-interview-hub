import { Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver';
import { Neo4jService } from 'nest-neo4j';

import { TAny } from '@packages/shared';

import { IDomain } from './questions.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  async findAll(): Promise<TAny> {
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

    const domainsMap = new Map<string, IDomain>();

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
          .filter((fq: TAny) => fq && fq.properties)
          .map((fq: TAny) => ({
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

