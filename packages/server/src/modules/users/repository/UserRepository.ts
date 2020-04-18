import { Injectable } from "@nestjs/common";
import { InjectRepository } from "libs/database/node_modules/@nestjs/typeorm";
import { UserEntity } from "@database/entities";

interface IUseRepository {

}

@Injectable()
export class UserRepository implements IUseRepository{
  constructor (@InjectRepository(UserEntity) private userEntity: UserEntity) {}
}