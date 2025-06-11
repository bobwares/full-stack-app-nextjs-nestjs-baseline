// App: Initial Full-Stack Application
// Package: api
// File: src/customers/customer.controller.test.ts
// Version: 0.1.0
// Author: Bobwares
// Date: 2025-06-11T03:09:01Z
// Description: Unit tests for CustomerController routing logic.
//
import "reflect-metadata";
import { Test } from "@nestjs/testing";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

describe("CustomerController", () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(CustomerController);
    service = moduleRef.get(CustomerService);
  });

  it("calls service.create on POST", async () => {
    const dto: any = {
      id: "1",
      firstName: "a",
      lastName: "b",
      emails: ["x@x"],
      phoneNumbers: [{ type: "mobile", number: "+1" }],
      address: {
        line1: "x",
        city: "c",
        state: "s",
        postalCode: "p",
        country: "US",
      },
      privacySettings: {
        marketingEmailsEnabled: true,
        twoFactorEnabled: false,
      },
    };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
