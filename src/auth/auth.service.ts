import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { Users } from '#/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelsService } from '#/levels/levels.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private levelService: LevelsService,
  ) {}

  async register(payload: RegisterDTO) {
    try {
      const findUserId = await this.levelService.findOne(payload.levelId);

      const usersEntity = new Users();
      usersEntity.email = payload.email;
      usersEntity.password = payload.password;
      usersEntity.level = findUserId;

      const insertUsers = await this.usersRepository.insert(usersEntity);

      return this.usersRepository.findOneOrFail({
        where: {
          id: insertUsers.identifiers[0].id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async login(payload: LoginDTO) {
    try {
      const { email, password } = payload;

      const user = await this.usersRepository.findOneOrFail({
        where: { email },
      });
      const isPasswordValid = password === user.password;

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return 'Login success';
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
