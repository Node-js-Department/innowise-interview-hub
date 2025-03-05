import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EEntities } from './model';
import { createNeo4jInstance, NEO4J_TOKEN } from './neode.provider';
import { UserSchema } from './schemas/user.schema';
import { InterviewSchema } from './schemas/interview.schema';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NEO4J_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const neode = createNeo4jInstance(configService);
        neode.model(EEntities.User, UserSchema);
        neode.model(EEntities.Interview, InterviewSchema);
        return neode;
      },
    },
  ],
  exports: [NEO4J_TOKEN],
})
export class DatabaseModule {}
