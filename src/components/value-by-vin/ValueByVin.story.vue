<template lang="">
  <div v-if="activeStep === 0">
    <StepOne :incStep="incStep" />
  </div>
  <div v-if="activeStep === 1">
    <StepTwo />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import StepOne from './step-one/StepOne.story.vue';
import StepTwo from './step-two/StepTwo.story.vue';

export default defineComponent({
  props: ['setParentActiveStep', 'hideOptionsIcon'],
  components: { StepOne, StepTwo },
  data() {
    return {
      activeStep: 0,
    };
  },
  methods: {
    incStep() {
      this.activeStep++;
      this.setParentActiveStep();
      this.hideOptionsIcon()
    },
  },
  inject: [],
});
</script>
<style scoped lang="scss" src="./ValueByVin.scss"></style>
