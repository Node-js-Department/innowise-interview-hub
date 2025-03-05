import Neode from 'neode';
import { ConfigService } from '@nestjs/config';

export const NEO4J_TOKEN = 'NEO4J';

export const createNeo4jInstance = (configService: ConfigService) => {
  try {
    const host = configService.get<string>('NEO4J_HOST', 'localhost');
    const port = configService.get<number>('NEO4J_PORT', 7687);
    const username = configService.get<string>('NEO4J_USERNAME', 'neo4j');
    const password = configService.get<string>('NEO4J_PASSWORD', 'password');

    const neo4j = new Neode(`neo4j://${host}:${port}`, username, password);

    console.log(`Successfully connected to Neo4j at neo4j://${host}:${port}`);

    return neo4j;
  } catch (error) {
    console.error('Failed to connect to Neo4j:', error);
    throw new Error('Could not connect to Neo4j database');
  }
};
