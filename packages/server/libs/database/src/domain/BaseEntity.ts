import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'active',
    default: true,
  })
  public active: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  public createdAt: string;

  @Column({
    type: 'int',
  })
  public createdBy: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public updatedAt: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  public updatedBy: number;
}