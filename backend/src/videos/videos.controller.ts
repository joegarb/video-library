import { Controller, Get, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video, VideoSchema, VideoQuerySchema } from 'video-library-common';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async get(
    @Query(new ZodValidationPipe(VideoQuerySchema))
    query?: z.infer<typeof VideoQuerySchema>,
  ): Promise<Video[]> {
    const videos = await this.videosService.findAll(query);
    return videos.map((video) =>
      VideoSchema.parse({
        id: video.id,
        title: video.title,
        thumbnail_url: video.thumbnail_url,
        created_at: video.created_at,
        duration: video.duration,
        views: video.views,
        tags: video.tags,
      }),
    );
  }
}
