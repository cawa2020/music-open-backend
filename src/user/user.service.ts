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

  async addSong(id: number, strSong: string) {
    const favoriteSongs = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteSongs
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [strSong, ...favoriteSongs] } })
  }

  async addAlbum(id: number, strSong: string) {
    const favoriteAlbums = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteAlbums
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [strSong, ...favoriteAlbums] } })
  }

  async addPlaylist(id: number, strPlaylist: string) {
    const favoritePlaylists = (await this.prisma.user.findUnique({ where: { id: id } })).favoritePlaylists
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [strPlaylist, ...favoritePlaylists] } })
  }

  async addArtist(id: number, strArtist: string) {
    const favoriteArtists = (await this.prisma.user.findUnique({ where: { id: id } })).favoriteArtists
    return this.prisma.user.update({ where: { id: id }, data: { favoriteSongs: [strArtist, ...favoriteArtists] } })
  }
}
