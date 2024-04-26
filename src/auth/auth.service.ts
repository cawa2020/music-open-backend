import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  create(body: CreateAuthDto) {
    return this.prisma.user.create({ data: body })
  }

  async login(username: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { username: username } })
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user
    return result
  }
}
