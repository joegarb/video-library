import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../videos/video.entity';
import * as fs from 'fs';
import * as path from 'path';

interface VideoSeedData {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

interface SeedData {
  videos: VideoSeedData[];
}

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async seedVideos(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // Seed videos if none exist
    const existingVideos = await this.videoRepository.count();
    if (existingVideos > 0) {
      return;
    }

    const seedDataPath = path.join(__dirname, 'videos.json');
    const seedData = JSON.parse(
      fs.readFileSync(seedDataPath, 'utf8'),
    ) as SeedData;

    const videos = seedData.videos.map((videoData: VideoSeedData) => {
      const video = new Video();
      video.id = videoData.id;
      video.title = videoData.title;
      video.thumbnail_url = videoData.thumbnail_url;
      video.created_at = new Date(videoData.created_at);
      video.duration = videoData.duration;
      video.views = videoData.views;
      video.tags = videoData.tags;
      return video;
    });

    await this.videoRepository.save(videos);
    this.logger.log(`Seeded ${videos.length} videos`);
  }
}
