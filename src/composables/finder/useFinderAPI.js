import { reactive, toRefs } from 'vue';
import axios from 'axios';
import HttpClient from '/@/core/api';

const state = reactive({
  conditions: [],
  models: [],
  queryUrl: encodeURIComponent(window.location.href),
});

export const formatVehicles = ({
  id,
  name,
  modelYear,
  images,
  price,
  condition,
  carFinderUrl,
  mileage,
  numberOfPreviousOwners,
  transmission,
  power,
  interior,
  exteriourColor,
  modelSeries,
  orderTypeCode,
  warranty
}) => {
  return {
    id,
    name,
    modelYear,
    price,
    condition,
    images,
    carFinderUrl,
    mileage,
    numberOfPreviousOwners,
    transmission,
    power,
    interior,
    exteriourColor,
    modelSeries,
    orderTypeCode,
    warranty
  };
};

export function useFinderAPI() {
  /* {
  marketplaceId = 'de',
  languageTag = 'de-DE',
  dealerId = '16859',
  modelSeries = '',
  numberOfResults = '',
} */
  const resultsState = reactive({
    vehicles: [],
    loading: false,
    error: null,
    isFetched: false,
    source: null,
  });

  async function fetchVehicles({ model, condition, numberOfResults }) {
    try {
      resultsState.isFetched = false;
      resultsState.loading = true;
      resultsState.error = null;

      const params = {
        language: window.SiteLanguage || 'en',
        sc_site: window.Site || 'developmentsite',
        numberOfResults,
        model,
      };
      if (condition.length > 0) {
        params.condition = condition.join();
      }

      const CancelToken = axios.CancelToken;
      if (resultsState.source) {
        resultsState.source.cancel('request cancelled');
      }
      resultsState.source = CancelToken.source();

      const { data } = await HttpClient.get('/carfinder/get', {
        params,
        cancelToken: resultsState.source.token,
      });
      resultsState.vehicles = data.map(formatVehicles);
    } catch (error) {
      if (axios.isCancel(error)) console.log(error.message);
      else {
        console.error('There was an error fetching vehicles');
        resultsState.error = error;
      }
    }
    resultsState.loading = false;
    resultsState.isFetched = true;
  }

  async function fetchFilters() {
    try {
      const params = {
        sc_site: window.Site || 'developmentsite',
      };

      const { data } = await HttpClient.get('/carfinder/filteroptions', {
        params,
      });
      state.conditions = data.vehicleType;
      state.models = data.modelSeries;
    } catch (error) {
      console.error('There was an error fetching filters');
    }
  }

  function updateQueryParams(value) {
    const filters = Object.keys(value);
    const queryString = filters
      .map((filter) => {
        if (Array.isArray(value[filter])) return mapFilterValues(value, filter);

        if (value[filter]) return filter + '=' + value[filter];

        return null;
      })
      .filter((value) => value)
      .join('&');

    window.history.replaceState('', '', '?' + queryString);

    state.queryUrl = encodeURIComponent(window.location.href);
  }

  function mapFilterValues(value, filter) {
    const values = Object.values(value[filter]);
    return values.map((filterValue) => filter + '=' + filterValue).join('&');
  }

  function decodeQueryParams(defaultFilters, query) {
    const cleanQueryString = query.replace('?', '');
    const filterPairs = cleanQueryString.split('&');
    const cloneFilters = defaultFilters;
    let i = 0;
    for (i; i < filterPairs.length; i++) {
      const [first, second] = filterPairs[i].split('=');
      Array.isArray(cloneFilters[first])
        ? cloneFilters[first].push(second)
        : (cloneFilters[first] = second);
    }
    Object.assign(defaultFilters, cloneFilters);
  }



  return {
    fetchVehicles,
    fetchFilters,
    updateQueryParams,
    decodeQueryParams,
    ...toRefs(state),
    ...toRefs(resultsState),
  };
}
