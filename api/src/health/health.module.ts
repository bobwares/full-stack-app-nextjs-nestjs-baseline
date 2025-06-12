// App: Full-Stack Application
// Package: api
// File: src/health/health.module.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Health module exposing GET /health endpoint.
//
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
