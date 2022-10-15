<script>
import { onMounted, reactive, ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import {
  useBootstrapper,
  useVehicleModels,
  useSwiper,
  useBreakpoints,
} from '/@/composables';
import DwaasModelSelectSlide from './DwaasModelSelectSlide.vue';
import { formattedBodyTypes, ModelSelectTypes } from './consts';

const components = {
  Swiper,
  SwiperSlide,
  DwaasModelSelectSlide,
};

const props = {
  series: { type: String, default: '', required: true },
  variant: {
    type: String,
    default: ModelSelectTypes.DEFAULT,
  },
};

const navigationElements = {
  next: '.model-select__button-next',
  prev: '.model-select__button-prev',
};

export default {
  name: 'DwaasModelSelect',
  components,
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const isLoading = ref(true);

    const activeTab = reactive({
      index: 0,
      name: 'All',
    });

    const { fetchModelsBySeries, formattedModelList, bodyTypes } =
      useVehicleModels();

    const filteredModels = computed(() =>
      activeTab.index === 0
        ? formattedModelList.value
        : formattedModelList.value.filter(
            (model) => model.type === activeTab.name
          )
    );

    function formatBodyType(bodyType) {
      const formattedBodyType = bodyType.replace(/[^a-zA-Z ]/g, '');
      return formattedBodyTypes[formattedBodyType] || bodyType;
    }

    function tabToIndex(index) {
      controlledSwiper.el.swiper.slideTo(index);
    }

    function updateActiveTab(bodyType, index) {
      activeTab.index = index;
      activeTab.name = bodyType;
      controlledSwiper.el.swiper.slideTo(0);
    }

    const visibleOverlay = ref(-1);
    function toggleOverlay(index) {
      visibleOverlay.value = index;
    }

    const {
      controlledSwiper,
      navigationOptions,
      updateSwiperState,
      showPrevButton,
      showNextButton,
    } = useSwiper(navigationElements, false);

    const { breakpointSizes, breakpoints } = useBreakpoints();
    const { xxs, xs, sm, lg } = breakpointSizes;

    const swiperBreakpoints = {
      [xxs]: {
        slidesPerView: 1.01,
      },
      [xs]: {
        slidesPerView: 1,
      },
      [sm]: {
        slidesPerView: 2,
      },
      [lg]: {
        slidesPerView: 3,
      },
    };

    const showSwiperNavigation = computed(() => {
      return !breakpoints.smaller('sm').value;
    });

    onMounted(async () => {
      isLoading.value = await fetchModelsBySeries({ series: props.series });
    });

    return {
      el,
      isLoading,
      activeTab,
      updateActiveTab,
      bodyTypes,
      filteredModels,
      visibleOverlay,
      toggleOverlay,
      tabToIndex,
      formatBodyType,
      navigationOptions,
      updateSwiperState,
      swiperBreakpoints,
      showPrevButton,
      showNextButton,
      showSwiperNavigation,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>

<template>
  <p-content-wrapper ref="el" width="basic" class="model-select">
    <p-headline variant="headline-2" class="model-select__headline">
      <slot name="headline"></slot>
    </p-headline>

    <div v-if="isLoading" class="model-select__loader">
      <p-spinner size="medium" aria-label="Loading" />
    </div>

    <p-tabs-bar
      v-if="bodyTypes.length > 0"
      :active-tab-index="activeTab.index"
      size="medium"
    >
      <button
        v-for="(type, index) in bodyTypes"
        :id="type"
        :key="type"
        class="model-select__tab"
        type="button"
        :aria-controls="type"
        @click="updateActiveTab(type, index)"
      >
        {{ formatBodyType(type) }}
      </button>
    </p-tabs-bar>

    <div class="model-select__carousel">
      <div
        v-show="showPrevButton && showSwiperNavigation"
        class="model-select__button model-select__button-prev"
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
        v-show="showNextButton && showSwiperNavigation"
        class="model-select__button model-select__button-next"
      >
        <p-button-pure
          hide-label="true"
          size="large"
          icon="arrow-head-right"
          tabbable="false"
          aria-hidden="true"
        />
      </div>
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
          el: '.model-select__pagination',
        }"
        :prevent-clicks-propagation="false"
        @swiper="updateSwiperState"
        @slide-change="updateSwiperState"
        @resize="updateSwiperState"
      >
        <swiper-slide
          v-for="(model, index) in filteredModels"
          :key="index"
          v-slot="{ isActive }"
        >
          <dwaas-model-select-slide
            :variant="variant"
            :model="model"
            :index="index"
            :is-active="isActive"
            :visible-overlay="visibleOverlay"
            @toggle-overlay="toggleOverlay"
            @tab-to-index="tabToIndex"
          ></dwaas-model-select-slide>
        </swiper-slide>
      </swiper>
      <div class="model-select__pagination"></div>
    </div>
  </p-content-wrapper>
</template>

<style lang="scss" src="./DwaasModelSelect.scss"></style>
