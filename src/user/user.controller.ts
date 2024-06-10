import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Header, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('me/:token')
  findOneByToken(@Param('token') token: string) {
    return this.userService.findOneByToken(token);
  }

  @UseGuards(AuthGuard)
  @Post('song')
  addSong(@Body() song: string, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.userService.toggleSong(token, song);
  }

  @UseGuards(AuthGuard)
  @Post('playlist')
  addPlaylist(@Body() playlist: string, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.userService.togglePlaylist(token, playlist);
  }

  @UseGuards(AuthGuard)
  @Post('album')
  addAlbum(@Body() album: string, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.userService.toggleAlbum(token, album);
  }

  @UseGuards(AuthGuard)
  @Post('artist')
  addArtist(@Body() artist: string, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.userService.toggleArtist(token, artist);
  }

  @UseGuards(AuthGuard)
  @Post('recentlyPlayed')
  addRecentlyPlayd(@Body() item: string, @Headers() headers) {
    const token = headers.authorization.split(' ')[1];
    return this.userService.addToRecentlyPlayed(token, item);
  }
}
