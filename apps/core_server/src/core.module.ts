import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    DatabaseModule,
    QuestionsModule,
    Neo4jModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule { }
