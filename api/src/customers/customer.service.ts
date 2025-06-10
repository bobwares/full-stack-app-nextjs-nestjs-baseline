//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.service.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: Service providing CRUD operations for Customer entity with
//  integrated logging.
// 
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  private readonly logger = new Logger(CustomerService.name);

  async create(dto: CreateCustomerDto): Promise<Customer> {
    this.logger.log('Creating customer');
    const entity = this.repo.create(dto as unknown as Customer);
    return this.repo.save(entity);
  }

  findAll(): Promise<Customer[]> {
    this.logger.log('Retrieving all customers');
    return this.repo.find();
  }

  async findOne(id: string): Promise<Customer> {
    this.logger.log(`Retrieving customer ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      this.logger.warn(`Customer ${id} not found`);
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return entity;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    this.logger.log(`Updating customer ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      this.logger.warn(`Customer ${id} not found`);
      throw new NotFoundException(`Customer ${id} not found`);
    }
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing customer ${id}`);
    const result = await this.repo.delete(id);
    if (!result.affected) {
      this.logger.warn(`Customer ${id} not found`);
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return result.affected > 0;
  }
}
