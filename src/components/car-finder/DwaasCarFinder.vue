<script>
import {
  ref,
  onMounted,
  reactive,
  watch,
  nextTick,
  onUnmounted,
  computed,
} from 'vue';
import { onClickOutside } from '@vueuse/core';

import { useBootstrapper, useFinderAPI, useBreakpoints } from '/@/composables';

import DwaasCarFinderCard from './card/DwaasCarFinderCard.vue';
import DwaasCarFinderFilters from './filters/DwaasCarFinderFilters.vue';
import DwaasEmptyState from '../empty-state/DwaasEmptyState.vue';
import DwaasErrorState from '../error-state/DwaasErrorState.vue';

import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const formatString = (input, ...replaceValues) => {
  if (!input || !input.length) {
    return '';
  }

  if (!replaceValues || !replaceValues.length) {
    return input;
  }

  for (let i = 0; i < replaceValues.length; i++) {
    input = input.replace('{' + i + '}', replaceValues);
  }

  return input;
};

const props = {
  dealerId: {
    type: String,
    default: '',
  },
  emptyState: Object,
  errorState: Object,
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
};

const components = {
  DwaasCarFinderCard,
  DwaasEmptyState,
  DwaasErrorState,
  DwaasCarFinderFilters,
};

export default {
  name: 'DwaasCarFinder',
  components,
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const carFinderRef = ref(null);

    // Fetch vehicle data
    const {
      fetchVehicles,
      vehicles,
      loading,
      error,
      isFetched,
      decodeQueryParams,
    } = useFinderAPI();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    const availableText = computed(() =>
      formatString(props.localize.availableNumber, vehicles.value.length)
    );

    function onEmptyStateLoad() {
      pushGdlEvent(
        AnalyticsEvents.CARFINDER_EMPTY_STATE_LOAD,
        null,
        MODULE_PREFIX
      );
    }

    function onErrorStateLoad() {
      pushGdlEvent(
        AnalyticsEvents.CARFINDER_ERROR_STATE_LOAD,
        null,
        MODULE_PREFIX
      );
    }

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.CARFINDER_LOAD, null, MODULE_PREFIX);
    });

    // Feature: filtering

    const filterPanelRef = ref(null);
    const filterCloseBtn = ref(null);
    const filterBtnRef = ref(null);
    const isFilterButtonSticky = ref(false);

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
      const stickyElementOffset = filterBtnRef.value.getBoundingClientRect();

      isFilterButtonSticky.value = stickyElementOffset.top <= 1;
    }

    // Feature: Filters

    const isFilterOpen = ref(false);
    const { isMobile } = useBreakpoints();

    const filters = reactive({
      model: null,
      condition: [],
    });

    onMounted(async () => {
      window.location.search
        ? decodeQueryParams(filters, window.location.search)
        : await fetchVehicles(filters);
    });

    async function handleFilterChange(value) {
      await fetchVehicles(value);
    }

    watch(isFilterOpen, () => {
      const body = document.getElementsByTagName('body')[0];
      body.classList.toggle('disable-scroll');
    });

    function toggleFilterPanel() {
      isFilterOpen.value = !isFilterOpen.value;
    }

    function closeFilterPanel() {
      isFilterOpen.value = false;
    }

    // Feature Focus Trap

    onClickOutside(filterPanelRef, () => closeFilterPanel());

    watch(isFilterOpen, async (isOpen) => {
      await nextTick();

      if (isOpen) {
        filterCloseBtn.value.focus();
      }
    });

    return {
      el,
      vehicles,
      loading,
      error,
      isFetched,
      carFinderRef,
      filterPanelRef,
      filterBtnRef,
      filterCloseBtn,
      filters,
      handleFilterChange,
      isMobile,
      isFilterOpen,
      toggleFilterPanel,
      closeFilterPanel,
      isFilterButtonSticky,
      onEmptyStateLoad,
      onErrorStateLoad,
      availableText,
    };
  },
};
</script>

<template>
  <p-content-wrapper ref="el" width="basic" class="car-finder">
    <p-headline variant="headline-1" class="car-finder__headline">
      <slot name="headline" />
    </p-headline>
    <div
      v-show="isMobile"
      ref="filterBtnRef"
      class="car-finder__filter-nav full-width-breaker"
    >
      <button
        class="car-finder__filter-toggle"
        :class="{ 'car-finder__filter-toggle--sticky': isFilterButtonSticky }"
        @click="toggleFilterPanel"
      >
        <p-icon name="filter" aria-label="Open Filters"></p-icon>
        {{ localize.filter }}
      </button>
    </div>
    <div class="car-finder__container">
      <aside v-if="!isMobile" class="car-finder__filters">
        <DwaasCarFinderFilters
          :localize="localize"
          :default-filters="filters"
          @change="handleFilterChange"
        />
      </aside>
      <p-divider v-if="!isMobile" orientation="vertical"></p-divider>
      <section class="car-finder__content">
        <div v-if="loading" class="car-finder__loading">
          <p-spinner
            size="{ base: 'small', l: 'medium' }"
            aria-label="Loading"
          />
        </div>
        <label v-else class="car-finder__results-label">
          <p-text weight="bold">
            {{ availableText }}
          </p-text>
        </label>
        <transition-group
          v-if="!loading && vehicles.length > 0"
          appear
          tag="div"
          name="staggered-fade"
        >
          <article
            v-for="(vehicle, $index) of vehicles"
            :key="vehicle.id"
            class="car-finder__box"
            :data-index="$index"
          >
            <DwaasCarFinderCard
              :vehicle="vehicle"
              :cta-label="localize.detailsButton"
              :dealer-id="dealerId"
              :number-of-owners-label="localize.numberOfOwners"
            />
          </article>
        </transition-group>
        <dwaas-empty-state
          v-if="isFetched && !error && vehicles.length === 0"
          class="car-finder__empty-state"
          v-bind="emptyState"
          @load="onEmptyStateLoad"
        />
        <dwaas-error-state
          v-if="error"
          class="car-finder__error-state"
          v-bind="errorState"
          @load="onErrorStateLoad"
        />
      </section>
    </div>

    <div
      class="car-finder-filter"
      :style="{ pointerEvents: isFilterOpen ? 'all' : 'none' }"
    >
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-show="isFilterOpen" class="car-finder-filter__overlay" />
      </transition>

      <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutLeft"
      >
        <div
          v-show="isFilterOpen"
          ref="filterPanelRef"
          class="car-finder-filter__dialog"
          role="dialog"
          aria-modal="true"
        >
          <header class="car-finder-filter__header">
            <p-headline variant="headline-2" tag="h2">{{
              localize.filter
            }}</p-headline>
            <p-button
              ref="filterCloseBtn"
              hide-label="true"
              aria-controls="car-finder-filter__dialog"
              class="car-finder-filter__button--close"
              variant="tertiary"
              icon="close"
              @click="closeFilterPanel"
            />
          </header>
          <p-divider />
          <div class="car-finder-filter__content">
            <DwaasCarFinderFilters
              v-if="isMobile"
              :localize="localize"
              :default-filters="filters"
              @change="handleFilterChange"
            />
          </div>
          <footer class="car-finder-filter__footer">
            <p-button
              class="car-finder-filter__button"
              @click="closeFilterPanel"
              >{{ localize.showResults }}</p-button
            >
          </footer>
        </div>
      </transition>
    </div>
  </p-content-wrapper>
</template>

<style lang="scss" src="./DwaasCarFinder.scss"></style>
