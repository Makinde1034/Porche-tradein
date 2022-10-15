<script>
import { ref, onMounted } from 'vue';
import { useBootstrapper, useBreakpoints, useSwiper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';

const props = {
  departments: { type: Array, default: () => [] },
};

const navigationElements = {
  next: '.team-slider__arrow-next',
  prev: '.team-slider__arrow-prev',
};

const components = {
  Swiper,
  SwiperSlide,
};
export default {
  name: 'DwaasTeamSlider',
  components,
  props,
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.TEAM_SLIDER_LOAD, null, MODULE_PREFIX);
    });

    const activeCategory = ref(0);
    const { breakpointSizes, breakpoints } = useBreakpoints();
    const { xs, sm, md, lg } = breakpointSizes;

    function changeActiveCategory(e, index) {
      if (activeCategory.value !== index) {
        activeCategory.value = index;
        openAccordionTabs.value = [index];
        isLoading.value = true;
        resetSwiperState();
        // We fake a loading to avoid image flashing on the slides
        setTimeout(() => (isLoading.value = false), 600);
      }

      pushGdlEvent(
        AnalyticsEvents.TEAM_SLIDER_DEPARTMENT_CLICK,
        e,
        MODULE_PREFIX
      );
    }

    const openAccordionTabs = ref([0]);

    function updateActiveCategory() {
      updateSwiperState();
      if (breakpoints.greater('sm').value) {
        openAccordionTabs.value = [activeCategory.value];
      }
    }

    function handleAccordionTab(e, id) {
      activeCategory.value = id;
      const clickedAccordionTab = openAccordionTabs.value.find(
        (accordionTabID) => accordionTabID === id
      );
      typeof clickedAccordionTab === 'number'
        ? (openAccordionTabs.value = openAccordionTabs.value.filter(
            (accordionTabID) => accordionTabID !== id
          ))
        : openAccordionTabs.value.push(id);
      openAccordionTabs.value.length == 0 ? (activeCategory.value = false) : '';

      pushGdlEvent(
        AnalyticsEvents.TEAM_SLIDER_DEPARTMENT_CLICK,
        e,
        MODULE_PREFIX
      );
    }

    const sliderBreakpoints = {
      [xs]: {
        slidesPerView: 1.01,
        spaceBetween: 20,
      },
      [sm]: {
        slidesPerView: 2,
        spaceBetween: 36,
      },
      [md]: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
      [lg]: {
        slidesPerView: 4,
        spaceBetween: 36,
      },
    };
    const isLoading = ref(false);

    const {
      navigationOptions,
      updateSwiperState,
      resetSwiperState,
      showPrevButton,
      showNextButton,
    } = useSwiper(navigationElements, true);

    return {
      el,
      changeActiveCategory,
      activeCategory,
      openAccordionTabs,
      updateActiveCategory,
      handleAccordionTab,
      sliderBreakpoints,
      navigationOptions,
      isLoading,
      updateSwiperState,
      showPrevButton,
      showNextButton,
      modules: [Navigation, Pagination, A11y],
    };
  },
};
</script>
<template>
  <div ref="el" class="team-slider" width="basic">
    <p-content-wrapper class="team-slider__categories">
      <div
        v-if="departments.length > 1"
        class="team-slider__categories-menu"
        role="tablist"
      >
        <button
          v-for="(department, index) in departments"
          :key="index"
          role="tab"
          :aria-selected="activeCategory == index ? 'true' : 'false'"
          :class="
            activeCategory == index
              ? 'team-slider__categories-button--active'
              : 'team-slider__categories-button'
          "
          @click="(e) => changeActiveCategory(e, index)"
        >
          <p-text
            :color="activeCategory == index ? 'brand' : 'inherit'"
            align="center"
            weight="semibold"
            size="inherit"
          >
            {{ department.name }}
          </p-text>
        </button>
      </div>
    </p-content-wrapper>
    <p-content-wrapper class="team-slider__content-wrapper">
      <div class="team-slider__mobile-categories">
        <div
          v-for="(department, key) in departments"
          :key="key"
          class="team-slider__category"
          :class="
            openAccordionTabs.includes(key)
              ? 'team-slider__category--active'
              : 'team-slider__category--hidden'
          "
        >
          <button
            v-if="departments.length > 1"
            :aria-expanded="openAccordionTabs.includes(key)"
            class="team-slider__accordion-tab"
            @click="(e) => handleAccordionTab(e, key)"
          >
            <p-text class="team-slider__accordion-text">
              {{ department.name }}
            </p-text>
            <p-icon
              aria-hidden="true"
              focusable="false"
              :name="
                openAccordionTabs.includes(key)
                  ? 'arrow-head-up'
                  : 'arrow-head-down'
              "
              class="team-slider__accordion-icon"
            >
            </p-icon>
          </button>
          <template
            v-if="activeCategory === key || openAccordionTabs.includes(key)"
          >
            <div
              v-show="showPrevButton"
              class="team-slider__arrow team-slider__arrow-prev"
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
              class="team-slider__arrow team-slider__arrow-next"
            >
              <p-button-pure
                hide-label="true"
                size="large"
                icon="arrow-head-right"
                tabbable="false"
                aria-hidden="true"
              />
            </div>

            <div v-if="isLoading" class="team-slider__loader">
              <p-spinner size="medium" aria-label="Loading" />
            </div>
            <swiper
              ref="carousel"
              :modules="modules"
              :keyboard="{
                enabled: true,
                onlyInViewport: false,
              }"
              :navigation="navigationOptions"
              :breakpoints="sliderBreakpoints"
              :slides-per-view="1.01"
              :space-between="15"
              :pagination="{ clickable: true }"
              :class="
                openAccordionTabs.includes(key)
                  ? 'team-slider__carousel'
                  : 'team-slider__carousel--hidden'
              "
              watch-slides-progress
              @swiper="updateSwiperState"
              @slide-change="updateSwiperState"
              @resize="updateActiveCategory"
            >
              <swiper-slide
                v-for="(
                  { media, name, title, email, telephone }, index
                ) in department.members"
                v-slot="{ isActive, isVisible }"
                :key="index"
              >
                <dwaas-team-member
                  v-show="!isLoading"
                  :media="media"
                  :title="name"
                  :subtitle="title"
                  :email="email"
                  :phone="telephone"
                  :is-active="isActive"
                  :is-visible="isVisible"
                />
              </swiper-slide>
            </swiper>
          </template>
        </div>
      </div>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasTeamSlider.scss"></style>
