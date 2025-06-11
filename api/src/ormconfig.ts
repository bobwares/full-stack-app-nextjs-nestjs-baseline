
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import {CustomerPhoneNumber} from "./customers/entities/customer-phone-number.entity";
import {CustomerEmail} from "./customers/entities/customer-email.entity";
import {PrivacySettings} from "./customers/entities/privacy-settings.entity";
import {PostalAddress} from "./customers/entities/postal-address.entity";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {Customer} from "./customers/entities/customer.entity";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('Environment variable DATABASE_URL must be defined');
}

const ormConfig: TypeOrmModuleOptions = {
    "type": 'postgres',
    "url": databaseUrl,
    "namingStrategy": new SnakeNamingStrategy(),
    "entities": [
        Customer,
        PostalAddress,
        PrivacySettings,
        CustomerEmail,
        CustomerPhoneNumber,
    ],

};

export default ormConfig;