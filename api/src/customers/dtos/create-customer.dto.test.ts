// App: Initial Full-Stack Application
// Package: api
// File: src/customers/dtos/create-customer.dto.test.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Unit tests for CreateCustomerDto validation logic.
//
import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerDto } from './create-customer.dto';

const validDto: CreateCustomerDto = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  middleName: 'Q',
  lastName: 'Doe',
  emails: ['john@example.com'],
  phoneNumbers: [{ type: 'mobile', number: '+123456789' }],
  address: {
    line1: '123 St',
    city: 'Metropolis',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
  },
  privacySettings: {
    marketingEmailsEnabled: true,
    twoFactorEnabled: false,
  },
};

describe('CreateCustomerDto', () => {
  it('validates a proper object', async () => {
    const dtoInstance = plainToInstance(CreateCustomerDto, validDto);
    const errors = await validate(dtoInstance);
    expect(errors).toEqual([]);
  });

  it('fails validation when required fields missing', async () => {
    const dto = new CreateCustomerDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
