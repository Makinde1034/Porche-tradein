<template lang="">
  <div v-if="activeStep === 0">
    <StepOne
      :setVehicleData="setVehicleData"
      :incStep="incStep"
      :setOptions="setOptions"
    />
  </div>
  <div v-if="activeStep === 1">
    <StepTwo
      :setPriceAdvisoryUrl="setPriceAdvisoryUrl"
      :incStep="incStep"
      :options="options"
      :vehicleData="vehicleData"
    />
  </div>
  <div v-if="activeStep === 2">
    <VehicleValue :incStep="incStep" :priceAdvisoryUrl="priceAdvisoryUrl" />
  </div>
  <div v-if="activeStep === 3">
    <ContactPage :vehicleData="vehicleData" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import StepOne from './step-one/StepOne.story.vue';
import StepTwo from './step-two/StepTwo.story.vue';
import VehicleValue from '../vehicle-value/VihicleValue/VehicleValue.story.vue';
import ContactPage from './contact-page/ContactPage.story.vue';

export default defineComponent({
  props: ['setParentActiveStep', 'hideOptionsIcon'],
  components: { StepOne, StepTwo, VehicleValue, ContactPage },
  data() {
    return {
      activeStep: 0,
      vehicleData: null,
      options: [],
      priceAdvisoryUrl: '',
    };
  },
  methods: {
    incStep() {
      this.activeStep++;
      this.setParentActiveStep();
      this.hideOptionsIcon();
    },
    setVehicleData(data: any) {
      this.vehicleData = data;
    },
    setOptions(options: []) {
      this.options = options;
    },
    setPriceAdvisoryUrl(url: string) {
      this.priceAdvisoryUrl = url;
    },
  },
  inject: [],
});
</script>
<style scoped lang="scss" src="./ValueByVin.scss"></style>
