import { Module } from '@nestjs/common';
import { CitiesModule } from 'src/modules/cities/cities.module';
import { HotelsModule } from 'src/modules/hotels/hotels.module';

@Module({
  imports: [HotelsModule, CitiesModule],
})
export class GeoModule {}
