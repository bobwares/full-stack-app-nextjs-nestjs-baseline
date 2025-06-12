// App: Full-Stack Application
// Package: api
// File: src/logging/logging.interceptor.test.ts
// Version: 0.0.10
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:22:00Z
// Description: Unit tests verifying LoggingInterceptor records requestId.
//
import { ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import { LoggingInterceptor } from "./logging.interceptor";

describe("LoggingInterceptor", () => {
  it("logs request with requestId", (done) => {
    const log: any[] = [];
    const logger = { info: (entry: any) => log.push(entry) } as any;
    const interceptor = new LoggingInterceptor(logger as any);
    const req = {
      method: "GET",
      url: "/test",
      headers: { "x-request-id": "id-1" },
    } as any;
    const res = { statusCode: 200 } as any;
    const ctx = {
      switchToHttp: () => ({ getRequest: () => req, getResponse: () => res }),
    } as unknown as ExecutionContext;
    interceptor.intercept(ctx, { handle: () => of(null) }).subscribe(() => {
      expect(log[0]).toEqual(
        expect.objectContaining({
          requestId: "id-1",
          method: "GET",
          url: "/test",
          statusCode: 200,
        }),
      );
      done();
    });
  });
});
