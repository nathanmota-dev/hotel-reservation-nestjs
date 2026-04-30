import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/modules/cities/cities.module';

@Module({
  imports: [CitiesModule],
})
export class HotelsModule {}
