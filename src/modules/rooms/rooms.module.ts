import { Module } from '@nestjs/common';
import { HotelsModule } from 'src/modules/hotels/hotels.module';

@Module({
  imports: [HotelsModule],
})
export class RoomsModule {}
