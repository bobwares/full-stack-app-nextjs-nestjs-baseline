// App: Full-Stack Application
// Package: api
// File: src/filters/http-exception.filter.test.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Unit tests verifying HttpExceptionFilter formats responses correctly.
//
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  function mockHost() {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return {
      response: { status },
      request: { url: '/test' },
      host: {
        switchToHttp: () => ({ getResponse: () => ({ status }), getRequest: () => ({ url: '/test' }) }),
      } as unknown as ArgumentsHost,
      json,
      status,
    };
  }

  it('handles HttpException', () => {
    const { host, status, json } = mockHost();
    const filter = new HttpExceptionFilter();
    filter.catch(new HttpException('Forbidden', 403), host);
    expect(status).toHaveBeenCalledWith(403);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 403, message: 'Forbidden', path: '/test' }),
    );
  });

  it('handles generic Error', () => {
    const { host, status, json } = mockHost();
    const filter = new HttpExceptionFilter();
    filter.catch(new Error('oops'), host);
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 500, message: 'oops', path: '/test' }),
    );
  });

  it('fills default message when missing', () => {
    const { host, status, json } = mockHost();
    const filter = new HttpExceptionFilter();
    const ex = new HttpException({ error: 'Bad' }, 400);
    (ex as any).message = '';
    filter.catch(ex, host);
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: 400, message: 'Unexpected error', error: 'Bad' }),
    );
  });
});
