import { DwaasMedia } from '/@/types';

export interface Vehicle {
  media: Array<DwaasMedia>;
  images: Array<{
    imageDimensions: Array<DwaasMedia>;
  }>;
  name: string;
  modelYear: string | number;
  condition: string; // TODO: add proper type based on pre-owned, owned etc
  price: string | number;
  url: string;
  mileage: string | number;
  numberOfPreviousOwners: string;
  transmission: string;
  power: string;
  exteriourColor: string;
  interior: string;
}

interface LocalizedValue {
  localized: string;
  value?: string;
}
export interface VehicleDTO {
  id: string;
  name: string;
  modelYear: string | number;
  images: Array<{
    imageDimensions: Array<DwaasMedia>;
  }>;
  price: {
    value: string | number;
    currencyCode: string;
    localized: string;
  };
  condition: LocalizedValue;
  carFinderUrl: string;
  mileage: {
    value: string | number;
    unit: string;
    localized: string;
  };
  numberOfPreviousOwners: string | number;
  transmission: LocalizedValue;
  power: LocalizedValue;
  interior: string;
  exteriourColor: LocalizedValue;
  warranty: {
    porscheApproved: boolean;
  };
  modelSeries: LocalizedValue;
  orderTypeCode: string;
}

export interface CarCollection {
  listingId: string;
  type: string;
  realcarStatus: string | unknown;
  isPorscheApproved: boolean;
  modelRangeName: string | unknown;
  modelCode: string;
  modelName: string;
  modelModelYear: string | number;
  exteriorColorName: string;
  interiorColorName: string;
  priceTotalTotal: string | number;
  mileage: string | number;
  mileageUnit: string;
}
