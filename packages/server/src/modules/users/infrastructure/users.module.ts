import { Module } from '@nestjs/common';
import { UserController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
})
export class UserModule {}
