<template lang="">
  <form class="wrapper">
    <section class="input__wrap">
      <div class="input__box">
        <p-text-field-wrapper label="Enter your VIN">
          <input
            v-model="vehicleData.vin"
            type="text"
            name="some-name"
            placeholder="Please enter your VIN number"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Trim">
          <select v-model="vehicleData.trim" name="trim" required>
            <option
              v-for="(vehicle, index) in vinVehicles"
              :key="index"
              :value="vehicle.modelPlusTrimName"
            >
              {{ vehicle.modelPlusTrimName }}
            </option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Color">
          <select v-model="vehicleData.color" name="Color" required>
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
            v-model="vehicleData.mileage"
            type="text"
            name="some-name"
            placeholder="Please enter the current milage"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper maxlength="5" label="Zip Code">
          <input
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            v-model="vehicleData.zipCode"
            type="number"
            maxlength="5"
            name="Zip Code"
            placeholder="Please enter your zip code"
          />
        </p-text-field-wrapper>
      </div>
    </section>
    <div class="button">
      <p-button
        @click="moveToNextStep"
        :disabled="buttonEnabledChecker"
        class="button__button"
        variant="primary"
        hide-label="{s: false }"
        >Next</p-button
      >
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../../core/tradeInApi';

export default defineComponent({
  props: ['incStep', 'setVehicleData', 'setOptions'],
  components: {},
  data() {
    return {
      vehicleData: {
        vin: '',
        mileage: '',
        zipCode: '',
        trim: '',
        color: '',
        vehicleId: '',
      },
      vinVehicles: [],
      options: [],
    };
  },
  methods: {
    moveToNextStep() {
      this.setVehicleData(this.vehicleData);
      this.incStep();
    },
    async getVin(vin: string) {
      try {
        const res = await tradeInApi.getVin(vin);
        const resJson = await res.json();
        this.vinVehicles = resJson.vehicles;
        console.log(resJson);
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    'vehicleData.vin'(newValue) {
      this.getVin(newValue);
    },
    'vehicleData.trim'(newValue) {
      console.log(newValue);

      for (let i = 0; i < this.vinVehicles.length; i++) {
        if (this.vinVehicles[i].modelPlusTrimName === newValue) {
          this.options = this.vinVehicles[i].vehicleOptions;
          this.setOptions(this.vinVehicles[i].vehicleOptions);
          this.vehicleData.vehicleId = this.vinVehicles[i].vehicleId;
        }
      }

      console.log(this.options, 'dsds');
    },
  },
  computed: {
    buttonEnabledChecker() {
      if (
        this.vehicleData.vin === '' ||
        this.vehicleData.mileage === '' ||
        this.vehicleData.zipCode === ''
      ) {
        return true;
      }
    },
    getColorsFromOptions() {
      let colors: Array<string> = [];
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].optionType === 'Color') {
          colors.push(this.options[i]);
        }
      }

      return colors;
    },
  },
});
</script>
<style scoped lang="scss" src="./StepOne.scss"></style>
