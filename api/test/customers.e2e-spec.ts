// App: Full-Stack Application
// Package: api
// File: test/customers.e2e-spec.ts
// Version: 0.0.13
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:57:14Z
// Description: End-to-end tests covering customer CRUD operations and common errors.
//
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Customers e2e', () => {
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

  it('performs CRUD operations', async () => {
    // create
    const createRes = await request(app.getHttpServer())
      .post('/customers')
      .send({ firstName: 'A', lastName: 'B', emails: ['a@b.com'] })
      .expect(201);
    const id = createRes.body.id;

    // read
    let getRes = await request(app.getHttpServer())
      .get(`/customers/${id}`)
      .expect(200);
    expect(getRes.body.firstName).toBe('A');

    // update
    await request(app.getHttpServer())
      .put(`/customers/${id}`)
      .send({ firstName: 'A2', lastName: 'B', emails: ['a@b.com'] })
      .expect(200);
    getRes = await request(app.getHttpServer())
      .get(`/customers/${id}`)
      .expect(200);
    expect(getRes.body.firstName).toBe('A2');

    // delete
    await request(app.getHttpServer())
      .delete(`/customers/${id}`)
      .expect(200);
    const listRes = await request(app.getHttpServer())
      .get('/customers')
      .expect(200);
    expect(listRes.body).toHaveLength(0);
  });

  it('returns 404 for unknown id', async () => {
    await request(app.getHttpServer())
      .get('/customers/unknown')
      .expect(404);
  });

  it('prevents duplicate emails', async () => {
    await request(app.getHttpServer())
      .post('/customers')
      .send({ firstName: 'A', lastName: 'B', emails: ['dup@a.com'] })
      .expect(201);
    await request(app.getHttpServer())
      .post('/customers')
      .send({ firstName: 'C', lastName: 'D', emails: ['dup@a.com'] })
      .expect(409);
  });
});
