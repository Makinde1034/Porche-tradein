<script>
import { watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, A11y } from 'swiper';
import { useSwiper } from '/@/composables';
import { MEDIA_GALLERY_FULLSCREEN_SOURCES } from './consts';

const components = {
  Swiper,
  SwiperSlide,
};
const props = {
  isFullScreenViewOpen: {
    type: Boolean,
    default: false,
  },
  mediaImages: {
    type: Array,
    default: [],
  },
  clickedImageIndex: {
    type: Number,
    default: 0,
  },
};
const navigationElements = {
  next: '.fullscreen__carousel-arrow-next',
  prev: '.fullscreen__carousel-arrow-prev',
};
export default {
  components,
  props,
  emits: ['toggleFullScreenView'],
  setup(props) {
    const { controlledSwiper, navigationOptions, updateSwiperState } =
      useSwiper(navigationElements, false);

    watch(
      () => props.clickedImageIndex,
      (currentIndex) => {
        controlledSwiper.el?.swiper.slideTo(currentIndex, 0);
      }
    );

    return {
      navigationOptions,
      updateSwiperState,
      MEDIA_GALLERY_FULLSCREEN_SOURCES,
      modules: [Navigation, A11y],
    };
  },
};
</script>

<template>
  <div
    class="fullscreen"
    :class="{ 'fullscreen--hidden': !isFullScreenViewOpen }"
  >
    <div class="fullscreen__carousel">
      <div
        aria-label="Previous page"
        class="fullscreen__carousel-arrow fullscreen__carousel-arrow-prev"
      >
        <p-button-pure
          hide-label="true"
          theme="dark"
          tabbable="false"
          size="inherit"
          icon="arrow-head-left"
          aria-hidden="true"
        ></p-button-pure>
      </div>
      <swiper
        :slides-per-view="1"
        :modules="modules"
        :keyboard="{
          enabled: true,
          onlyInViewport: false,
        }"
        :loop="true"
        :navigation="navigationOptions"
        :prevent-clicks-propagation="false"
        watch-slides-progress
        @swiper="updateSwiperState"
        @slide-change="updateSwiperState"
        @resize="updateSwiperState"
      >
        <swiper-slide v-for="(image, index) in mediaImages" :key="index">
          <div class="fullscreen__carousel-slide">
            <dwaas-media-image
              :key="index"
              :sources="MEDIA_GALLERY_FULLSCREEN_SOURCES"
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              object-fit="contain"
              custom-class="fullscreen__picture-container"
            ></dwaas-media-image>
          </div>
        </swiper-slide>
      </swiper>
      <div
        aria-label="Next page"
        class="fullscreen__carousel-arrow fullscreen__carousel-arrow-next"
      >
        <p-button-pure
          hide-label="true"
          theme="dark"
          tabbable="false"
          size="inherit"
          icon="arrow-head-right"
          aria-hidden="true"
        />
      </div>
    </div>
    <div
      class="fullscreen__close-button"
      @click="$emit('toggleFullScreenView')"
    >
      <p-button-pure
        icon="close"
        size="inherit"
        hide-label="true"
        theme="dark"
      ></p-button-pure>
    </div>
  </div>
</template>
