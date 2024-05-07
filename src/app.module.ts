import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UserModule, PlaylistModule],
})
export class AppModule {}
