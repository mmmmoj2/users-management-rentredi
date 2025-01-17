import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [HttpModule],
      providers: [UsersService, HttpService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
