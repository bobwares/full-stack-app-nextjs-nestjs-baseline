// App: Full-Stack Application
// Package: api
// File: src/customers/dtos/update-customer.dto.ts
// Version: 0.0.6
// Author: Bobwares CodeBot
// Date: 2025-06-12T06:19:08Z
// Description: DTO for updating customers with validation rules identical to the create DTO.

import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
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
