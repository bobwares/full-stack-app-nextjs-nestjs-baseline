//  App: Initial Full-Stack Application
//  Package: api
//  File: src/main.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: Bootstraps the NestJS application and initializes database
//  connection and global filters.
// 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
