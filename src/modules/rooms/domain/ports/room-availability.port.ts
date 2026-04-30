export const ROOM_AVAILABILITY_PORT = Symbol('ROOM_AVAILABILITY_PORT');

export interface RoomAvailabilityPort {
  isAvailable(roomId: number, startDate: Date, endDate: Date): Promise<boolean>;
}
