//  App: Initial Full-Stack Application
//  Package: api
//  File: test/customers.e2e-spec.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: End-to-end tests for customer CRUD endpoints.
// 
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/customers (POST, GET)', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/customers')
      .send({
        fullName: { firstName: 'Alice', lastName: 'Smith' },
        emails: ['alice@example.com'],
        privacySettings: { marketingEmailsEnabled: true, twoFactorEnabled: false },
      })
      .expect(201);

    const id = createRes.body.id;
    const listRes = await request(app.getHttpServer())
      .get('/customers')
      .expect(200);
    expect(listRes.body.length).toBeGreaterThan(0);

    await request(app.getHttpServer())
      .delete(`/customers/${id}`)
      .expect(200);
  });
});
