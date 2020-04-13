import {
  Column,
  Entity
} from 'typeorm';

import { BaseEntity } from './../domain/BaseEntity';

@Entity({ name: 'cat_users' })
export class UserEntity extends BaseEntity {
  @Column({
    length: 250,
    name: 'password',
  })
  public password: string;

  @Column({
    length: 50,
  })
  public username: string;
}