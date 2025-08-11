import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, VideosModule],
})
export class AppModule {}
