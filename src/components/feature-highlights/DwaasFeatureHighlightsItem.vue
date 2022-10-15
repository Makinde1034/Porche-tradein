<script>
import { useDebounceFn } from '@vueuse/core';

const CLICK_DEBOUNCE = 400;

const props = {
  itemIndex: {
    type: Number,
    default: -1,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  imageMobileUrl: {
    type: String,
    default: '',
  },
  imageAlt: {
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
  isMobileView: {
    type: Boolean,
    default: false,
  },
};

export default {
  name: 'DwaasFeatureHighlightsItem',
  props,
  emits: ['tile-click'],
  setup(props, { emit }) {
    function handleTileClick() {
      useDebounceFn(emitTileClick(), CLICK_DEBOUNCE);
    }

    function handleTileFocus() {
      !props.isMobileView ? useDebounceFn(emitTileClick(), CLICK_DEBOUNCE) : '';
    }

    function emitTileClick() {
      return props.isActive && props.isMobileView
        ? emit('tile-click', -1)
        : emit('tile-click', props.itemIndex);
    }

    return {
      handleTileClick,
      handleTileFocus,
      emitTileClick,
    };
  },
};
</script>
<template>
  <component
    :is="isMobileView ? 'div' : 'button'"
    :data-index="itemIndex"
    class="feature-highlights__card"
    :class="{ 'feature-highlights__card--active': isActive }"
    :aria-expanded="isActive"
    @click="handleTileClick"
    @focus="handleTileFocus"
  >
    <button
      v-if="isMobileView"
      class="feature-highlights__button"
      tabindex="0"
      :aria-expanded="isActive"
      @click.stop="handleTileClick"
    >
      <p-flex direction="row" justify-content="space-between">
        <p-headline
          class="feature-highlights__mobile-title"
          variant="inherit"
          tag="h3"
        >
          <slot :name="`heading${itemIndex}`" />
        </p-headline>
        <p-icon
          :name="isActive ? 'arrowHeadUp' : 'arrowHeadDown'"
          aria-hidden="true"
        ></p-icon>
      </p-flex>
      <p-divider color="neutral-contrast-high"></p-divider>
    </button>
    <div class="feature-highlights__item">
      <picture class="feature-highlights__mobile-image">
        <source
          media="(max-width: 480px)"
          :data-srcset="`${imageMobileUrl ? imageMobileUrl : imageUrl}&w=480`"
        />
        <source
          media="(max-width: 759px)"
          :data-srcset="`${imageMobileUrl ? imageMobileUrl : imageUrl}&w=759`"
        />
        <source media="(max-width: 999px)" :data-srcset="`${imageUrl}&w=999`" />
        <img
          class="lazyload"
          :data-src="imageUrl"
          :alt="imageAlt"
          :src="`
            data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'
            viewBox=\'0 0 ${imageWidth} ${imageHeight}'%3E%3C/svg%3E
          `"
        />
      </picture>
      <div class="feature-highlights__text">
        <div class="feature-highlights__desktop-title">
          <p-button-pure size="medium" weight="semibold" tabindex="-1">
            <span class="feature-highlights__desktop-title-wrapper">
              <slot :name="`heading${itemIndex}`" />
            </span>
          </p-button-pure>
        </div>
        <p-text class="feature-highlights__text">
          <slot :name="`description${itemIndex}`" />
        </p-text>
      </div>
    </div>
  </component>
</template>
