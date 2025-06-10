//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.controller.test.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Unit tests for CustomerController endpoints.
//
import { Test } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

const serviceMock = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useFactory: serviceMock }],
    }).compile();

    controller = module.get(CustomerController);
    service = module.get(CustomerService);
  });

  it('calls service create', async () => {
    await controller.create({} as any);
    expect(service.create).toHaveBeenCalled();
  });
});
