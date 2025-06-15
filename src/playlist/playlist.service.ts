import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { PrismaService } from 'src/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JsonValue } from '@prisma/client/runtime/library';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PlaylistService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto, token: string) {
    const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, });
    const user = await this.userService.findOne(payload.id)
    const data = {
      title: createPlaylistDto.title,
      songs: createPlaylistDto.songs,
      creationDate: new Date().toISOString(),
      userId: payload.id,
      userName: user.username
    }
    const playlist = await this.prisma.playlist.create({
      data: data,
      include: { user: true }
    });

    await this.prisma.user.update({
      where: { id: payload.id },
      data: { playlists: { connect: { id: playlist.id } } }
    });

    return playlist
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    const playlist = this.prisma.playlist.findFirst({ where: { id: id } })
    return playlist
  }

  async toggleSong(token: string, id: number, newSong: JsonValue) {
    const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, });
    if (!payload.id) return
    const songs: any = await (await (this.prisma.playlist.findUnique({ where: { id: id } }))).songs
    if (songs.find(song => (song as any).id === (newSong as any).id)) {
      const index = songs.findIndex(el => (el as any).id === (newSong as any).id)
      songs.splice(index, 1)
    } else {
      songs.push(newSong)
    }
    return this.prisma.playlist.update({ where: { id: id }, data: { songs: songs } })
  }

  update(token: string, id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(token: string, id: number) {
    return `This action removes a #${id} playlist`;
  }
}
