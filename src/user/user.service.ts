import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async findOneByToken(token: string) {
    const payload = await this.jwtService.verifyAsync(
      token, { secret: jwtConstants.secret }
    );
    const id = payload.id
    return this.prisma.user.findUnique({ where: { id: id } })
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } })
  }

  create(body: CreateUserDto) {
    return this.prisma.user.create({ data: body })
  }

  async addSong(token: string, strSong: string) {
    const payload = await this.jwtService.verifyAsync(
      token, { secret: jwtConstants.secret }
    );
    const id = payload.id
    const favoriteSongs = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteSongs
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [strSong, ...favoriteSongs] } })
  }

  async addAlbum(token: string, album: any) {
    const payload = await this.jwtService.verifyAsync(
      token, { secret: jwtConstants.secret }
    );
    const id = payload.id
    const favoriteAlbums = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteAlbums
    return this.prisma.user.update({ where: { id: id }, data: { favoriteAlbums: [album, ...favoriteAlbums] } })
  }

  async addPlaylist(token: string, strPlaylist: any) {
    const payload = await this.jwtService.verifyAsync(
      token, { secret: jwtConstants.secret }
    );
    const id = payload.id
    const favoritePlaylists = (await this.prisma.user.findUnique({ where: { id: id } })).favoritePlaylists
    return this.prisma.user.update({ where: { id: id }, data: { favoritePlaylists: [strPlaylist, ...favoritePlaylists] } })
  }

  async addArtist(token: string, strArtist: any) {
    const payload = await this.jwtService.verifyAsync(
      token, { secret: jwtConstants.secret }
    );
    const id = payload.id
    const favoriteArtists = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteArtists
    return this.prisma.user.update({ where: { id: id }, data: { favoriteArtists: [strArtist, ...favoriteArtists] } })
  }
}
