import { Test } from '@nestjs/testing';
import { AppHealthModule } from 'src/app/app-health.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { BookingsModule } from 'src/modules/bookings/bookings.module';
import { CitiesModule } from 'src/modules/cities/cities.module';
import { GeoModule } from 'src/modules/geo/geo.module';
import { HotelsModule } from 'src/modules/hotels/hotels.module';
import { RoomsModule } from 'src/modules/rooms/rooms.module';
import { UsersModule } from 'src/modules/users/users.module';

describe('Module smoke tests', () => {
  it.each([
    ['AppHealthModule', AppHealthModule],
    ['UsersModule', UsersModule],
    ['AuthModule', AuthModule],
    ['CitiesModule', CitiesModule],
    ['HotelsModule', HotelsModule],
    ['RoomsModule', RoomsModule],
    ['BookingsModule', BookingsModule],
    ['GeoModule', GeoModule],
  ])('should compile %s', async (_, moduleClass) => {
    const testingModule = await Test.createTestingModule({
      imports: [moduleClass],
    }).compile();

    expect(testingModule).toBeDefined();

    await testingModule.close();
  });
});
