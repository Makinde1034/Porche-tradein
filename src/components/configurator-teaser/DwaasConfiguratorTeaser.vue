<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { useBootstrapper, useBreakpoints, useSwiper } from '/@/composables';
import {
  AnalyticsEvents,
  MODULE_PREFIX,
  CONFIGURATOR_TEASER_SOURCES,
} from './consts';
import DwaasMediaImage from '/@/components/media-image/DwaasMediaImage.vue';

const props = {
  headline: {
    type: String,
    default: '',
  },
  models: {
    type: Array,
    default: [],
  },
};

const components = {
  Swiper,
  SwiperSlide,
  DwaasMediaImage,
};

const navigationElements = {
  next: '.configurator-teaser__arrow-right',
  prev: '.configurator-teaser__arrow-left',
};

export default {
  name: 'DwaasConfiguratorTeaser',
  components,
  props,
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const {
      pushGdlEvent,
      pushCustomGdlEvent,
      componentClickEvent,
      componentNavigationEvent,
    } = useGDL();

    function onTeaserLeftClick($event) {
      pushGdlEvent(
        AnalyticsEvents.CONFIGURATOR_TEASER_LEFT_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onTeaserRightClick($event) {
      pushGdlEvent(
        AnalyticsEvents.CONFIGURATOR_TEASER_RIGHT_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onTeaserCardClick($event, textContent) {
      const options = {
        componentPrefix: MODULE_PREFIX,
        clickElementName: textContent,
        itemName: textContent,
      };
      const data = {
        componentClick: componentClickEvent($event, options),
        componentNavigation: componentNavigationEvent($event, options),
      };
      pushCustomGdlEvent(AnalyticsEvents.CONFIGURATOR_TEASER_CARD_CLICK, data);
    }

    const { breakpointSizes } = useBreakpoints();
    const { xs, sm, md } = breakpointSizes;
    const breakpoints = {
      [xs]: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      [sm]: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      [md]: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    };

    const {
      navigationOptions,
      updateSwiperState,
      showPrevButton,
      showNextButton,
    } = useSwiper(navigationElements, false);

    const sources = CONFIGURATOR_TEASER_SOURCES;

    return {
      el,
      onTeaserLeftClick,
      onTeaserRightClick,
      onTeaserCardClick,
      navigationOptions,
      breakpoints,
      updateSwiperState,
      showNextButton,
      showPrevButton,
      sources,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>

<template>
  <div ref="el" class="configurator-teaser">
    <p-content-wrapper width="basic">
      <div class="configurator-teaser__headline-container">
        <p-headline variant="headline-2" align="left">
          {{ headline }}
        </p-headline>
      </div>
    </p-content-wrapper>
    <div class="configurator-teaser__content-wrapper">
      <div class="configurator-teaser__carousel">
        <div
          v-show="showPrevButton"
          class="configurator-teaser__arrow configurator-teaser__arrow-left"
          @keyup.enter="onTeaserLeftClick"
          @click="onTeaserLeftClick"
        >
          <p-button-pure
            hide-label="true"
            size="large"
            icon="arrow-head-left"
            tabbable="false"
            aria-hidden="true"
          />
        </div>
        <div
          v-show="showNextButton"
          class="configurator-teaser__arrow configurator-teaser__arrow-right"
          @keyup.enter="onTeaserRightClick"
          @click="onTeaserRightClick"
        >
          <p-button-pure
            hide-label="true"
            size="large"
            tabbable="false"
            aria-hidden="true"
          />
        </div>
        <swiper
          :modules="modules"
          :keyboard="{
            enabled: true,
            onlyInViewport: false,
          }"
          :breakpoints="breakpoints"
          :space-between="20"
          :navigation="navigationOptions"
          :pagination="{ clickable: true, bulletElement: 'button' }"
          :prevent-clicks-propagation="false"
          watch-slides-progress
          @swiper="updateSwiperState"
          @slide-change="updateSwiperState"
          @resize="updateSwiperState"
        >
          <swiper-slide
            v-for="(model, key) in models"
            v-slot="{ isActive, isVisible }"
            :key="key"
            :slide="model"
          >
            <div
              class="configurator-teaser__slide"
              role="tabpanel"
              :aria-hidden="!isActive"
            >
              <a
                :href="model.link.href"
                :target="model.link.target"
                class="configurator-teaser__slide-wrapper"
                :tabindex="isVisible ? 0 : -1"
                @keyup.enter="onTeaserCardClick($event, model.name)"
                @click="onTeaserCardClick($event, model.name)"
              >
                <dwaas-media-image
                  :sources="sources"
                  :src="model.image.src"
                  :alt="model.image.alt"
                  :width="model.image.width"
                  :height="model.image.height"
                >
                </dwaas-media-image>
                <div class="configurator-teaser__price">
                  <p-text>{{ model.price }}</p-text>
                </div>
                <div class="configurator-teaser__button">
                  <p-button
                    icon="configurate"
                    variant="tertiary"
                    tabbable="false"
                  >
                    {{ model.name }}
                  </p-button>
                </div>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasConfiguratorTeaser.scss"></style>
