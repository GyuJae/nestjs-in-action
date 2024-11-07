import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';

import type { INestApplication } from '@nestjs/common';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  setNestApp(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
