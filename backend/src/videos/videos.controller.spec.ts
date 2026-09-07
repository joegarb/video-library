import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: {
            findAll: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  it('should call service.findAll when get is called', async () => {
    const mockVideos = [];
    const findAllSpy = vi
      .spyOn(service, 'findAll')
      .mockResolvedValue(mockVideos);

    await controller.get();

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });
});
