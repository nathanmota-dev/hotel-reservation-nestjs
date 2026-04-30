import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleService } from './drizzle.service';
import { AppConfigService } from 'src/shared/infrastructure/config/app-config.service';

describe('DrizzleService', () => {
  let service: DrizzleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrizzleService,
        {
          provide: AppConfigService,
          useValue: {
            getDatabaseUrl: () =>
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
