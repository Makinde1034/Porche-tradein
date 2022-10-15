<script>
import { onMounted, ref, onBeforeUnmount, computed } from 'vue';
import { useBootstrapper, useBreakpoints, useSwiper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX, CarouselTypes } from './consts';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';

const props = {
  variant: {
    type: String,
    default: CarouselTypes.DEFAULT,
  },
  slides: {
    type: Array,
    default: [],
  },
};
const components = {
  Swiper,
  SwiperSlide,
};

const navigationElements = {
  next: '.stage-header__button-next',
  prev: '.stage-header__button-prev',
};
export default {
  name: 'DwaasStageHeader',
  components,
  props,
  setup(props) {
    const { el } = useBootstrapper('DwaasStageHeader');
    const { breakpoints } = useBreakpoints();

    const inFocus = ref(false);

    const { controlledSwiper, navigationOptions, updateSwiperState } =
      useSwiper(navigationElements, false);

    const onSwiper = (swiper) => {
      updateSwiperState(swiper);
      props.slides.length > 1 ? swiper.autoplay.start({ delay: 6000 }) : '';

      swiper.on('touchMove', (swiper, event) => {
        event.preventDefault();
      });

      swiper.pagination.bullets.forEach((bullet) => {
        bullet.addEventListener('click', (event) => {
          event.isTrusted ? onBulletClick(event) : null;
        });
      });
    };

    const showSwiperNavigation = computed(() => {
      return props.slides.length > 1 && !breakpoints.smaller('lg').value;
    });

    function focusInSwiper() {
      inFocus.value = true;
      controlledSwiper.autoplay.stop();
    }

    function focusOutSwiper() {
      inFocus.value = false;
    }

    const isSM = breakpoints.smaller('sm');
    const aspectRatio = computed(() =>
      props.variant === CarouselTypes.DEFAULT
        ? isSM.value
          ? '8/9'
          : '12/5'
        : isSM.value
        ? '4/3'
        : '24/5'
    );

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onNavigationClick($event, direction) {
      pushGdlEvent(
        AnalyticsEvents[`STAGE_HEADER_${direction}_CLICK`],
        $event,
        MODULE_PREFIX
      );
    }

    function onBulletClick($event) {
      pushGdlEvent(
        AnalyticsEvents.STAGE_HEADER_INDICATOR_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    onMounted(() => {
      el.value.addEventListener('focusin', focusInSwiper);
      el.value.addEventListener('focusout', focusOutSwiper);

      pushGdlEvent(AnalyticsEvents.STAGE_HEADER_LOAD, null, MODULE_PREFIX);
    });

    onBeforeUnmount(() => {
      el.value.removeEventListener('focusin', focusInSwiper);
      el.value.removeEventListener('focusout', focusOutSwiper);
    });

    return {
      el,
      inFocus,
      showSwiperNavigation,
      navigationOptions,
      onSwiper,
      onNavigationClick,
      onBulletClick,
      aspectRatio,
      modules: [Navigation, Pagination, A11y, Autoplay],
    };
  },
};
</script>

<template>
  <div
    ref="el"
    class="stage-header"
    :class="[
      `stage-header--${variant}`,
      inFocus ? 'stage-header--focused' : '',
    ]"
  >
    <swiper
      :slides-per-view="1"
      :modules="modules"
      :keyboard="{
        enabled: true,
        onlyInViewport: false,
      }"
      :loop="slides.length > 1"
      :navigation="navigationOptions"
      :pagination="{
        clickable: true,
        bulletElement: 'button',
        el: '.stage-header__pagination',
      }"
      :prevent-clicks-propagation="false"
      watch-slides-progress
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="(slide, index) in slides"
        :key="'slide_' + index"
        v-slot="{ isVisible }"
        :slide="slide"
      >
        <dwaas-stage-header-slide
          :variant="variant"
          :is-first="slide['is-first']"
          :has-title="slide['has-title']"
          :href="slide.href"
          :target="slide.target"
          :image-url="slide['image-url']"
          :image-mobile-url="slide['image-mobile-url']"
          :image-alt="slide['image-alt']"
          :image-width="slide['image-width']"
          :image-height="slide['image-height']"
          :title="slide.title"
          :subtitle="slide.subtitle"
          :slide-count="slides.length"
          :is-visible="isVisible"
          :aspect-ratio="aspectRatio"
        ></dwaas-stage-header-slide>
      </swiper-slide>
      ...
    </swiper>

    <div
      v-show="showSwiperNavigation"
      class="stage-header__button stage-header__button-prev"
      @click="onNavigationClick($event, 'LEFT')"
      @keyup.enter="onNavigationClick($event, 'LEFT')"
    >
      <p-button-pure
        tabindex="-1"
        hide-label="true"
        theme="dark"
        tabbable="false"
        size="large"
        icon="arrow-head-left"
        aria-hidden="true"
      />
    </div>
    <div
      v-show="showSwiperNavigation"
      class="stage-header__button stage-header__button-next"
      @click="onNavigationClick($event, 'RIGHT')"
      @keyup.enter="onNavigationClick($event, 'RIGHT')"
    >
      <p-button-pure
        tabindex="-1"
        hide-label="true"
        theme="dark"
        tabbable="false"
        size="large"
        icon="arrow-head-right"
        aria-hidden="true"
      />
    </div>

    <div class="stage-header__pagination"></div>
  </div>
</template>

<style lang="scss" src="./DwaasStageHeader.scss"></style>
