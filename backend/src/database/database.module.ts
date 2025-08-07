import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../videos/video.entity';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Video],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables
    }),
    TypeOrmModule.forFeature([Video]),
  ],
  providers: [SeedService],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedVideos();
  }
}
