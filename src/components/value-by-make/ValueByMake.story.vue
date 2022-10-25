<template lang="">
  <div v-if="activeStep === 0">
    <StepOne :setVehicleId="setVehicleId" :setOptions="setOptions" />
  </div>
  <div v-if="activeStep === 1">
    <StepTwo
      :setPriceAdvisoryUrl="setPriceAdvisoryUrl"
      :vehicleId="vehicleId"
      :testOptions="options"
    />
  </div>
  <div v-if="activeStep === 2">
    <VehicleValue :incStep="incStep" :priceAdvisoryUrl="priceAdvisoryUrl" />
  </div>
  <div v-if="activeStep === 3">
    <ContactSection />
  </div>
  <div v-if="activeStep === 4">
    <ThankYou />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import StepOne from './step-one/StepOne.story.vue';
import StepTwo from './step-two/StepTwo.story.vue';
import VehicleValue from '../vehicle-value/VihicleValue/VehicleValue.story.vue';
import ContactSection from '../contact-section/ContactSection.story.vue';
import ThankYou from './thank-you/ThankYou.story.vue';

export default defineComponent({
  // type inference enabled

  components: { StepOne, StepTwo, VehicleValue, ContactSection, ThankYou },
  props: ['hideOptionsIcon', 'setParentActiveStep'],
  data() {
    return {
      activeStep: 0,
      vehicleData: {
        year: '',
        make: '',
        model: '',
        trim: '',
        color: '',
        mileage: '',
        zipCode: '',
      },
      options: [],
      vehicleId: '',
      priceAdvisoryUrl: '',
    };
  },

  methods: {
    incStep() {
      this.activeStep++;
      // set state in parent (tradeIn component)
      this.hideOptionsIcon();
      this.setParentActiveStep();
    },
    setOptions(data: []) {
      this.options = data;
    },
    setVehicleId(id: String) {
      this.vehicleId = id;
    },
    setPriceAdvisoryUrl(url: string) {
      this.priceAdvisoryUrl = url;
    },
  },

  // inject: ['step', 'data', 'increamentStep'],

  provide() {
    return {
      step: computed(() => this.activeStep),
      data: computed(() => this.vehicleData),
      options: computed(() => this.options),
      increamentStep: this.incStep,
    };
  },
});
</script>

<style scoped lang="scss" src="./ValueByMake.scss"></style>
