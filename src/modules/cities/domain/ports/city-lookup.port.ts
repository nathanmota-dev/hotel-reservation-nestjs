import { City } from 'src/modules/cities/domain/entities/city.entity';

export const CITY_LOOKUP_PORT = Symbol('CITY_LOOKUP_PORT');

export interface CityLookupPort {
  findAll(): Promise<City[]>;
  findById(id: number): Promise<City | null>;
}
