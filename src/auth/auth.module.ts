import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from '#/users/entities/user.entity';
import { UsersModule } from '#/users/users.module';
import { LevelsModule } from '#/levels/levels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersModule, LevelsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
