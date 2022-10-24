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
        <p-text-field-wrapper label="Zip Code">
          <input
            v-model="vehicleData.zipCode"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            type="number"
            name="zip code"
            maxlength="5"
            placeholder="Pelase enter the your zip code"
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
<script>
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../../core/tradeInApi';

export default defineComponent({
  props: ['incStep'],
  components: {},
  data() {
    return {
      vehicleData: {
        vin: '',
        mileage: '',
        zipCode: '',
      },
    };
  },
  methods: {
    moveToNextStep() {
      this.incStep();
    },
    async getVin(vin) {
      try {
        const res = await tradeInApi.getVin(vin);
        const resJson = await res.json();
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
  },
});
</script>
<style scoped lang="scss" src="./StepOne.scss"></style>
