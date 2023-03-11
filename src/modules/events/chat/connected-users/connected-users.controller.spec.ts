import { Test, TestingModule } from '@nestjs/testing';
import { ConnectedUsersController } from './connected-users.controller';
import { ConnectedUsersService } from './connected-users.service';

describe('ConnectedUsersController', () => {
  let controller: ConnectedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectedUsersController],
      providers: [ConnectedUsersService],
    }).compile();

    controller = module.get<ConnectedUsersController>(ConnectedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
