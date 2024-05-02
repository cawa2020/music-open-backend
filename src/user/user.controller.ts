import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('byToken/:token')
  findOneByToken(@Param('token') token: string) {
    return this.userService.findOneByToken(token);
  }

  @Post('song')
  addSong(@Query('token') token: string, @Body() body: { song: string }) {
    return this.userService.addSong(token, body.song)
  }

  @Post('playlist')
  addPlaylist(@Query('token') token: string, @Body() playlist: string) {
    return this.userService.addPlaylist(token, playlist)
  }

  @Post('album')
  addAlbum(@Query('token') token: string, @Body() album: string) {
    return this.userService.addAlbum(token, album)
  }

  @Post('artist')
  addArtist(@Query('token') token: string, @Body() artist: string) {
    return this.userService.addArtist(token, artist)
  }
}
