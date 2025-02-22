import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { ConfigService } from '../config/config.service';
import { CoreModule } from './core.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CoreModule,
    new FastifyAdapter({ maxParamLength: 1000000, ignoreTrailingSlash: true }), {
      bufferLogs: true,
    });

  await app.listen(new ConfigService().get('port') as unknown as number, '0.0.0.0');
}
bootstrap();
