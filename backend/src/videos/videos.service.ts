import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video as VideoEntity } from './video.entity';
import { VideoQuery } from 'video-library-common';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async findAll(query?: Partial<VideoQuery>): Promise<VideoEntity[]> {
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

    if (query?.after) {
      const afterDate = new Date(query.after);
      if (query.sort === 'created_at_asc') {
        queryBuilder.andWhere('video.created_at > :after', {
          after: afterDate,
        });
      } else {
        queryBuilder.andWhere('video.created_at < :after', {
          after: afterDate,
        });
      }
    }

    if (query?.limit != null) {
      queryBuilder.take(query.limit);
    }

    return queryBuilder.getMany();
  }
}
