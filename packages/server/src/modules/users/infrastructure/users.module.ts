import { Module } from '@nestjs/common';
import { UserController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities';

import { UserRepository } from '../repository/UserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserRepository],
  controllers: [UserController],
})
export class UserModule {}
