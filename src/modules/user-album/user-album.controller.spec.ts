import { Test, TestingModule } from '@nestjs/testing';
import { UserAlbumController } from './user-album.controller';

describe('UserAlbumController', () => {
  let controller: UserAlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAlbumController],
    }).compile();

    controller = module.get<UserAlbumController>(UserAlbumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
