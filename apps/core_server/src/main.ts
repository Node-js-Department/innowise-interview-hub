import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './common';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule, new ExpressAdapter(), {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: errors =>
        errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
    }),
  );

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' })); 

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api');

  await app.listen(
    (configService.get('CORE_SERVICE_PORT') as unknown as number) || 8005,
    (configService.get('CORE_SERVICE_HOST') as unknown as string) || '0.0.0.0',
  );
}

bootstrap();
