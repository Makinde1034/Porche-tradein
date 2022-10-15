<script>
import { TEXT_MEDIA_IMAGES_SOURCES } from './consts';

const props = {
  gridDirection: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  imageWidth: Number,
  imageHeight: Number,
};
export default {
  name: 'DwaasTextMediaItem',
  props,
  setup() {
    return {
      TEXT_MEDIA_IMAGES_SOURCES,
    };
  },
};
</script>
<template>
  <p-content-wrapper class="text-media__container" width="basic">
    <p-grid class="text-media__grid">
      <p-grid-item
        size="{base: 12, m: 6}"
        :class="`text-media__text-container text-media__text-container--${gridDirection}`"
      >
        <div :class="`text-media__text text-media__text--${gridDirection}`">
          <p-text
            class="text-media__subheadline"
            weight="semibold"
            tag="h3"
            size="inherit"
          >
            <slot name="headline" />
          </p-text>
          <p-text size="small">
            <slot name="text" />
          </p-text>
        </div>
      </p-grid-item>
      <p-grid-item
        size="{base: 12, m: 6}"
        :class="`text-media__image-container text-media__image-container--${gridDirection}`"
      >
        <dwaas-media-image
          v-bind="$attrs"
          class="text-media__image"
          :src="imageUrl"
          :alt="imageAlt"
          :width="imageWidth"
          :height="imageHeight"
          :sources="TEXT_MEDIA_IMAGES_SOURCES"
          :full-width-on-max="true"
        />
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>

<style lang="scss" src="./DwaasTextMedia.scss"></style>
