export const GEO_PROVIDER_PORT = Symbol('GEO_PROVIDER_PORT');

export interface GeoProviderPort {
  getStatus(): Promise<boolean>;
  searchHotelsByAddress(address: string): Promise<unknown[]>;
}
