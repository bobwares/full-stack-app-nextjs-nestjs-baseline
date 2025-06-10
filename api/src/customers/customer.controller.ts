//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.controller.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Controller exposing REST endpoints for Customer operations.
// 
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
