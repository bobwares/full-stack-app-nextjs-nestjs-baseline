/**
 * @application Job Search Backend
 * @source src/main.ts
 * @author
 * @version 1.0
 * @description Entry point of the Job Search Backend application. Sets up the NestJS server, configures CORS, and starts listening on the specified port.
 * @updated 2025-01-27
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3001);
}

bootstrap();