//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/dtos/update-customer.dto.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: DTO for updating a customer, all fields optional.
// 
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
