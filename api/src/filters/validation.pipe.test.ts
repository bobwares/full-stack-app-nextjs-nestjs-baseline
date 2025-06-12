// App: Full-Stack Application
// Package: api
// File: src/filters/validation.pipe.test.ts
// Version: 0.0.12
// Author: Bobwares CodeBot
// Date: 2025-06-12T07:50:00Z
// Description: Unit tests for the global ValidationPipe configuration ensuring proper exception mapping.
//
import { ValidationPipe, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCustomerDto } from '../customers/dtos/create-customer.dto';

const pipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const hasWhitelist = errors.some((e) => e.constraints && e.constraints.whitelistValidation);
    return hasWhitelist ? new BadRequestException(errors) : new UnprocessableEntityException(errors);
  },
});

describe('ValidationPipe', () => {
  it('returns BadRequestException for extra properties', async () => {
    await expect(
      pipe.transform(
        { firstName: 'A', lastName: 'B', emails: ['a@b.com'], extra: true },
        { type: 'body', metatype: CreateCustomerDto }
      )
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('returns UnprocessableEntityException for invalid payload', async () => {
    await expect(
      pipe.transform(
        { firstName: 'A', lastName: 'B', emails: ['not-an-email'] },
        { type: 'body', metatype: CreateCustomerDto }
      )
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });
});
