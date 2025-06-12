// App: Full-Stack Application
// Package: api
// File: scripts/export-swagger.ts
// Version: 0.0.11
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:40:00Z
// Description: Exports the Swagger OpenAPI specification to docs/openapi.json.
//
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
process.env.APP_ENV = process.env.APP_ENV || 'codex';
import { AppModule } from '../src/app.module';
import * as pkg from '../package.json';

async function exportSwagger(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Full-Stack API')
    .setVersion(pkg.version)
    .addServer('http://localhost:3000', 'dev')
    .addServer('/', 'prod')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const docsPath = join(__dirname, '..', 'docs');
  mkdirSync(docsPath, { recursive: true });
  writeFileSync(join(docsPath, 'openapi.json'), JSON.stringify(document, null, 2));
  await app.close();
}

exportSwagger();
