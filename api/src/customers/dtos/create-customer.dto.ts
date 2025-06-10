//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/dtos/create-customer.dto.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: DTO for creating a customer with validation rules.
// 
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FullNameDto {
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName!: string;
}

class PhoneNumberDto {
  @IsString()
  type!: string;

  @IsString()
  number!: string;
}

class AddressDto {
  @IsString()
  line1!: string;

  @IsOptional()
  @IsString()
  line2?: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  postalCode!: string;

  @IsString()
  country!: string;
}

class PrivacyDto {
  @IsBoolean()
  marketingEmailsEnabled!: boolean;

  @IsBoolean()
  twoFactorEnabled!: boolean;
}

export class CreateCustomerDto {
  @ValidateNested()
  @Type(() => FullNameDto)
  fullName!: FullNameDto;

  @IsArray()
  @IsEmail({}, { each: true })
  emails!: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDto)
  phoneNumbers?: PhoneNumberDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ValidateNested()
  @Type(() => PrivacyDto)
  privacySettings!: PrivacyDto;
}
