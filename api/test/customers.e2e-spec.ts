// App: Initial Full-Stack Application
// Package: api
// File: customers.e2e-spec.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: End-to-end tests for customer CRUD routes.
// 
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import ormConfig from '../src/ormconfig';

describe('Customers API', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({ ...ormConfig, synchronize: true });
    await dataSource.initialize();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await dataSource.destroy();
  });

  it('creates, retrieves, updates and deletes a customer', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/customers')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        marketingEmailsEnabled: true,
        twoFactorEnabled: false,
      })
      .expect(201);
    const id = createRes.body.id;

    await request(app.getHttpServer())
      .get(`/customers/${id}`)
      .expect(200);

    await request(app.getHttpServer())
      .put(`/customers/${id}`)
      .send({ firstName: 'Johnny' })
      .expect(200);

    await request(app.getHttpServer())
      .delete(`/customers/${id}`)
      .expect(200);
  });
});

