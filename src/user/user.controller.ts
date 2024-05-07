import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

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

  @Post('song')
  addSong(@Query('token') token: string, @Body() body: { song: string }) {
    return this.userService.toggleSong(token, body.song);
  }

  @Post('playlist')
  addPlaylist(@Query('token') token: string, @Body() playlist: string) {
    return this.userService.togglePlaylist(token, playlist);
  }

  @Post('album')
  addAlbum(@Query('token') token: string, @Body() album: string) {
    return this.userService.toggleAlbum(token, album);
  }

  @Post('artist')
  addArtist(@Query('token') token: string, @Body() artist: string) {
    return this.userService.toggleArtist(token, artist);
  }
}
