import {
  Booking,
  CreateBookingData,
} from 'src/modules/bookings/domain/entities/booking.entity';

export const BOOKING_REPOSITORY = Symbol('BOOKING_REPOSITORY');

export interface BookingRepository {
  create(data: CreateBookingData): Promise<Booking>;
}
