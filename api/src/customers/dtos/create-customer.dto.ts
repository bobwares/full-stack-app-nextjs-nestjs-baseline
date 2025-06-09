// App: Initial Full-Stack Application
// Package: api
// File: create-customer.dto.ts
// Version: 2.0.29
// Author: Bobwares
// Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
// Description: DTO for creating a customer profile.
// 
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName!: string;

  @IsBoolean()
  marketingEmailsEnabled!: boolean;

  @IsBoolean()
  twoFactorEnabled!: boolean;
}

