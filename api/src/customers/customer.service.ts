//  App: Initial Full-Stack Application
//  Package: api
//  File: src/customers/customer.service.ts
//  Version: 0.0.4
//  Author: Bobwares
//  Date: 2025-06-10T00:00:00Z
//  Description: Service providing CRUD operations for CustomerProfile.
//
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerProfile } from './customer-profile.entity';
import { CustomerEmail } from './customer-email.entity';
import { CustomerPhoneNumber } from './customer-phone-number.entity';
import { CustomerAddress } from './customer-address.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly repo: Repository<CustomerProfile>,
  ) {}

  async create(dto: CreateCustomerDto): Promise<CustomerProfile> {
    const entity = new CustomerProfile();
    entity.firstName = dto.fullName.firstName;
    if (dto.fullName.middleName !== undefined) {
      entity.middleName = dto.fullName.middleName;
    }
    entity.lastName = dto.fullName.lastName;
    entity.marketingEmailsEnabled = dto.privacySettings.marketingEmailsEnabled;
    entity.twoFactorEnabled = dto.privacySettings.twoFactorEnabled;
    entity.emails = dto.emails.map((email) => {
      const ce = new CustomerEmail();
      ce.email = email;
      return ce;
    });
    if (dto.phoneNumbers) {
      entity.phoneNumbers = dto.phoneNumbers.map((p) => {
        const pn = new CustomerPhoneNumber();
        pn.type = p.type;
        pn.number = p.number;
        return pn;
      });
    }
    if (dto.address) {
      const addr = new CustomerAddress();
      addr.line1 = dto.address.line1;
      if (dto.address.line2 !== undefined) {
        addr.line2 = dto.address.line2;
      }
      addr.city = dto.address.city;
      addr.state = dto.address.state;
      addr.postalCode = dto.address.postalCode;
      addr.country = dto.address.country;
      entity.address = addr;
    }
    return this.repo.save(entity);
  }

  findAll(): Promise<CustomerProfile[]> {
    return this.repo.find();
  }

  findOne(id: string): Promise<CustomerProfile | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<CustomerProfile | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    if (dto.fullName) {
      if (dto.fullName.firstName !== undefined) {
        entity.firstName = dto.fullName.firstName;
      }
      if (dto.fullName.middleName !== undefined) {
        entity.middleName = dto.fullName.middleName;
      }
      if (dto.fullName.lastName !== undefined) {
        entity.lastName = dto.fullName.lastName;
      }
    }
    if (dto.privacySettings) {
      if (dto.privacySettings.marketingEmailsEnabled !== undefined) {
        entity.marketingEmailsEnabled = dto.privacySettings.marketingEmailsEnabled;
      }
      if (dto.privacySettings.twoFactorEnabled !== undefined) {
        entity.twoFactorEnabled = dto.privacySettings.twoFactorEnabled;
      }
    }
    if (dto.emails) {
      entity.emails = dto.emails.map((email) => {
        const ce = new CustomerEmail();
        ce.email = email;
        return ce;
      });
    }
    if (dto.phoneNumbers) {
      entity.phoneNumbers = dto.phoneNumbers.map((p) => {
        const pn = new CustomerPhoneNumber();
        pn.type = p.type;
        pn.number = p.number;
        return pn;
      });
    }
    if (dto.address) {
      const addr = new CustomerAddress();
      addr.line1 = dto.address.line1;
      if (dto.address.line2 !== undefined) {
        addr.line2 = dto.address.line2;
      }
      addr.city = dto.address.city;
      addr.state = dto.address.state;
      addr.postalCode = dto.address.postalCode;
      addr.country = dto.address.country;
      entity.address = addr;
    }
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
