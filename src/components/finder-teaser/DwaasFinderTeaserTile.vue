<script>
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import {
  AnalyticsEvents,
  MODULE_PREFIX,
  SIMPLE_IMAGES_SOURCES,
} from './consts';

const props = {
  image: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  imageWidth: {
    type: String,
    default: '',
  },
  imageHeight: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
};

export default {
  name: 'DwaasFinderTeaserTile',
  props,
  setup() {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function handleTileClick($event) {
      pushGdlEvent(AnalyticsEvents.FINDER_TEASER_CLICK, $event, MODULE_PREFIX);
    }

    return {
      SIMPLE_IMAGES_SOURCES,
      handleTileClick,
    };
  },
};
</script>
<template>
  <p-grid-item class="finder-teaser__card" size="{ base: 12, m: 6 }">
    <a
      class="finder-teaser__image-wrapper"
      :href="href"
      :target="target"
      @click="handleTileClick"
    >
      <dwaas-media-image
        v-bind="$attrs"
        class="finder-teaser__image"
        :sources="SIMPLE_IMAGES_SOURCES"
        :full-width-on-max="false"
        :alt="alt"
      />
      <div class="finder-teaser__image-overlay" />
      <p-link-pure
        v-if="link"
        class="finder-teaser__button"
        theme="dark"
        size="{ base: 'small', m: 'medium' }"
      >
        {{ link }}
      </p-link-pure>
    </a>
  </p-grid-item>
</template>
