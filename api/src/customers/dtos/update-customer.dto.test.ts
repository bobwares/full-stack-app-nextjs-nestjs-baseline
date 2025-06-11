// App: Initial Full-Stack Application
// Package: api
// File: src/customers/dtos/update-customer.dto.test.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Unit tests for UpdateCustomerDto validation behavior.
//
import 'reflect-metadata';
import { validate } from 'class-validator';
import { UpdateCustomerDto } from './update-customer.dto';


describe('UpdateCustomerDto', () => {
  it('allows empty object', async () => {
    const dto = new UpdateCustomerDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('validates provided fields', async () => {
    const dto = new UpdateCustomerDto();
    (dto as any).emails = ['bad-email'];
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
