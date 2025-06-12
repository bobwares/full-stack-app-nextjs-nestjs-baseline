// App: Full-Stack Application
// Package: api
// File: src/customers/customers.repository.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Repository encapsulating database access for the Customer entity.
//
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  create(customer: Customer): Promise<Customer> {
    return this.repo.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.repo.find({ relations: ['emails', 'phoneNumbers', 'address', 'privacySettings'] });
  }

  findByEmail(email: string): Promise<Customer | null> {
    return this.repo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.emails', 'e')
      .where('e.email = :email', { email })
      .getOne();
  }

  findOne(id: string): Promise<Customer | null> {
    return this.repo.findOne({ where: { id }, relations: ['emails', 'phoneNumbers', 'address', 'privacySettings'] });
  }

  async update(id: string, partial: Partial<Customer>): Promise<Customer> {
    await this.repo.update(id, partial);
    const updated = await this.findOne(id);
    if (!updated) throw new Error('Customer not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
