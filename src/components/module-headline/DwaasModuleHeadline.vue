<script>
import { computed } from 'vue';
import { useBootstrapper } from '/@/composables';

const props = {
  block: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'light',
  },
};

export default {
  name: 'DwaasModuleHeadline',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const classes = computed(() => [props.block, 'headline-container']);

    return {
      el,
      classes,
    };
  },
};
</script>
<template>
  <div ref="el" :class="classes">
    <p-content-wrapper width="basic" class="hydrated">
      <p-headline
        :class="`${block}__headline`"
        :theme="theme"
        variant="headline-2"
      >
        <slot />
      </p-headline>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasModuleHeadline.scss"></style>
