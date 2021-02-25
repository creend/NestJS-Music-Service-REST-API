import { Test, TestingModule } from '@nestjs/testing';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';

describe('MusicController', () => {
  let musicsController: MusicsController;
  let musicsService: MusicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicsController],
      providers: [MusicsService],
    }).compile();

    musicsService = await module.resolve(MusicsService);
    musicsController = await module.resolve(MusicsController);
  });

  describe('find', () => {
    const result = {
      musics: [
        {
          title: 'Cafe Belga',
          length: 191,
          author: 'Taco Hemingway',
          genre: 'HipHop',
          _id: '603124831f807e26d81a4b5e',
          userId: '60216cea45451b065cc0c47b',
          createdAt: '2021-02-20T15:02:27.759Z',
          updatedAt: '2021-02-20T15:02:27.759Z',
        },
        {
          title: 'fiji',
          length: 300,
          author: 'Taco Hemingway',
          genre: 'HipHop',
          _id: '603124941f807e26d81a4b5f',
          userId: '60216cea45451b065cc0c47b',
          createdAt: '2021-02-20T15:02:44.826Z',
          updatedAt: '2021-02-20T15:02:44.826Z',
        },
      ],
      requiredPages: 1,
      count: 2,
      page: 1,
    };
    it('should return array of musics', async () => {
      // jest.spyOn(musicsService, 'find').mockImplementation(() => result);
      expect(await musicsService.find({})).toBe(result);
    });
  });
});
