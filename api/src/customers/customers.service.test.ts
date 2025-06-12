// App: Full-Stack Application
// Package: api
// File: src/customers/customers.service.test.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Unit tests for CustomersService verifying CRUD operations using the repository.
//
import { CustomersService } from './customers.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

const repoMock: any = {
  create: jest.fn(async (c) => c),
  findAll: jest.fn(async () => []),
  findOne: jest.fn(async (_id: string) => null),
  update: jest.fn(async (id, p) => ({ id, ...p })),
  remove: jest.fn(async () => {}),
  findByEmail: jest.fn(async () => null),
};

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CustomersService(repoMock as any);
  });

  it('creates a customer', async () => {
    const created = await service.create({ firstName: 'A', lastName: 'B', emails: ['a@b.com'] });
    expect(created.id).toBeDefined();
    expect(repoMock.create).toHaveBeenCalled();
  });

  it('rejects duplicate email', async () => {
    repoMock.findByEmail.mockResolvedValueOnce({ id: '1' } as any);
    await expect(
      service.create({ firstName: 'A', lastName: 'B', emails: ['dup@example.com'] })
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('throws when not found', async () => {
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('filters out deleted customers', async () => {
    repoMock.findAll.mockResolvedValue([
      { id: '1', isDeleted: false } as any,
      { id: '2', isDeleted: true } as any,
    ]);
    const list = await service.findAll();
    expect(list).toHaveLength(1);
    const all = await service.findAll(true);
    expect(all).toHaveLength(2);
  });

  it('soft deletes on remove', async () => {
    await service.remove('123');
    expect(repoMock.update).toHaveBeenCalledWith('123', { isDeleted: true });
  });
});
