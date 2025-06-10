//  App: Initial Full-Stack Application
//  Package: api
//  File: src/main.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Bootstraps the NestJS application and initializes database
//  connection.
// 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
