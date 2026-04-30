import {
  City,
  CreateCityData,
  UpdateCityData,
} from 'src/modules/cities/domain/entities/city.entity';

export const CITY_REPOSITORY = Symbol('CITY_REPOSITORY');

export interface CityRepository {
  findAll(): Promise<City[]>;
  findById(id: number): Promise<City | null>;
  create(data: CreateCityData): Promise<City>;
  update(id: number, data: UpdateCityData): Promise<City | null>;
}
