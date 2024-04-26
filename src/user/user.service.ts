import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } })
  }

  create(body: CreateUserDto) {
    return this.prisma.user.create({ data: body })
  }

  async addSong(stringifySong: string, id: number) {
    const favoriteSongs = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteSongs
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [stringifySong, ...favoriteSongs] } })
  }
}
