<template lang="">
  <form @submit.prevent="moveTonextStage" class="wrapper">
    <section class="input__wrap">
      <div class="input__box">
        <p-select-wrapper filter="true" label="Year">
          <select v-model="msg.year" name="make" required>
            <option @input="test" v-for="(year, index) in years" :key="index">
              {{ year.yearId }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <!-- make -->
      <div class="input__box">
        <p-select-wrapper filter="true" label="Make">
          <select v-model="msg.make" name="make" required>
            <option @input="test" v-for="(make, index) in makes" :key="index">
              {{ make.makeName }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <!-- model -->
      <div class="input__box">
        <p-select-wrapper filter="true" label="Model">
          <select v-model="msg.model" name="model" required>
            <option
              v-for="(model, index) in models"
              :key="index"
              :value="model.modelName"
            >
              {{ model.modelName }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <!-- trim -->
      <div class="input__box">
        <p-select-wrapper filter="true" label="Trim">
          <select v-model="msg.trim" name="trim" required>
            <option
              v-for="(vec, index) in vehicles"
              :key="index"
              :value="vec.trimName"
            >
              {{ vec.trimName }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <!-- color -->
      <div class="input__box">
        <p-select-wrapper filter="true" label="Vehicle Color">
          <select v-model="msg.color" name="Color" required>
            <option
              v-for="(item, index) in getColorsFromOptions"
              :key="index"
              :value="item.optionName"
            >
              {{ item.optionName }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Mileage">
          <input
            v-model="msg.mileage"
            type="number"
            name="some-name"
            placeholder="Please enter the current mileage"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Zip Code">
          <input
            v-model="msg.zipCode"
            type="number"
            maxlenght="5"
            name="Zip Code"
            placeholder="Please enter your zip code"
          />
        </p-text-field-wrapper>
      </div>
    </section>
    <div class="button">
      <p-button
        class="buttonn"
        :disabled="buttonEnabledChecker"
        variant="primary"
        hide-label="{s: false }"
        >Next</p-button
      >
    </div>
  </form>
  <button @click="checkState">chect state</button>
</template>
<script>
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../../core/tradeInApi';

export default defineComponent({
  // type inference enabled
  props: ['setOptions','setVehicleId'],
  components: {},
  data() {
    return {
      msg: this.data,
      allOptions: [],
      isButtonDisabled: true,
      models: [],
      makes: [],
      vehicles: [],
      colors: [],
      years: '',

      // get query parameters for api calls
      year: '',
      makeId: '',
      modelId: '',
      vehicleId: '',
    };
  },

  methods: {
    async getVehicleModel() {
      const res = await tradeInApi.getVehicleModelOptions(
        this.year,
        this.makeId
      );
      const _models = await res.json();
      this.models = _models.models;
      // console.log(this.models);
    },

    async getVehicleMake() {
      const res = await tradeInApi.getVehicleMakeOptions(this.year);
      const _make = await res.json();
      this.makes = _make.makes;
    },

    async getVehicles() {
      const res = await tradeInApi.getVehicles(
        this.year,
        this.makeId,
        this.modelId
      );
      const _vec = await res.json();
      this.vehicles = _vec.vehicles;
      // console.log(_vec);
    },

    async getOptions() {
      const res = await tradeInApi.getVehicleOptions(this.vehicleId);
      const options = await res.json();
      this.allOptions = options.options;
      this.setOptions(options.options);
      console.log(options);
    },

    async getYears() {
      const res = await tradeInApi.getYears();
      const yearsJson = await res.json();
      this.years = yearsJson.years;
      // this.options = options.options;
    },

    checkState() {
      console.log(this.msg);
      console.log(this.options);
    },

    moveTonextStage() {
      this.increamentStep();
    },

    test() {
      console.log('i was clicked');
    },
  },
  watch: {
    'msg.year'(newValue) {
      this.getVehicleMake(newValue);
      this.year = newValue;
    },
    // get make ID and and fetch models
    'msg.make'(newValue) {
      console.log(newValue);
      for (let i = 0; i < this.makes.length; i++) {
        if (newValue === this.makes[i].makeName) {
          this.makeId = this.makes[i].makeId;
        }
      }

      this.getVehicleModel();
    },
    // get model ID and fetch vehicles
    'msg.model'(newValue) {
      for (let i = 0; i < this.models.length; i++) {
        if (newValue === this.models[i].modelName) {
          this.modelId = this.models[i].modelId;
        }
      }

      this.getVehicles();
    },
    // get model ID and fetch vehicles
    'msg.trim'(newValue) {
      for (let i = 0; i < this.vehicles.length; i++) {
        if (newValue === this.vehicles[i].trimName) {
          this.vehicleId = this.vehicles[i].vehicleId;
          // capture vehicle id on parent component
          this.setVehicleId(this.vehicles[i].vehicleId)
          console.log(this.vehicles[i].vehicleId);
        }
      }

      this.getOptions();
    },
  },
  computed: {
    buttonEnabledChecker() {
      if (
        this.msg.year === '' ||
        this.msg.make === '' ||
        this.msg.model === '' ||
        this.msg.trim === '' ||
        this.msg.color === '' ||
        this.msg.model === '' ||
        this.msg.zipCode === '' ||
        this.msg.mileage === ''
      ) {
        return true;
      }
    },
    getColorsFromOptions() {
      let colors = [];
      for (let i = 0; i < this.allOptions.length; i++) {
        if (this.allOptions[i].optionType === 'Color') {
          colors.push(this.allOptions[i]);
        }
      }

      return colors;
    },
  },
  inject: ['step', 'data', 'increamentStep'],

  mounted() {
    this.getYears();
  },
});
</script>
<style scoped lang="scss" src="./StepOne.scss"></style>
