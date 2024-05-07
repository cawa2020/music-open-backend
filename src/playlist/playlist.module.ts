import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService, JwtService, PrismaService],
})
export class PlaylistModule {}
