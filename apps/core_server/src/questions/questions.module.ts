import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImportService } from './import.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    Neo4jModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        scheme: configService.get<string>('NEO4J_SCHEME', 'neo4j'),
        host: configService.get<string>('NEO4J_HOST', 'localhost'),
        port: configService.get<number>('NEO4J_BOLT_PORT', 7687),
        username: configService.get<string>('NEO4J_USERNAME', 'neo4j'),
        password: configService.get<string>('NEO4J_PASSWORD', 'password'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, ImportService],
})
export class QuestionsModule {}
