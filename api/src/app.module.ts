// App: Full-Stack Application
// Package: api
// File: src/app.module.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Root module configuring TypeORM connection and importing feature modules.
//
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CustomersModule } from "./customers/customers.module";
import { LoggingModule } from "./logging/logging.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(
      process.env.APP_ENV === "codex"
        ? {
            type: "sqlite",
            database: ":memory:",
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: true,
          }
        : {
            type: "postgres",
            url: process.env.DATABASE_URL as string,
            autoLoadEntities: true,
            synchronize: false,
          },
    ),
    CustomersModule,
    LoggingModule,
    HealthModule,
  ],
})
export class AppModule {}
