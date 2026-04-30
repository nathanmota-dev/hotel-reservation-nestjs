import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import { AppConfigService } from 'src/shared/infrastructure/config/app-config.service';
import * as schema from './schema';

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  readonly db;
  private readonly client: Sql;

  constructor(private readonly appConfigService: AppConfigService) {
    this.client = postgres(this.appConfigService.getDatabaseUrl(), {
      max: 1,
      prepare: false,
    });
    this.db = drizzle(this.client, { schema });
  }

  async onModuleDestroy() {
    await this.client.end({ timeout: 5 });
  }
}
