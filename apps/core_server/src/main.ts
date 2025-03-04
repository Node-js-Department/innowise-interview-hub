import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AllExceptionsFilter } from './common';
import { CoreModule } from './core.module';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    CoreModule,
    new FastifyAdapter({ maxParamLength: 1000000, ignoreTrailingSlash: true }), {
      bufferLogs: true,
    });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: errors => errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      })),
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(
    configService.get('CORE_SERVICE_PORT') as unknown as number || '8005',
    configService.get('CORE_SERVICE_HOST') as unknown as string || '0.0.0.0'
  );

}
bootstrap();
