import { Module } from '@nestjs/common';
import { RoomsModule } from 'src/modules/rooms/rooms.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule, RoomsModule],
})
export class BookingsModule {}
