export interface Hotel {
  id: number;
  name: string;
  address: string;
  cityId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHotelData {
  name: string;
  address: string;
  cityId: number;
}
