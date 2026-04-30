export interface City {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCityData {
  name: string;
}

export interface UpdateCityData {
  name?: string;
}
