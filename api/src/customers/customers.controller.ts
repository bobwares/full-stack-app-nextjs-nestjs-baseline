// App: Full-Stack Application
// Package: api
// File: src/customers/customers.controller.ts
// Version: 0.0.11
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:40:00Z
// Description: REST controller providing CRUD endpoints with Swagger documentation.
//
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { Customer } from "./entities/customer.entity";

@ApiTags("customers")
@ApiBearerAuth()
@Controller("customers")
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Post()
  @ApiResponse({ status: 201, type: Customer })
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.service.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Customer] })
  findAll(): Promise<Customer[]> {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: Customer })
  findOne(@Param("id") id: string): Promise<Customer> {
    return this.service.findOne(id);
  }

  @Put(":id")
  @ApiResponse({ status: 200, type: Customer })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
