import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  registration(@Body() body: CreateAuthDto) {
    return this.authService.create(body)
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body.email, body.password)
  }
}
