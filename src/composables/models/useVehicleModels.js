import { reactive, computed } from 'vue';
import HttpClient from '../../core/api';

const state = reactive({
  models: [],
  bodyTypes: [],
});

const ModelRanges = {
  CAYENNE: 'cayenne',
  TAYCAN: 'taycan',
  MACAN: 'macan',
  911: '911',
  718: '718',
  PANAMERA: 'panamera',
};

const TransmissionTypes = {
  MANUAL: 'manual',
  PDK: 'pdk',
  TIPTRONIC: 'tiptronic',
  TWO_SPEED_LOW: '2speed_low',
  TWO_SPEED_HIGH: '2speed_high',
  TBA: 'tba',
};

const formatModel = (model) => {
  // IMPORTANT: All this is temporaly, there will be a proper BE API soon
  const { name, data, modelicon, economydata, label, type, modelrange } = model;

  const { thumbnail, pictureWidth } = modelicon;

  const [economy] = economydata;

  let consumption, emission, efficiencyClass, custom15;
  let transmission = TransmissionTypes.PDK;

  const overlayTitle = economy?.label || '';
  let overlaySubtitle, overlayConsumption, overlayEmission;

  if (modelrange === ModelRanges.TAYCAN) {
    consumption = economy?.econsumption;
    emission = economy?.emission;
    efficiencyClass = economy?.efficiencyclass
    custom15 = economy?.custom15
    overlaySubtitle = economy?.econsumption?.label || '';
    overlayConsumption = economy?.econsumption?.formatedvalue || '';
    overlayEmission = economy?.emission?.formatedvalue || '';
  } else {
    consumption = economy?.consumption;
    emission = economy?.emission;
    efficiencyClass = economy?.efficiencyclass
    custom15 = economy?.custom15
    overlaySubtitle = economy?.consumption?.label || '';
    overlayConsumption = economy?.consumption?.formatedvalue || '';
    overlayEmission = economy?.emission?.formatedvalue || '';
  }

  /* 911 and 718: check for pdk and manual
  if both are there, show data from model.data.pdk
  if pdk is not there, show manual */

  if (modelrange === ModelRanges[911] || modelrange === ModelRanges[718]) {
    if (!data[transmission]) {
      transmission = TransmissionTypes.MANUAL;
    }
  } else if (modelrange === ModelRanges.TAYCAN) {
    /*
  Taycan: check for 2speed_low and 2speed_high
  if both are there, show data from 2speed_low
  if 2speed_low is not there, show 2speed_high 
  */
    transmission = data[TransmissionTypes.TWO_SPEED_LOW]
      ? TransmissionTypes.TWO_SPEED_LOW
      : TransmissionTypes.TWO_SPEED_HIGH;
  }
  // Cayenne: check for tiptronic
  else if (modelrange === ModelRanges.CAYENNE) {
    transmission = data[TransmissionTypes.TIPTRONIC]
      ? TransmissionTypes.TIPTRONIC
      : TransmissionTypes.PDK;
  }

  if (!data[transmission] && TransmissionTypes.TBA) {
    transmission = TransmissionTypes.TBA
  }

  const {
    Power_kW,
    Power_hp,
    Overboost_Power_kW,
    Overboost_Power_hp,
    Acceleration,
    Acceleration_launch_control,
    Acceleration_scp,
    Topspeed,
  } = data[transmission];

  let powerKW, powerHP, acceleration;

  powerKW = modelrange === ModelRanges.TAYCAN ? Overboost_Power_kW : Power_kW;
  powerHP = modelrange === ModelRanges.TAYCAN ? Overboost_Power_hp : Power_hp;

  acceleration =
    modelrange === ModelRanges.TAYCAN
      ? Acceleration_launch_control
      : Acceleration || Acceleration_scp;

  return {
    name,
    label,
    type,
    price: data[transmission].price,
    thumbnail,
    pictureWidth,
    consumption,
    emission,
    efficiencyClassImage: economy?.efficiencyclassimage,
    powerKW: powerKW?.text || '',
    powerKWLabel: powerKW?.title || '',
    powerHP: powerHP?.text || '',
    powerHPLabel: powerHP?.title || '',
    acceleration: acceleration?.text || '',
    accelerationLabel: acceleration?.title || '',
    topSpeed: Topspeed?.text || '',
    topSpeedLabel: Topspeed?.title || '',
    overlayTitle,
    overlaySubtitle,
    overlayConsumption,
    overlayEmission,
    efficiencyClass,
    custom15,
  };
};

export function useVehicleModels() {
  async function fetchModelsBySeries({ series }) {
    try {
      const { data } = await HttpClient.get('/vehiclesmodels/get', {
        params: {
          language: window.SiteLanguage || 'en',
          sc_site: window.Site || 'developmentsite',
          series,
        },
      });

      const types = data.models.map((model) => model.type);
      const filteredTypes = types.filter(
        (type, index) => types.indexOf(type) === index
      );

      state.bodyTypes =
        filteredTypes.length > 1 ? ['all', ...filteredTypes] : [];
      state.models = data.models;
    } catch (error) {
      console.error('There was an error fetching vehicle models');
    }
  }

  const modelList = computed(() => state.models);
  const formattedModelList = computed(() => state.models.map(formatModel));
  const bodyTypes = computed(() => state.bodyTypes);

  return {
    modelList,
    formattedModelList,
    bodyTypes,
    fetchModelsBySeries,
  };
}
