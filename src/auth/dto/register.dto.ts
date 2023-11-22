import { GenderUsers } from '#/biodatas/entities/biodatas.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IsNull } from 'typeorm';

export class RegisterDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  levelId: string;

  @IsNotEmpty()
  nik: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEnum(GenderUsers)
  gender: GenderUsers;

  @IsNotEmpty()
  birth_date: Date;

  @IsNotEmpty()
  photo_profile: string;

  @IsNotEmpty()
  telephone: string;

  photo_ktp: string;

  @IsNotEmpty()
  address: string;
}
