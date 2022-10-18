import axios from 'axios';
import { Console } from 'console';
const BASE_URL = 'https://tradein-api.slatldisal.aws.porsche.cloud/kbb';

export default {
  getVehicleMakeOptions() {
    return fetch(
      `${BASE_URL}/models?year=2020&makeId=5

    `,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
};
