// App: Initial Full-Stack Application
// Package: api
// File: src/customers/dtos/create-customer.dto.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Defines validation schema for creating a Customer record.
//
import { IsUUID, IsString, IsNotEmpty, IsOptional, IsArray, ArrayMinSize, ArrayUnique, ValidateNested, IsEmail, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class PhoneNumberDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  number!: string;
}

class PostalAddressDto {
  @IsString()
  @IsNotEmpty()
  line1!: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}

class PrivacySettingsDto {
  @IsBoolean()
  marketingEmailsEnabled!: boolean;

  @IsBoolean()
  twoFactorEnabled!: boolean;
}

export class CreateCustomerDto {
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEmail({}, { each: true })
  emails!: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDto)
  phoneNumbers!: PhoneNumberDto[];

  @ValidateNested()
  @Type(() => PostalAddressDto)
  address!: PostalAddressDto;

  @ValidateNested()
  @Type(() => PrivacySettingsDto)
  privacySettings!: PrivacySettingsDto;
}
