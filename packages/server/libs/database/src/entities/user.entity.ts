import {
  Column,
  Entity
} from 'typeorm';

import { BaseEntity } from './../domain/BaseEntity';

@Entity({ name: 'cat_users' })
export class UserEntity extends BaseEntity {
  @Column({
    length: 250,
    name: 'Password',
  })
  public password: string;

  @Column({
    length: 50,
    name: 'Username'
  })
  public username: string;

  @Column({
    length: 120,
    name: 'Email',
  })
  public email: string;

  @Column({
    length: 120,
    name: 'Name',
  })
  public name: string;

  @Column({
    length: 120,
    name: 'FatherSurname',
  })
  public fatherSurname: string;

  @Column({
    length: 120,
    name: 'MotherSurname',
  })
  public motherSurname: string;
}