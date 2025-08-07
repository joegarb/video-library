import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, VideosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
