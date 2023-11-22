import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelsService } from '#/levels/levels.service';
import { LoginDTO } from './dto/login.dto';
import { Users } from '#/users/entities/user.entity';
import { Biodatas } from '#/biodatas/entities/biodatas.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Biodatas)
    private biodatasRepository: Repository<Biodatas>,
    private levelService: LevelsService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDTO) {
    try {
      const findUserId = await this.levelService.findOne(payload.levelId);

      //generate salt
      const saltGenerate = await bcrypt.genSalt();

      //hash password
      const hash = await bcrypt.hash(payload.password, saltGenerate)

      const usersEntity = new Users();
      usersEntity.email = payload.email;
      usersEntity.salt = saltGenerate;
      usersEntity.password = hash;
      usersEntity.level = findUserId;

      const biodatasEntity = new Biodatas();
      biodatasEntity.nik = payload.nik;
      biodatasEntity.first_name = payload.first_name;
      biodatasEntity.last_name = payload.last_name;
      biodatasEntity.gender = payload.gender;
      biodatasEntity.birth_date = new Date(payload.birth_date);
      biodatasEntity.photo_profile = payload.photo_profile;
      biodatasEntity.telephone = payload.telephone;
      biodatasEntity.photo_ktp = payload.photo_ktp;
      biodatasEntity.address = payload.address;

      const insertUsers = await this.usersRepository.insert(usersEntity);
      const insertBiodatas = await this.biodatasRepository.insert(biodatasEntity);

      return (
        this.usersRepository.findOneOrFail({
          where: {
            id: insertUsers.identifiers[0].id,
          },
        }),
        this.biodatasRepository.findOneOrFail({
          where: {
            id: insertBiodatas.identifiers[0].id,
          }
        })
      );
    } catch (err) {
      throw err;
    }
  }

  async login(payload: LoginDTO) {
    try {
      const userOne = await this.usersRepository.findOne({
        where: {email: payload.email}
      })

      if (!userOne) {
        throw new HttpException (
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Email is invalid',
          },
          HttpStatus.BAD_REQUEST,
          )
      }

      const isMatch = await bcrypt.compare(payload.password, userOne.password);

      if (!isMatch) {
        throw new HttpException (
          {
              statusCode: HttpStatus.BAD_REQUEST,
              error: 'password is invalid',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const datas = {
        id: userOne.id,
        email: userOne.email
    }

    return {accessToken: await this.jwtService.sign(datas)}
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credential',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
