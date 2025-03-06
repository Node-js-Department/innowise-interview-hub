import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EEntities } from './model';
import { createNeo4jInstance, NEO4J_TOKEN } from './neode.provider';
import { UserSchema } from './schemas/user.schema';


@Module({
  providers: [
    {
      provide: NEO4J_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const neode = createNeo4jInstance(configService);
        neode.model(EEntities.User, UserSchema);
        return neode;
      },
    },
  ],
  exports: [NEO4J_TOKEN],
})
export class DatabaseModule {}
