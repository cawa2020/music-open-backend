import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Post(':id/song')
  addSong(@Param('id') id: string, @Body() body: { song: string }) {
    return this.userService.addSong(+id, body.song)
  }

  @Post('playlist')
  addPlaylist(@Param('id') id: string, @Body() playlist: string) {
    return this.userService.addPlaylist(+id, playlist)
  }

  @Post('album')
  addAlbum(@Param('id') id: string, @Body() album: string) {
    return this.userService.addAlbum(+id, album)
  }

  @Post('artist')
  addArtist(@Param('id') id: string, @Body() artist: string) {
    return this.userService.addArtist(+id, artist)
  }
}
