// App: Full-Stack Application
// Package: api
// File: src/filters/error-handling.e2e.test.ts
// Version: 0.0.7
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:46:08Z
// Description: End-to-end tests verifying ValidationPipe and HttpExceptionFilter behavior.
//
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import * as request from 'supertest';
import { CustomersController } from '../customers/customers.controller';
import { CustomersService } from '../customers/customers.service';
import { HttpExceptionFilter } from './http-exception.filter';

const serviceStub = {
  create: async (dto: any) => ({ id: '1', ...dto }),
};

describe('Global validation & errors', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: serviceStub }],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const hasWhitelist = errors.some((e) => e.constraints && e.constraints.whitelistValidation);
          return hasWhitelist ? new BadRequestException(errors) : new UnprocessableEntityException(errors);
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 400 for extra field', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send({ firstName: 'A', lastName: 'B', emails: ['a@b.com'], extra: true });
    expect(res.status).toBe(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.path).toBe('/customers');
  });

  it('returns 422 for validation error', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send({ lastName: 'B', emails: ['bad'] });
    expect(res.status).toBe(422);
    expect(res.body.statusCode).toBe(422);
  });

  it('returns 404 for unknown route', async () => {
    const res = await request(app.getHttpServer()).get('/unknown');
    expect(res.status).toBe(404);
    expect(res.body.statusCode).toBe(404);
  });
});
