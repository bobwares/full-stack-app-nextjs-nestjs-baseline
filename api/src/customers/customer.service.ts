// App: Initial Full-Stack Application
// Package: api
// File: customer.service.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: Service providing CRUD operations for customers.
// 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repo: Repository<Customer>,
  ) {}

  create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.repo.create(dto);
    return this.repo.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Customer | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer | null> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

