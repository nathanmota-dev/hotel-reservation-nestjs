import {
  CreateRoomData,
  Room,
} from 'src/modules/rooms/domain/entities/room.entity';

export const ROOM_REPOSITORY = Symbol('ROOM_REPOSITORY');

export interface RoomRepository {
  findById(id: number): Promise<Room | null>;
  create(data: CreateRoomData): Promise<Room>;
  delete(id: number): Promise<Room | null>;
}
