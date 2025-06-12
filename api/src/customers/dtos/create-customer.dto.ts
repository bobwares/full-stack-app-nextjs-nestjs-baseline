// App: Full-Stack Application
// Package: api
// File: src/customers/dtos/create-customer.dto.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: DTO for creating customers, validated via class-validator decorators.

import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsArray()
  @IsEmail({}, { each: true })
  emails!: string[];
}
