import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Post()
  create(
    @Query('token') token: string,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    return this.playlistService.create(createPlaylistDto, token);
  }

  @Patch(':id')
  update(
    @Query('token') token: string,
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(token, +id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Query('token') token: string, @Param('id') id: string) {
    return this.playlistService.remove(token, +id);
  }
}
