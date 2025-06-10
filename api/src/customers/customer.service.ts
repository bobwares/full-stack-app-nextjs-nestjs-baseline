//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.service.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Service providing CRUD operations for Customer entity.
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
    private readonly repo: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const entity = this.repo.create(dto as unknown as Customer);
    return this.repo.save(entity);
  }

  findAll(): Promise<Customer[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<Customer | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
