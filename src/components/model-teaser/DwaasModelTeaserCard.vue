<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import { useSwiper } from '/@/composables';

import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import {
  AnalyticsEvents,
  MODULE_PREFIX,
  MODEL_TEASER_CARD_SOURCES,
} from './consts';

const uuid = () => {
  let d = new Date().getTime(),
    d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
};

const props = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  images: {
    type: Array,
    default: () => [],
  },
  buttons: {
    type: Array,
    default: () => [],
  },
  price: {
    type: String,
    default: '',
  },
};

const components = {
  Swiper,
  SwiperSlide,
};

export default {
  name: 'DwaasModelTeaserCard',
  components,
  props,
  setup() {
    const uid = uuid();

    const navigationElements = {
      next: `#model-teaser-card-${uid} .model-teaser-card__arrow-next`,
      prev: `#model-teaser-card-${uid} .model-teaser-card__arrow-prev`,
    };

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function handleCTAClick($event) {
      pushGdlEvent(
        AnalyticsEvents.MODEL_TEASER_CTA_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    const {
      navigationOptions,
      updateSwiperState,
      showPrevButton,
      showNextButton,
    } = useSwiper(navigationElements, false);

    return {
      uid,
      handleCTAClick,
      updateSwiperState,
      navigationOptions,
      showPrevButton,
      showNextButton,
      MODEL_TEASER_CARD_SOURCES,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>

<template>
  <article :id="`model-teaser-card-${uid}`" class="model-teaser-card">
    <div class="model-teaser-card__carousel-wrapper">
      <div
        v-show="showPrevButton"
        class="model-teaser-card__arrow model-teaser-card__arrow-prev"
      >
        <p-button-pure
          hide-label="true"
          theme="dark"
          tabbable="false"
          size="large"
          icon="arrow-head-left"
          aria-hidden="true"
        />
      </div>
      <div
        v-show="showNextButton"
        class="model-teaser-card__arrow model-teaser-card__arrow-next"
      >
        <p-button-pure
          hide-label="true"
          theme="dark"
          tabbable="false"
          size="large"
          icon="arrow-head-right"
          aria-hidden="true"
        />
      </div>
      <swiper
        ref="carousel"
        :slides-per-view="1"
        :modules="modules"
        :keyboard="{
          enabled: true,
          onlyInViewport: false,
        }"
        :navigation="navigationOptions"
        :pagination="{ clickable: true, bulletElement: 'button' }"
        :prevent-clicks-propagation="false"
        @swiper="updateSwiperState"
        @slide-change="updateSwiperState"
      >
        <swiper-slide
          v-for="(image, key) in images"
          :key="key"
          class="model-teaser-card__slide"
        >
          <dwaas-media-image
            class="model-teaser-card__slide-picture"
            :sources="MODEL_TEASER_CARD_SOURCES"
            aspect-ratio="16/9"
            :src="image.src"
            :alt="image.alt"
            :height="image.height"
            :width="image.width"
          />
          <div class="model-teaser-card__slide-overlay"></div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="model-teaser-card__content">
      <div class="model-teaser-card__title-wrapper">
        <p-headline class="model-teaser-card__title" variant="headline-3">
          {{ title }}
        </p-headline>
        <p-text
          size="{ base: 'x-small', m: 'small' }"
          class="model-teaser-card__price"
          >{{ price }}</p-text
        >
      </div>
      <div class="model-teaser-card__description-wrapper">
        <p-text size="{ base: 'small', xl: 'medium' }">
          {{ description }}
        </p-text>
      </div>
      <div class="model-teaser-card__button-wrapper">
        <p-link
          v-for="(button, key) in buttons"
          :key="key"
          :href="button.href"
          :target="button.target"
          class="model-teaser-card__button"
          variant="tertiary"
          @click="handleCTAClick"
        >
          {{ button.text }}
        </p-link>
      </div>
    </div>
  </article>
</template>
