import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@/common/config/config.module';

import { InterviewModule } from './interview/interview.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigService } from '@nestjs/config';
import { Neo4jModule } from 'nest-neo4j/dist';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InterviewModule,
    QuestionsModule,
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
  controllers: [],
  providers: [],
})
export class CoreModule { }
