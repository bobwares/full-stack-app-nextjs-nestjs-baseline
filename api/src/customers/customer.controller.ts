// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer.controller.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: REST controller exposing CRUD endpoints for Customer resources.
//
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";

@Controller("customers")
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    this.logger.log(`Creating customer ${dto.id}`);
    return this.customerService.create(dto);
  }

  @Get()
  findAll() {
    this.logger.log("Fetching all customers");
    return this.customerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    this.logger.log(`Fetching customer ${id}`);
    return this.customerService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCustomerDto) {
    this.logger.log(`Updating customer ${id}`);
    return this.customerService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.logger.log(`Removing customer ${id}`);
    return this.customerService.remove(id);
  }
}
