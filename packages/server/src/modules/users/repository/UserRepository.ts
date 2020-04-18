import { Injectable } from "@nestjs/common";
import { InjectRepository } from "libs/database/node_modules/@nestjs/typeorm";
import { UserEntity } from "@database/entities";

import { Repository } from 'typeorm';
import { User } from "../domain/User";
import { UserMap } from "../mappers/UserMapper";

interface IUseRepository {
  exists(email: string): Promise<boolean>;
  save(user: User): Promise<void>;
}

@Injectable()
export class UserRepository implements IUseRepository{
  constructor (@InjectRepository(UserEntity) private userModel: Repository<UserEntity>) {}

  async exists(email: string): Promise<boolean> {
    const user =  await this.userModel.findOne({ where: { email } });
    return !!user === true
  }

  async save(user: User): Promise<void> {
    const {
      email,
      username,
      password,
      name,
      fatherSurname,
      motherSurname
    } = await UserMap.toPersistence(user);

    const exists = await this.exists(email);

    try {
      if (!exists) {
        await this.userModel.save({
          email,
          username,
          password,
          name,
          fatherSurname,
          motherSurname,
          createdBy: 0
        });
      } else {
        // TODO: Update something
      }
    } catch(err) {
      console.log(err)
    }
  }
}