import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { z } from 'zod';

import { parseEnv } from './config.utils';

const envSchema = z.object({
  NEO4J_SCHEME: z.string().default('neo4j'),
  NEO4J_HOST: z.string().default('localhost'),
  NEO4J_PORT: z.coerce.number().default(7687),
  NEO4J_USERNAME: z.string().default('neo4j'),
  NEO4J_PASSWORD: z.string().default('neo'),

  CORE_SERVICE_PORT: z.coerce.number().default(8005),
  CORE_SERVICE_HOST: z.string().default('http://localhost'),

  JWT_KEY: z.string().min(5, 'JWT_KEY must be at least 5 characters long'),

  CLIENT_PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_ENV: z.string().default('local'),
  NEXT_PUBLIC_VERSION: z.string().default('1.0.0'),
});

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [() => parseEnv(envSchema)], // Используем Zod для валидации env
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
