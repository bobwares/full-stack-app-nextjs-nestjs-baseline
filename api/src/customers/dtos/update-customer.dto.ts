//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/dtos/update-customer.dto.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: DTO for updating a customer, all fields optional.
// 
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
