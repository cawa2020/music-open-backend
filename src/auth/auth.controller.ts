import { Controller, Get, Post, Body, Patch, HttpCode, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  registration(@Body() body: CreateAuthDto) {
    return this.authService.create(body)
  }

  @Post('login')
  login(@Body() body: Record<string, string>) {
    return this.authService.login(body.username, body.password)
  }
}
