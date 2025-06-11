// App: Initial Full-Stack Application
// Package: api
// File: test/customers.e2e-spec.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: End-to-end tests for Customer CRUD endpoints.
//
import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('performs full CRUD flow', async () => {
    const dto = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      firstName: 'John',
      lastName: 'Doe',
      emails: ['john@example.com'],
      phoneNumbers: [{ type: 'mobile', number: '+1234567890' }],
      address: { line1: '123', city: 'Met', state: 'NY', postalCode: '1', country: 'US' },
      privacySettings: { marketingEmailsEnabled: true, twoFactorEnabled: false },
    };

    // create
    await request(app.getHttpServer()).post('/customers').send(dto).expect(201);

    // get all
    const list = await request(app.getHttpServer()).get('/customers').expect(200);
    expect(list.body.length).toBe(1);

    // get one
    await request(app.getHttpServer()).get(`/customers/${dto.id}`).expect(200);

    // update
    await request(app.getHttpServer()).put(`/customers/${dto.id}`).send({ firstName: 'Jane' }).expect(200);

    // delete
    await request(app.getHttpServer()).delete(`/customers/${dto.id}`).expect(200);
  });
});
