import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async findOneByToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const id = payload.id;
      return this.prisma.user.findUnique({ where: { id: id } });
    } catch {
      throw new UnauthorizedException()
    }
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  create(body: CreateUserDto) {
    return this.prisma.user.create({ data: body });
  }

  async addToRecentlyPlayed(token: string, item: any) {
    const userId = await this.getUserId(token);
    const recentlyPlayd = (
      await this.prisma.user.findUnique({ where: { id: userId } })
    ).recentlyPlayed;
    const index = recentlyPlayd.findIndex(el => JSON.stringify(el) === item)
    if (index === -1) {
      recentlyPlayd.push(item)
    } else {
      recentlyPlayd.splice(index, 1)
      recentlyPlayd.unshift(item)
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { recentlyPlayed: recentlyPlayd },
    });
  }

  async toggleSong(token: string, song: any) {
    const userId = await this.getUserId(token);
    const favoriteSongs = (
      await this.prisma.user.findUnique({ where: { id: userId } })
    ).favoriteSongs;

    return this.prisma.user.update({
      where: { id: userId },
      data: { favoriteSongs: this.toggleItem(favoriteSongs, song) },
    });
  }

  async toggleAlbum(token: string, album: any) {
    const userId = await this.getUserId(token);
    const favoriteAlbums = (
      await this.prisma.user.findUnique({ where: { id: userId } })
    ).favoriteAlbums;

    return this.prisma.user.update({
      where: { id: userId },
      data: { favoriteAlbums: this.toggleItem(favoriteAlbums, album) },
    });
  }

  async togglePlaylist(token: string, playlist: any) {
    const userId = await this.getUserId(token);
    const favoritePlaylists = (
      await this.prisma.user.findUnique({ where: { id: userId } })
    ).favoritePlaylists;

    return this.prisma.user.update({
      where: { id: userId },
      data: { favoritePlaylists: this.toggleItem(favoritePlaylists, playlist) },
    });
  }

  async toggleArtist(token: string, artist: any) {
    const userId = await this.getUserId(token);
    const favoriteArtists = (
      await this.prisma.user.findUnique({ where: { id: userId } })
    ).favoriteArtists;

    return this.prisma.user.update({
      where: { id: userId },
      data: { favoriteArtists: this.toggleItem(favoriteArtists, artist) },
    });
  }

  private toggleItem(arr: any[], item: { id: string }) {
    const index = arr.findIndex((el) => {
      return el.id === item.id;
    });

    let newArr;
    if (index !== -1) {
      arr.splice(index, 1);
      newArr = arr;
    } else {
      newArr = [...arr, item];
    }

    return newArr;
  }

  private async getUserId(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    return payload.id;
  }
}
