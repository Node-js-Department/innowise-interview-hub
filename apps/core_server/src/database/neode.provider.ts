import Neode from 'neode';
import { ConfigService } from '@nestjs/config';

export const NEO4J_TOKEN = 'NEO4J';

export const createNeo4jInstance = (configService: ConfigService) => new Neode(
  `bolt://${configService.get('NEO4J_HOST')}:${configService.get('NEO4J_PORT')}`,
  configService.get('NEO4J_USERNAME') || 'neo4j',
  configService.get('NEO4J_PASSWORD') || 'neo'
);
