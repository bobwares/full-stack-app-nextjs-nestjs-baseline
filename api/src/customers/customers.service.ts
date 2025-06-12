// App: Full-Stack Application
// Package: api
// File: src/customers/customers.service.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Service providing persistence-backed CRUD operations for customers using CustomersRepository.
//
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { v4 as uuidv4 } from 'uuid';
import { CustomersRepository } from './customers.repository';
import { Customer } from './entities/customer.entity';
import { CustomerEmail } from './entities/customer-email.entity';

@Injectable()
export class CustomersService {
  constructor(private readonly repo: CustomersRepository) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    for (const email of dto.emails) {
      const existing = await this.repo.findByEmail(email);
      if (existing) {
        throw new ConflictException(`Email ${email} already exists`);
      }
    }

    const customer = new Customer();
    customer.id = uuidv4();
    customer.firstName = dto.firstName;
    customer.middleName = dto.middleName ?? null;
    customer.lastName = dto.lastName;
    customer.privacySettings = { id: 1, marketingEmailsEnabled: true, twoFactorEnabled: false } as any; // placeholder
    customer.emails = dto.emails.map((email) => {
      const ce = new CustomerEmail();
      ce.email = email;
      return ce;
    });
    return this.repo.create(customer);
  }

  findAll(includeDeleted = false): Promise<Customer[]> {
    return this.repo
      .findAll()
      .then((list) => (includeDeleted ? list : list.filter((c) => !c.isDeleted)));
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.repo.findOne(id);
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    await this.findOne(id);
    return this.repo.update(id, {
      firstName: dto.firstName,
      middleName: dto.middleName ?? null,
      lastName: dto.lastName,
    });
  }

  remove(id: string): Promise<void> {
    return this.repo.update(id, { isDeleted: true } as any).then(() => undefined);
  }
}
