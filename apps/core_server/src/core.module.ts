import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Neo4jModule } from 'nest-neo4j';
import { ConfigService } from '@nestjs/config';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [
    DatabaseModule,
    InterviewModule,
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
  controllers: [UserController],
  providers: [UserService],
})
export class CoreModule { }
