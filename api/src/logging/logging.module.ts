// App: Full-Stack Application
// Package: api
// File: src/logging/logging.module.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Module configuring Pino logger with request context and pretty options.
//
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          level: process.env.LOG_LEVEL || 'info',
          ...(process.env.PRETTY_LOGS === 'true'
            ? { transport: { target: 'pino-pretty', options: { singleLine: true, colorize: false } } }
            : {}),
        } as any,
      }),
    }),
  ],
  exports: [LoggerModule],
})
export class LoggingModule {}
