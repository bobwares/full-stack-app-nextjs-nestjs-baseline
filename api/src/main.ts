// App: Initial Full-Stack Application
// Package: api
// File: src/main.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Entry point for the NestJS application.
//
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

void bootstrap();
