import {
  CreateHotelData,
  Hotel,
} from 'src/modules/hotels/domain/entities/hotel.entity';

export const HOTEL_REPOSITORY = Symbol('HOTEL_REPOSITORY');

export interface HotelRepository {
  findAll(): Promise<Hotel[]>;
  findById(id: number): Promise<Hotel | null>;
  create(data: CreateHotelData): Promise<Hotel>;
}
