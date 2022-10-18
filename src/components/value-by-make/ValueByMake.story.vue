<template lang="">
  <div v-if="activeStep === 0">
    <StepOne />
  </div>
  <div v-if="activeStep === 1">
    <StepTwo />
  </div>
  <div v-if="activeStep === 2">
    <VehicleValue />
  </div>
  <div v-if="activeStep === 3">
    <ContactSection />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import StepOne from './step-one/StepOne.story.vue';
import StepTwo from './step-two/StepTwo.story.vue';
import VehicleValue from '../vehicle-value/VihicleValue/VehicleValue.story.vue';
import ContactSection from '../contact-section/ContactSection.story.vue';

export default defineComponent({
  // type inference enabled

  components: { StepOne, StepTwo, VehicleValue, ContactSection },
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
    };
  },
  methods: {
    incStep() {
      this.activeStep++;
      // set state in parent (tradeIn component)
      this.hideOptionsIcon();
      this.setParentActiveStep();
    },
  },
  inject: ['step', 'data', 'increamentStep'],
  provide() {
    return {
      step: computed(() => this.activeStep),
      data: computed(() => this.vehicleData),
      increamentStep: this.incStep,
    };
  },
});
</script>
<style scoped lang="scss" src="./ValueByMake.scss"></style>
