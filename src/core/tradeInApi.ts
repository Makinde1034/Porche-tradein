import axios from 'axios';
const BASE_URL = 'https://tradein-api.slatldisal.aws.porsche-preview.cloud/kbb';

export default {
  getVehicleModelOptions(year: string, makeId: string) {
    return fetch(`${BASE_URL}/models?year=${year}&makeId=${makeId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getVehicleMakeOptions(year: string) {
    return fetch(`${BASE_URL}/makes?year=${year} `, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getVehicleOptions(vehicleId: string) {
    return fetch(`${BASE_URL}/options?vehicleId=${vehicleId} `, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getVehicles(year: string, makeId: string, modelId: string) {
    return fetch(
      `${BASE_URL}/vehicles?year=${year}&makeId=${makeId}&modelId=${modelId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
  getYears() {
    return fetch(`${BASE_URL}/years`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getTraeInValue(data: any) {
    return fetch(`${BASE_URL}/values`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getPriceAdvisory(
    apiKey: string,
    vehicleId: string,
    optionids: string[],
    zipCode: string,
    mileage: string,
    condition: string
  ) {
    return fetch(
      `https://pauc.syndication.kbb.com/priceadvisorusedcar/tradein?APIKey=${apiKey}&VehicleId=${vehicleId}&OptionIds=${optionids}&ZipCode=${zipCode}&Mileage=${mileage}&Condition=${condition}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
  
      }
    );
  },
  getVin(vin: string) {
    return fetch(`${BASE_URL}/vin/${vin}`, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
  },
};
