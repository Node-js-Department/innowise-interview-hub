import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExportService } from './export.service';
import { ImportService } from './import.service';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, ImportService, ExportService],
})
export class QuestionsModule {}
