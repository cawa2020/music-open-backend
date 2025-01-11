import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, JwtService, PrismaService, UserService],
})
export class PlaylistModule { }
