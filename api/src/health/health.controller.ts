// App: Full-Stack Application
// Package: api
// File: src/health/health.controller.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Basic health check endpoint returning service status and uptime.
//
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      version: process.env.npm_package_version,
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      checks: [],
    };
  }
}
