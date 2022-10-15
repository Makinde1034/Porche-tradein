<script>
import { onMounted } from 'vue';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useBootstrapper, useBreakpoints } from '/@/composables';

import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  tiles: {
    type: Array,
    default: () => [],
  },
};

const components = {
  Swiper,
  SwiperSlide,
};

export default {
  name: 'DwaasImageGrid',
  components,
  props,
  setup() {
    const { el } = useBootstrapper();

    const { breakpointSizes, isDesktop } = useBreakpoints();
    const { xs, sm } = breakpointSizes;

    const breakpoints = {
      [xs]: {
        slidesPerView: 1.01,
        spaceBetween: 16,
      },
      [sm]: {
        slidesPerView: 2.01,
        spaceBetween: 16,
      },
    };

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.OFFER_TEASER_LOAD, null, MODULE_PREFIX);
    });

    return {
      el,
      breakpoints,
      isDesktop,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>
<template>
  <p-content-wrapper width="basic">
    <div ref="el" class="image-grid">
      <swiper
        v-if="!isDesktop"
        ref="carousel"
        class="image-grid__carousel"
        :modules="modules"
        :keyboard="{
          enabled: true,
          onlyInViewport: false,
        }"
        :breakpoints="breakpoints"
        :space-between="15"
        :pagination="{ clickable: true }"
      >
        <swiper-slide
          v-for="(
            { title, image, mobileImage, description, ctaButton }, index
          ) in tiles"
          :key="index"
        >
          <dwaas-image-grid-tile
            :title="title"
            :image="image"
            :mobile-image="mobileImage"
            :description="description"
            :cta-button="ctaButton"
          />
        </swiper-slide>
      </swiper>

      <p-grid v-else class="image-grid__grid">
        <p-grid-item
          v-for="(
            { title, image, mobileImage, description, ctaButton }, index
          ) in tiles"
          :key="index"
          :size="4"
        >
          <dwaas-image-grid-tile
            :title="title"
            :image="image"
            :mobile-image="mobileImage"
            :description="description"
            :cta-button="ctaButton"
          />
        </p-grid-item>
      </p-grid>
    </div>
  </p-content-wrapper>
</template>

<style lang="scss" src="./DwaasImageGrid.scss"></style>
