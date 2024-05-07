import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  // если почта занята ошибка
  async create(body: CreateAuthDto) {
    const user = await this.prisma.user.create({ data: body })
    const payload = { id: user.id }
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } })
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id }
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
