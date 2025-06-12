// App: Full-Stack Application
// Package: api
// File: src/logging/logging.interceptor.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Interceptor measuring request latency and logging structured information.
//
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PinoLogger } from "nestjs-pino";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTimeMs = Date.now() - start;
        this.logger.info({
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          responseTimeMs,
          requestId: req.headers["x-request-id"],
        });
      }),
    );
  }
}
