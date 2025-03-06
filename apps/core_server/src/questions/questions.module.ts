import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImportService } from './import.service';
import { ExportService } from './export.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, ImportService, ExportService],
})
export class QuestionsModule {}
