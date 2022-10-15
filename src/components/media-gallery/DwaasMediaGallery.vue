<script>
import { ref, onMounted, reactive, onBeforeUnmount, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import { useBootstrapper, useSwiper } from '/@/composables';

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
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import {
  MEDIA_GALLERY_SOURCES,
  MODULE_PREFIX,
  AnalyticsEvents,
} from './consts';

const components = {
  Swiper,
  SwiperSlide,
};

const props = {
  headline: {
    type: String,
    default: '',
  },
  mediaImages: {
    type: Array,
    default: [],
  },
};

export default {
  name: 'DwaasMediaGallery',
  components,
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const uid = uuid();

    const navigationElements = {
      next: `#model-gallery-${uid} .media-gallery__arrow-right`,
      prev: `#model-gallery-${uid} .media-gallery__arrow-left`,
    };

    const isFullScreenViewOpen = ref(false);
    function toggleFullScreenView() {
      isFullScreenViewOpen.value = !isFullScreenViewOpen.value;
      const body = document.getElementsByTagName('body')[0];
      body.classList.toggle('disable-scroll');
    }
    const clickedImageIndex = ref(0);
    function handleImageClick(index) {
      clickedImageIndex.value = index;
      toggleFullScreenView();
    }

    const {
      navigationOptions,
      updateSwiperState,
      showPrevButton,
      showNextButton,
    } = useSwiper(navigationElements, true);

    function onSwiper(swiper) {
      nextTick(() => updateSwiperState(swiper));

      swiper.on('click', function (swiper, event) {
        if (event.target.dataset?.index) {
          const imageIndex = parseInt(event.target.dataset.index);
          handleImageClick(imageIndex);
        }
      });
    }

    const imageSlides = reactive([]);
    function firstSideImages(slides) {
      return slides.filter((slide, index) => index < 3);
    }
    function secondSideImages(slides) {
      return slides.filter((slide, index) => index > 2);
    }
    onMounted(() => {
      const finalSlideList = [];
      const partialSlideList = ref([]);
      props.mediaImages.forEach((image, index) => {
        partialSlideList.value.push(image);
        if (
          partialSlideList.value.length === 6 ||
          props.mediaImages.length - 1 === index
        ) {
          finalSlideList.push(partialSlideList.value);
          partialSlideList.value = [];
        }
      });
      Object.assign(imageSlides, finalSlideList);

      el.value.addEventListener('keydown', (event) => {
        event.keyCode == 27 && isFullScreenViewOpen.value
          ? toggleFullScreenView()
          : null;
      });
    });

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.MEDIA_GALLERY_LOAD, null, MODULE_PREFIX);
    });

    onBeforeUnmount(() => {
      el.value.removeEventListener('keydown');
    });
    return {
      el,
      uid,
      isFullScreenViewOpen,
      clickedImageIndex,
      toggleFullScreenView,
      handleImageClick,
      onSwiper,
      updateSwiperState,
      navigationOptions,
      showPrevButton,
      showNextButton,
      imageSlides,
      secondSideImages,
      firstSideImages,
      MEDIA_GALLERY_SOURCES,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>

<template>
  <div
    :id="`model-gallery-${uid}`"
    ref="el"
    class="media-gallery"
    @close-fullscreen="toggleFullScreenView"
  >
    <div class="media-gallery__headline">
      <p-headline variant="headline-2">
        <slot name="headline"></slot>
      </p-headline>
    </div>
    <div class="media-gallery__carousel">
      <div class="media-gallery__navigation">
        <div
          v-show="showPrevButton"
          class="media-gallery__arrow media-gallery__arrow-left"
        >
          <p-button-pure
            hide-label="true"
            theme="dark"
            tabbable="false"
            tabindex="-1"
            size="large"
            icon="arrow-head-left"
            aria-hidden="true"
          />
        </div>

        <div
          v-show="showNextButton"
          class="media-gallery__arrow media-gallery__arrow-right"
        >
          <p-button-pure
            hide-label="true"
            theme="dark"
            tabbable="false"
            tabindex="-1"
            size="large"
            icon="arrow-head-right"
            aria-hidden="true"
          />
        </div>
      </div>

      <swiper
        :slides-per-view="1"
        :modules="modules"
        :keyboard="{
          enabled: true,
          onlyInViewport: false,
        }"
        :navigation="navigationOptions"
        :pagination="{
          clickable: true,
          bulletElement: 'button',
          el: `#model-gallery-${uid} .media-gallery__pagination`,
        }"
        :prevent-clicks-propagation="false"
        watch-slides-progress
        @swiper="onSwiper"
        @slide-change="updateSwiperState"
        @resize="updateSwiperState"
      >
        <swiper-slide
          v-for="(slide, slideIndex) in imageSlides"
          :key="slideIndex"
          :slide="slide"
        >
          <div class="media-gallery-slide">
            <div class="media-gallery-slide__item">
              <dwaas-media-image
                v-for="(image, index) in firstSideImages(slide)"
                :key="index"
                aspect-ratio="16/9"
                :sources="MEDIA_GALLERY_SOURCES"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
                :index="slideIndex ? slideIndex * 6 + (index + 1) : index + 1"
                custom-class="clickable"
              ></dwaas-media-image>
            </div>
            <div
              class="media-gallery-slide__item"
              :data-slideIndex="slideIndex"
            >
              <dwaas-media-image
                v-for="(image, index) in secondSideImages(slide)"
                :key="index"
                aspect-ratio="16/9"
                :sources="MEDIA_GALLERY_SOURCES"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
                :index="slideIndex ? slideIndex * 6 + (index + 4) : index + 4"
                custom-class="clickable"
              >
              </dwaas-media-image>
            </div>
          </div>
        </swiper-slide>
        ...
      </swiper>
    </div>
    <div class="media-gallery__pagination"></div>
    <dwaas-media-gallery-full-screen-slider
      :media-images="mediaImages"
      :is-full-screen-view-open="isFullScreenViewOpen"
      :clicked-image-index="clickedImageIndex"
      @toggle-full-screen-view="toggleFullScreenView"
    ></dwaas-media-gallery-full-screen-slider>
  </div>
</template>

<style lang="scss" src="./DwaasMediaGallery.scss"></style>
