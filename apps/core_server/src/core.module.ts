import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    QuestionsModule,
    Neo4jModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule { }
