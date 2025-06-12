// App: Full-Stack Application
// Package: api
// File: src/filters/http-exception.filter.ts
// Version: 0.0.7
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:46:08Z
// Description: NestJS exception filter formatting all errors into a consistent JSON envelope.
//
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

  const isHttp = exception instanceof HttpException;
  const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  const resp = isHttp ? (exception.getResponse() as any) : {};
  let message: string | string[] = isHttp ? resp.message ?? exception.message : (exception as any).message;
  let error: string = isHttp ? resp.error ?? exception.name : (exception as any).name ?? 'Error';

    if (!message) message = 'Unexpected error';
    if (!error) error = 'Error';

    response.status(status).json({
      statusCode: status,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
