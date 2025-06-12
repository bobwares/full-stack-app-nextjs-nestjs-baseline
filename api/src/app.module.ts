/* ============================================================
 * File: api/src/app.module.ts
 * Version: 0.1.2
 * Author: AI Agent
 * Date: 2025-06-12
 * Description: Root application module configuring ORM and imports.
 * ============================================================ */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
})
export class AppModule {}
