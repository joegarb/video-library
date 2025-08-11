import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { VideosService } from './videos.service';
import {
  Video,
  VideoQuerySchema,
  CreateVideoSchema,
} from 'video-library-common';
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
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term to filter videos by title (case-insensitive)',
    schema: {
      type: 'string',
    },
  })
  @ApiQuery({
    name: 'dateFrom',
    required: false,
    description:
      'ISO date string for filtering videos created from this date onwards',
    schema: {
      type: 'string',
      format: 'date-time',
    },
  })
  @ApiQuery({
    name: 'dateTo',
    required: false,
    description: 'ISO date string for filtering videos created up to this date',
    schema: {
      type: 'string',
      format: 'date-time',
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

  @Post()
  @ApiOperation({
    summary: 'Create a new video',
    description: 'Create a new video with required title and optional tags',
  })
  @ApiBody({
    description: 'Video creation data',
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
          description: 'Video title (required)',
          minLength: 1,
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional array of video tags',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Video created successfully',
    type: VideoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid input data',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async create(
    @Body(new ZodValidationPipe(CreateVideoSchema))
    createVideoDto: z.infer<typeof CreateVideoSchema>,
  ): Promise<Video> {
    const video = await this.videosService.create(createVideoDto);
    return {
      id: video.id,
      title: video.title,
      thumbnail_url: video.thumbnail_url,
      created_at: video.created_at.toISOString(),
      duration: video.duration,
      views: video.views,
      tags: video.tags,
    };
  }
}
