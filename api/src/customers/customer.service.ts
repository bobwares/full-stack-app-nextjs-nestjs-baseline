// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer.service.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Provides CRUD operations for Customer entities via TypeORM.
//
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./entities/customer.entity";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { PostalAddress } from "./entities/postal-address.entity";
import { PrivacySettings } from "./entities/privacy-settings.entity";
import { CustomerEmail } from "./entities/customer-email.entity";
import { CustomerPhoneNumber } from "./entities/customer-phone-number.entity";

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(PostalAddress)
    private readonly addressRepo: Repository<PostalAddress>,
    @InjectRepository(PrivacySettings)
    private readonly privacyRepo: Repository<PrivacySettings>,
    @InjectRepository(CustomerEmail)
    private readonly emailRepo: Repository<CustomerEmail>,
    @InjectRepository(CustomerPhoneNumber)
    private readonly phoneRepo: Repository<CustomerPhoneNumber>,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    this.logger.log(`Creating customer ${dto.id}`);
    const customer = new Customer();
    customer.id = dto.id;
    customer.firstName = dto.firstName;
    if (dto.middleName !== undefined) {
      customer.middleName = dto.middleName;
    }
    customer.lastName = dto.lastName;
    customer.address = this.addressRepo.create(dto.address);
    customer.privacySettings = this.privacyRepo.create(dto.privacySettings);
    customer.emails = dto.emails.map((email) =>
      this.emailRepo.create({ email }),
    );
    customer.phoneNumbers = dto.phoneNumbers.map((p) =>
      this.phoneRepo.create({ type: p.type, number: p.number }),
    );
    return this.customerRepo.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    this.logger.log("Retrieving all customers");
    return this.customerRepo.find();
  }

  async findOne(id: string): Promise<Customer | null> {
    this.logger.log(`Retrieving customer ${id}`);
    return this.customerRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer | null> {
    this.logger.log(`Updating customer ${id}`);
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) return null;

    Object.assign(customer, dto);

    if (dto.address) {
      customer.address = this.addressRepo.create({
        ...customer.address,
        ...dto.address,
      });
    }
    if (dto.privacySettings) {
      customer.privacySettings = this.privacyRepo.create({
        ...customer.privacySettings,
        ...dto.privacySettings,
      });
    }
    if (dto.emails) {
      customer.emails = dto.emails.map((email) =>
        this.emailRepo.create({ email }),
      );
    }
    if (dto.phoneNumbers) {
      customer.phoneNumbers = dto.phoneNumbers.map((p) =>
        this.phoneRepo.create({ type: p.type, number: p.number }),
      );
    }

    await this.customerRepo.save(customer);
    return customer;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing customer ${id}`);
    await this.customerRepo.delete(id);
  }
}
