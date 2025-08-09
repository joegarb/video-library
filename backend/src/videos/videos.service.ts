import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video as VideoEntity } from './video.entity';
import { VideoQuerySchema } from 'video-library-common';
import { z } from 'zod';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async findAll(
    query?: Partial<z.infer<typeof VideoQuerySchema>>,
  ): Promise<VideoEntity[]> {
    const queryBuilder = this.videoRepository.createQueryBuilder('video');

    if (query?.sort) {
      switch (query.sort) {
        case 'created_at_asc':
          queryBuilder.orderBy('video.created_at', 'ASC');
          break;
        case 'created_at_desc':
          queryBuilder.orderBy('video.created_at', 'DESC');
          break;
      }
    } else {
      queryBuilder.orderBy('video.created_at', 'DESC');
    }

    if (query?.limit != null) {
      queryBuilder.take(query.limit);
    }

    return queryBuilder.getMany();
  }
}
