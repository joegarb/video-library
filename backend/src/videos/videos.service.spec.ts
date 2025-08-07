import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideosService } from './videos.service';
import { Video as VideoEntity } from './video.entity';
import { VideoQuery } from 'video-library-common';

describe('VideosService', () => {
  let service: VideosService;
  let repository: Repository<VideoEntity>;

  const mockVideoEntity: VideoEntity = {
    id: 'v-001',
    title: 'Test Video',
    thumbnail_url: 'https://example.com/thumb.jpg',
    created_at: new Date('2025-01-15T14:23:11Z'),
    duration: 184,
    views: 12453,
    tags: ['test', 'video'],
  };

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getRepositoryToken(VideoEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    repository = module.get<Repository<VideoEntity>>(
      getRepositoryToken(VideoEntity),
    );
  });

  describe('findAll', () => {
    it('should return an array of video entities', async () => {
      const mockVideos = [mockVideoEntity];
      mockQueryBuilder.getMany.mockResolvedValue(mockVideos);

      const result = await service.findAll();

      expect(result).toEqual(mockVideos);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('video');
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'video.created_at',
        'DESC',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should return empty array when no videos exist', async () => {
      mockQueryBuilder.getMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('video');
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'video.created_at',
        'DESC',
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should apply sorting when query.sort is provided', async () => {
      const mockVideos = [mockVideoEntity];
      mockQueryBuilder.getMany.mockResolvedValue(mockVideos);

      const query: Partial<VideoQuery> = { sort: 'created_at_asc' };
      const result = await service.findAll(query);

      expect(result).toEqual(mockVideos);
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'video.created_at',
        'ASC',
      );
    });
  });
});
