<script>
import { useBootstrapper } from '/@/composables';

export default {
  name: 'DwaasModelTypes',
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>
<template>
  <div ref="el" class="model-types">
    <div class="model-types__container">
      <p-headline
        class="model-types__headline"
        theme="dark"
        variant="headline-2"
      >
        <slot name="headline" />
      </p-headline>
      <div class="model-types__list">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasModelTypes.scss"></style>
