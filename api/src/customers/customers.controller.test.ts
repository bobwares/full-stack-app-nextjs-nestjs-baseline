// App: Full-Stack Application
// Package: api
// File: src/customers/customers.controller.test.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Unit tests for CustomersController verifying CRUD routes using mock service.
//
import { Test } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

const serviceMock = {
  create: jest.fn(async (dto) => ({ id: '1', ...dto })),
  findAll: jest.fn(async () => []),
  findOne: jest.fn(async (id) => ({ id })),
  update: jest.fn(async (id, dto) => ({ id, ...dto })),
  remove: jest.fn(async () => undefined),
};

describe('CustomersController', () => {
  let controller: CustomersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: serviceMock }],
    }).compile();

    controller = module.get(CustomersController);
  });

  it('creates via POST', async () => {
    const dto = { firstName: 'A', lastName: 'B', emails: ['a@b.com'] } as any;
    const result = await controller.create(dto);
    expect(result.firstName).toBe('A');
    expect(serviceMock.create).toHaveBeenCalled();
  });

  it('lists all customers', async () => {
    await controller.findAll();
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('gets a customer by id', async () => {
    const res = await controller.findOne('123');
    expect(res.id).toBe('123');
  });

  it('updates a customer', async () => {
    await controller.update('123', { firstName: 'B' } as any);
    expect(serviceMock.update).toHaveBeenCalledWith('123', { firstName: 'B' });
  });

  it('removes a customer', async () => {
    await controller.remove('123');
    expect(serviceMock.remove).toHaveBeenCalledWith('123');
  });
});
