import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customers/customer.module';
import ormConfig from './ormconfig';

@Module({
  imports:
      [
        TypeOrmModule.forRoot(ormConfig),
        CustomerModule
      ],
})
export class AppModule {}