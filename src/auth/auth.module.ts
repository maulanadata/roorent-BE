import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from '#/users/entities/user.entity';
import { UsersModule } from '#/users/users.module';
import { LevelsModule } from '#/levels/levels.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.service';
import { BiodatasModule } from '#/biodatas/biodatas.module';
import { Biodatas } from '#/biodatas/entities/biodatas.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'TOPSECRET2023',
      signOptions: { expiresIn: '24h'},
    }),
    TypeOrmModule.forFeature([Users, Biodatas]), UsersModule, LevelsModule, BiodatasModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
