import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/shared/infrastructure/config/configuration.module';
import { DrizzleService } from './drizzle.service';

@Module({
  imports: [ConfigurationModule],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DatabaseModule {}
