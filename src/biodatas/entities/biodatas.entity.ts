import { Users } from '#/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GenderUsers {
  PRIA = 'pria',
  WANITA = 'wanita',
}

@Entity()
export class Biodatas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  nik: string;

  @Column({
    type: 'varchar',
    length: 25,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  last_name: string;

  @Column({
    type: 'enum',
    enum: GenderUsers
  })
  gender: GenderUsers;

  @Column({
    type: 'date',
    nullable: true,
  })
  birth_date: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  photo_profile: string;

  @Column({
    type: 'char',
    length: 13,
  })
  telephone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  photo_ktp: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    default: false,
    nullable: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;

  @OneToOne(() =>  Users, (user) => user.biodatas)
  user: Users;
}
