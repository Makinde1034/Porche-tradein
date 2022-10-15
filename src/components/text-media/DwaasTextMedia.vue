<script>
import { useBootstrapper } from '/@/composables';

export default {
  name: 'DwaasTextMedia',
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>
<template>
  <div ref="el" class="text-media">
    <slot name="content"></slot>
  </div>
</template>

<style lang="scss" src="./DwaasTextMedia.scss"></style>
