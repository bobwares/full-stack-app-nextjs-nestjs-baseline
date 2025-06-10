//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/dtos/update-customer.dto.test.ts
//  Version: 0.0.3
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Unit tests for UpdateCustomerDto partial validation.
// 
import "reflect-metadata";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateCustomerDto } from './update-customer.dto';

describe('UpdateCustomerDto', () => {
  it('allows partial fields', async () => {
    const dto = plainToInstance(UpdateCustomerDto, { emails: ['bob@example.com'] });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
