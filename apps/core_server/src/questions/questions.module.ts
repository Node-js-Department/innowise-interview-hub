import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { ImportService } from './import.service';
import { ExportService } from './export.service';
import { HttpModule } from "@nestjs/axios";
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, ImportService, ExportService],
})
export class QuestionsModule {}
