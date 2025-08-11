import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { Video, VideoQuerySchema } from 'video-library-common';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';
import { VideoResponseDto } from './videos.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiOperation({
    summary: 'Get videos',
    description:
      'Retrieve a paginated list of videos with optional sorting and filtering',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort order for videos by creation date',
    schema: {
      type: 'string',
      enum: ['created_at_desc', 'created_at_asc'],
      default: 'created_at_desc',
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Maximum number of videos to return (1-100)',
    schema: {
      type: 'number',
      minimum: 1,
      maximum: 100,
      default: 100,
    },
  })
  @ApiQuery({
    name: 'after',
    required: false,
    description:
      'Video ID for pagination (get videos with ID less than this for DESC sort, greater than for ASC sort)',
    schema: {
      type: 'string',
    },
  })
  @ApiOkResponse({
    description: 'List of videos retrieved successfully',
    type: [VideoResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid query parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async get(
    @Query(new ZodValidationPipe(VideoQuerySchema))
    query?: z.infer<typeof VideoQuerySchema>,
  ): Promise<Video[]> {
    const videos = await this.videosService.findAll(query);
    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail_url: video.thumbnail_url,
      created_at: video.created_at.toISOString(),
      duration: video.duration,
      views: video.views,
      tags: video.tags,
    }));
  }
}
