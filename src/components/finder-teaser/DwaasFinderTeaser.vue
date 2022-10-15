<script>
import { useBootstrapper } from '/@/composables';

export default {
  name: 'DwaasFinderTeaser',
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>

<template>
  <p-content-wrapper ref="el" width="basic" class="finder-teaser__wrapper">
    <p-headline class="finder-teaser__headline" variant="headline-2">
      <slot name="headline"></slot>
    </p-headline>
    <div class="finder-teaser">
      <p-grid direction="{ base: 'column', m: 'row' }">
        <slot name="tiles"></slot>
      </p-grid>
    </div>
  </p-content-wrapper>
</template>
<style lang="scss" src="./DwaasFinderTeaser.scss"></style>
