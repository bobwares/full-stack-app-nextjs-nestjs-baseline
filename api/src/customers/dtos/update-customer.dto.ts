// App: Initial Full-Stack Application
// Package: api
// File: src/customers/dtos/update-customer.dto.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Defines validation schema for updating a Customer record.
//
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
