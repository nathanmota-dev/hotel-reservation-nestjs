import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppHealthModule } from './app/app-health.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CitiesModule } from './modules/cities/cities.module';
import { GeoModule } from './modules/geo/geo.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigurationModule } from './shared/infrastructure/config/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigurationModule,
    AppHealthModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    HotelsModule,
    RoomsModule,
    BookingsModule,
    GeoModule,
  ],
})
export class AppModule {}
