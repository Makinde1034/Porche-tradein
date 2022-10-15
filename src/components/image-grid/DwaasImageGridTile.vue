<script>
import { computed } from '@vue/reactivity';
import { useBootstrapper } from '/@/composables';

import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';
import { isEmpty } from '/@/shared/utils';

const props = {
  title: String,
  description: String,
  image: {
    type: Object,
    default: () => ({}),
  },
  mobileImage: {
    type: Object,
    default: () => ({}),
  },
  ctaButton: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'DwaasImageGridTile',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const hasCTA = computed(() => {
      return !isEmpty(props.ctaButton);
    });

    const sources = computed(() => [
      { width: 640, breakpoint: 760, image: props.mobileImage.src },
      { width: 500, breakpoint: 999, image: props.mobileImage.src },
      { width: 430, breakpoint: 1300 },
      {
        width: 590,
        breakpoint: 1760,
      },
      {
        width: 640,
        breakpoint: 1920,
      },
    ]);

    // Feature : analytics
    const { pushGdlEvent } = useGDL();

    function handleTileClick($event) {
      pushGdlEvent(
        AnalyticsEvents.OFFER_TEASER_LINK_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    return {
      el,
      hasCTA,
      sources,
      handleTileClick,
    };
  },
};
</script>
<template>
  <component
    :is="hasCTA ? 'a' : 'div'"
    ref="el"
    class="image-grid-tile"
    :href="hasCTA ? ctaButton.url : undefined"
    :target="hasCTA ? ctaButton.target : undefined"
    @click="handleTileClick"
  >
    <dwaas-media-image
      v-if="image"
      class="image-grid-tile__img"
      :src="image.src"
      :alt="image.alt"
      :aspect-ratio="'4/3'"
      :full-width-on-max="true"
      :sources="sources"
    />
    <div v-if="description || title" class="image-grid-tile__content">
      <p-text
        v-if="title"
        class="image-grid-tile__title"
        size="medium"
        tag="h3"
      >
        {{ title }}
      </p-text>
      <p-text
        v-if="description"
        class="image-grid-tile__description"
        size="small"
      >
        {{ description }}
      </p-text>
      <footer v-if="hasCTA">
        <p-button class="image-grid-tile__button" variant="tertiary">
          {{ ctaButton.label }}
        </p-button>
      </footer>
    </div>
  </component>
</template>

<style lang="scss" src="./DwaasImageGrid.scss"></style>
