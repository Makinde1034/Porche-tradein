<script>
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import {
  useBootstrapper,
  useFinderAPI,
  useSwiper,
  useBreakpoints,
} from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX, NAVIGATION_ELEMENTS } from './consts';

const components = {
  Swiper,
  SwiperSlide,
};

const props = {
  dealerId: {
    type: String,
    default: '',
  },
  emptyState: Object,
  errorState: Object,
  numberOfResults: {
    type: String,
    default: '',
  },
  localize: {
    type: Object,
    default: () => ({
      detailsButton: '',
      numberOfOwners: '',
      availableNumber: '',
      filter: '',
      condition: '',
      allModels: 'All Models',
      showResults: '',
      previousCTA: '',
    }),
  },
  filterQuery: {
    type: String,
    default: '',
  },
};

export default {
  name: 'DwaasCarInventory',
  components,
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const swiperPagination = ref(null);

    // Fetch vehicle data
    const {
      fetchVehicles,
      vehicles,
      loading,
      error,
      isFetched,
      decodeQueryParams,
    } = useFinderAPI();

    const filters = {
      model: null,
      condition: [],
      numberOfResults: props.numberOfResults,
    };

    onMounted(async () => {
      if (props.filterQuery) {
        decodeQueryParams(filters, props.filterQuery);
      }
      await fetchVehicles(filters);

      adaptDynamicBullets(swiperPagination.value);
    });

    // Swiper
    const {
      navigationOptions,
      updateSwiperState,
      adaptDynamicBullets,
      showPrevButton,
      showNextButton,
    } = useSwiper(NAVIGATION_ELEMENTS, true, 'sm');

    const { breakpointSizes } = useBreakpoints();
    const { xxs, xs, sm, md } = breakpointSizes;

    const swiperBreakpoints = {
      [xxs]: {
        slidesPerView: 1.01,
        spaceBetween: 20,
      },
      [xs]: {
        slidesPerView: 1.01,
        spaceBetween: 24,
      },
      [sm]: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      [md]: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    };

    function onSlideChange(swiper) {
      updateSwiperState(swiper);
      adaptDynamicBullets(swiperPagination.value);
    }

    // Analytics load event
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.CARINVENTORY_LOAD, null, MODULE_PREFIX);
    });

    function registerStateLoadAnalytics(state) {
      pushGdlEvent(AnalyticsEvents[state], null, MODULE_PREFIX);
    }

    return {
      el,
      vehicles,
      loading,
      error,
      isFetched,
      registerStateLoadAnalytics,
      updateSwiperState,
      onSlideChange,
      showPrevButton,
      showNextButton,
      navigationOptions,
      swiperBreakpoints,
      swiperPagination,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>

<template>
  <p-content-wrapper ref="el" width="basic" class="car-inventory">
    <p-headline variant="headline-2" class="car-inventory__headline">
      <slot name="headline" />
    </p-headline>

    <div class="car-inventory__wrapper">
      <div v-if="loading" class="car-inventory__loading">
        <p-spinner size="{ base: 'small', l: 'medium' }" aria-label="Loading" />
      </div>

      <template v-if="vehicles?.length">
        <swiper
          :slides-per-view="1"
          :modules="modules"
          :keyboard="{
            enabled: true,
            onlyInViewport: false,
          }"
          :breakpoints="swiperBreakpoints"
          :navigation="navigationOptions"
          :pagination="{
            clickable: true,
            bulletElement: 'button',
            el: '.car-inventory__pagination',
            dynamicBullets: true,
          }"
          :prevent-clicks-propagation="false"
          watch-slides-progress
          @swiper="updateSwiperState"
          @slide-change="onSlideChange"
          @resize="updateSwiperState"
        >
          <swiper-slide
            v-for="(vehicle, index) in vehicles"
            :key="index"
            v-slot="{ isVisible }"
            ><dwaas-car-inventory-card
              :vehicle="vehicle"
              :cta-label="localize.detailsButton"
              :number-of-owners-label="localize?.numberOfOwners"
              :is-visible="isVisible"
              :dealer-id="dealerId"
            ></dwaas-car-inventory-card>
          </swiper-slide>
          <div
            v-show="showPrevButton"
            class="car-inventory__button car-inventory__button-prev"
          >
            <p-button-pure
              v-if="vehicles.length"
              size="large"
              icon="arrow-head-left"
              tabbable="false"
              aria-hidden="true"
            />
          </div>
          <div
            v-show="showNextButton"
            class="car-inventory__button car-inventory__button-next"
          >
            <p-button-pure
              v-if="vehicles.length"
              hide-label="true"
              size="large"
              icon="arrow-head-right"
              tabbable="false"
              aria-hidden="true"
            />
          </div>

          <div ref="swiperPagination" class="car-inventory__pagination"></div>
        </swiper>
      </template>

      <dwaas-empty-state
        v-if="isFetched && !error && vehicles.length === 0"
        class="car-finder__empty-state"
        v-bind="emptyState"
        @load="registerStateLoadAnalytics('CARINVENTORY_EMPTY_STATE_LOAD')"
      />
      <dwaas-error-state
        v-if="error"
        class="car-finder__error-state"
        v-bind="errorState"
        @load="registerStateLoadAnalytics('CARINVENTORY_ERROR_STATE_LOAD')"
      />
    </div>
  </p-content-wrapper>
</template>
<style lang="scss" src="./DwaasCarInventory.scss"></style>
