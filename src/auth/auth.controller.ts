import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: RegisterDTO) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
      data: await this.authService.register(payload),
    };
  }

  @Get('/login')
  async login(@Body() payload: LoginDTO) {
    return {
      statusCode: HttpStatus.OK,
      message: await this.authService.login(payload),
    };
  }
}
