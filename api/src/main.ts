// App: Full-Stack Application
// Package: api
// File: src/main.ts
// Version: 0.0.11
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:40:00Z
// Description: Entry point for the NestJS backend application with Swagger documentation.

import { NestFactory } from "@nestjs/core";
import {
  ValidationPipe,
  BadRequestException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import basicAuth from "express-basic-auth";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./logging/logging.interceptor";
import { RequestIdMiddleware } from "./logging/request-id.middleware";
import { Logger } from "nestjs-pino";
import pkg from "../package.json";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(new RequestIdMiddleware().use);
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const hasWhitelist = errors.some(
          (e) => e.constraints && e.constraints.whitelistValidation,
        );
        return hasWhitelist
          ? new BadRequestException(errors)
          : new UnprocessableEntityException(errors);
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Full-Stack API")
    .setVersion(pkg.version)
    .addServer("http://localhost:3000", "dev")
    .addServer("/", "prod")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  if (process.env.APP_ENV !== "dev") {
    app.use(
      ["/docs", "/openapi.json"],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER || "admin"]:
            process.env.SWAGGER_PASS || "changeme",
        },
      }),
    );
  }
  SwaggerModule.setup("docs", app, document);
  app.getHttpAdapter().get("/openapi.json", (req, res) => res.json(document));
  await app.listen(3001);
}

bootstrap();
