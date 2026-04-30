import { Hotel } from 'src/modules/hotels/domain/entities/hotel.entity';

export const HOTEL_LOOKUP_PORT = Symbol('HOTEL_LOOKUP_PORT');

export interface HotelLookupPort {
  findAll(): Promise<Hotel[]>;
  findById(id: number): Promise<Hotel | null>;
}
