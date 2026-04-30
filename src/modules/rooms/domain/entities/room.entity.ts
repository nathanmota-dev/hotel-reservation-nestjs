export interface Room {
  id: number;
  hotelId: number;
  name: string;
  capacity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoomData {
  hotelId: number;
  name: string;
  capacity: number;
  price: number;
}
