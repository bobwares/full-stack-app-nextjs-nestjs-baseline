//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/dtos/create-customer.dto.test.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T07:46:42Z
//  Description: Unit tests for CreateCustomerDto validation.
// 
import "reflect-metadata";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

describe('CreateCustomerDto', () => {
  it('validates required fields', async () => {
    const dto = plainToInstance(CreateCustomerDto, {
      fullName: { firstName: 'Alice', lastName: 'Smith' },
      emails: ['alice@example.com'],
      privacySettings: { marketingEmailsEnabled: true, twoFactorEnabled: false },
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
