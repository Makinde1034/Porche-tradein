<script>
import { computed } from 'vue';
import { useBootstrapper } from '/@/composables';
import { emissionRanges } from './consts';

const props = {
  efficiencyClass: {
    type: Array,
    default: [],
  }
};

export default {
  name: 'DwaasEmissionClassLabel',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const efficiencyClassValue = computed(() => {
      return props.efficiencyClass.find((eClass) => eClass.value) || {};
    });

    return { el, emissionRanges, efficiencyClassValue };
  },
};
</script>

<template>
  <div ref="el" class="emission-class">
    <div v-for="range of emissionRanges" :key="range.class" class="emission-class__arrow" :class="[
      `emission-class__arrow--${range.class}`,
      efficiencyClassValue.label === range.class
        ? 'emission-class__arrow--active'
        : '',
    ]">
      <p-text class="emission-class__label" size="inherit" weight="semibold" theme="dark">
        {{ range.class }}
      </p-text>
      <p-text weight="bold" theme="dark" class="emission-class__emission" v-html="
        efficiencyClassValue.label === range.class
          ? efficiencyClassValue.value
          : ''
      ">
      </p-text>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasEmissionClassLabel.scss">
</style>
