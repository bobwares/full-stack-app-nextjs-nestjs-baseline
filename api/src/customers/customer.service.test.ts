// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer.service.test.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Unit tests for CustomerService CRUD logic.
//
import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: Repository<Customer>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            create: jest.fn((e) => e),
            save: jest.fn((e) => Promise.resolve(e)),
            find: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(() => Promise.resolve(null)),
            delete: jest.fn(),
          },
        },
        { provide: getRepositoryToken(require('./entities/postal-address.entity').PostalAddress), useValue: { create: jest.fn((v) => v) } },
        { provide: getRepositoryToken(require('./entities/privacy-settings.entity').PrivacySettings), useValue: { create: jest.fn((v) => v) } },
        { provide: getRepositoryToken(require('./entities/customer-email.entity').CustomerEmail), useValue: { create: jest.fn((v) => v) } },
        { provide: getRepositoryToken(require('./entities/customer-phone-number.entity').CustomerPhoneNumber), useValue: { create: jest.fn((v) => v) } },
      ],
    }).compile();

    service = moduleRef.get(CustomerService);
    repo = moduleRef.get(getRepositoryToken(Customer));
  });

  it('creates a customer', async () => {
    const dto: CreateCustomerDto = {
      id: 'id1',
      firstName: 'a',
      lastName: 'b',
      emails: ['a@b.com'],
      phoneNumbers: [{ type: 'mobile', number: '+1' }],
      address: { line1: 'x', city: 'y', state: 'z', postalCode: '0', country: 'US' },
      privacySettings: { marketingEmailsEnabled: true, twoFactorEnabled: false },
    };

    await service.create(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('findAll calls repository.find', async () => {
    await service.findAll();
    expect(repo.find).toHaveBeenCalled();
  });
});
