import { Module } from '@nestjs/common';
import { UserController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities';

import { UserRepository } from '../repository/UserRepository';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';
import { CreateUserController } from '../useCases/createUser/CreateUserController';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, CreateUserUseCase, CreateUserController],
  controllers: [UserController],
})
export class UserModule {}
