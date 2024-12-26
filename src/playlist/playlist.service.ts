import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { PrismaService } from 'src/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Song } from './entities/playlist.entity';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class PlaylistService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto, token: string) {
    const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, });
    const playlist = await this.prisma.playlist.create({
      data: {
        title: createPlaylistDto.title,
        songs: createPlaylistDto.songs,
        creationDate: new Date().toISOString(),
        userId: payload.id
      },
      include: {
        user: true, // Включаем связанного пользователя
      }
    });

    // Обновляем список плейлистов у пользователя
    await this.prisma.user.update({
      where: { id: payload.id },
      data: {
        playlists: {
          connect: { id: playlist.id }
        }
      }
    });
    // const createdPlaylists = (await this.prisma.user.findUnique({ where: { id: userId } })).
    // createdPlaylists.push(playlist)
    // return this.prisma.user.update({
    //   where: { id: userId },
    //   data: { createdPlaylists: createdPlaylists },
    // });
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    const playlist = this.prisma.playlist.findFirst({ where: { id: id } })
    return playlist
  }

  async addSongs(token: string, id: number, newSongs: JsonValue[]) {
    const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, });
    if (!payload.id) return
    const songs = await (await (this.prisma.playlist.findUnique({ where: { id: id } }))).songs
    songs.push(...newSongs)
    return this.prisma.playlist.update({ where: { id: id }, data: { songs: songs } })
  }

  update(token: string, id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(token: string, id: number) {
    return `This action removes a #${id} playlist`;
  }
}
