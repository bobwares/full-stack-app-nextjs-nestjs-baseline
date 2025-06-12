// App: Full-Stack Application
// Package: api
// File: src/logging/request-id.middleware.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Middleware ensuring each HTTP request carries a unique X-Request-Id header.
//
import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers["x-request-id"]) {
      req.headers["x-request-id"] = randomUUID();
    }
    next();
  }
}
