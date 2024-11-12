import { ValidationPipe, Logger as DefaultLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { AppClassSerializerInterceptor } from './common/interceptors/app-class-serializer.interceptor';

import type { ConfigServiceType } from './types/config-service.type';
import type { INestApplication } from '@nestjs/common';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new AppClassSerializerInterceptor(app.get(Reflector)));
}

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  setNestApp(app);

  const configService = app.get(ConfigService<ConfigServiceType>);

  const APP_CONFIG = configService.get('app', { infer: true })!;

  await app.listen(APP_CONFIG.port ?? 3000, APP_CONFIG.address ?? 'localhost');
  DefaultLogger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
