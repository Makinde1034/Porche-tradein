<script>
import { useBootstrapper } from '/@/composables';
import { SIMPLE_IMAGES_SOURCES } from './consts';

export default {
  name: 'DwaasSingleImage',
  setup() {
    const { el } = useBootstrapper();
    return {
      el,
      SIMPLE_IMAGES_SOURCES,
      /*     imgSrc, */
    };
  },
};
</script>
<template>
  <div ref="el" class="single-image">
    <p-content-wrapper width="basic">
      <dwaas-media-image
        aspect-ratio="16/9"
        v-bind="$attrs"
        :sources="SIMPLE_IMAGES_SOURCES"
        :full-width-on-max="true"
      />
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasSingleImage.scss"></style>
