import { ApiProperty } from '@nestjs/swagger';

export class VideoResponseDto {
  @ApiProperty({ description: 'Unique video identifier' })
  id: string;

  @ApiProperty({ description: 'Video title' })
  title: string;

  @ApiProperty({ description: 'URL to video thumbnail' })
  thumbnail_url: string;

  @ApiProperty({ description: 'ISO datetime when video was created' })
  created_at: string;

  @ApiProperty({ description: 'Video duration in seconds' })
  duration: number;

  @ApiProperty({ description: 'Number of video views' })
  views: number;

  @ApiProperty({ description: 'Array of video tags' })
  tags: string[];
}
