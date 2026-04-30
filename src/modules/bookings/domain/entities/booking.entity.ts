export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingData {
  userId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
}
