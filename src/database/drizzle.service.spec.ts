import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DrizzleService } from './drizzle.service';

describe('DrizzleService', () => {
  let service: DrizzleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrizzleService,
        {
          provide: ConfigService,
          useValue: {
            get: () =>
              'postgres://postgres:postgres@localhost:5432/hotel_reservation',
          },
        },
      ],
    }).compile();

    service = module.get<DrizzleService>(DrizzleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.db).toBeDefined();
  });
});
