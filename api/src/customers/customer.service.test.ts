//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.service.test.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: Unit tests for CustomerService CRUD methods.
// 
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

const repoMock = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('CustomerService', () => {
  let service: CustomerService;
  let repo: Repository<Customer>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getRepositoryToken(Customer), useFactory: repoMock },
      ],
    }).compile();

    service = module.get(CustomerService);
    repo = module.get(getRepositoryToken(Customer));
  });

  it('creates a customer', async () => {
    (repo.create as jest.Mock).mockReturnValue({});
    (repo.save as jest.Mock).mockResolvedValue({ id: '1' });
    const result = await service.create({} as any);
    expect(result).toEqual({ id: '1' });
  });

  it('throws on missing customer', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update throws on missing customer', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.update('1', {} as any)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove throws on missing customer', async () => {
    (repo.delete as jest.Mock).mockResolvedValue({ affected: 0 });
    await expect(service.remove('1')).rejects.toBeInstanceOf(NotFoundException);
  });
});
