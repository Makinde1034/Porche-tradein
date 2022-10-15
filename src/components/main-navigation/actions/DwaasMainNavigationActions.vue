<script>
import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';

import { useBreakpoints } from '/@/composables';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const KEYDOWN_DEBOUNCE = 200;

const props = {
  mobileTitle: String,
  icon: String,
  location: String,
  dealer: Object,
};
export default {
  name: 'DwaasMainNavigationActions',
  props,
  emits: ['closeMobileNavigation', 'setActiveItem'],
  setup(props, { emit }) {
    const isDealerFlyoutOpen = ref(false);

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    // Utils
    const { isNavigationMobile } = useBreakpoints();

    // Feature: handling flyout
    const toggleDealerFlyout = ($event) => {
      isDealerFlyoutOpen.value = !isDealerFlyoutOpen.value;
      emit('setActiveItem', isDealerFlyoutOpen.value ? 'dealerFlyout' : null);

      if (isNavigationMobile.value) {
        pushGdlEvent(
          AnalyticsEvents.NAVIGATION_FLYOUT_CLICK,
          $event,
          MODULE_PREFIX
        );

        pushGdlEvent(
          AnalyticsEvents.NAVIGATION_FLYOUT_OPEN,
          null,
          MODULE_PREFIX
        );
      } else {
        pushGdlEvent(
          AnalyticsEvents.NAVIGATION_FLYOUT_OPEN,
          null,
          MODULE_PREFIX
        );
      }
    };

    function closeDealerFlyout() {
      isDealerFlyoutOpen.value = false;
    }

    function onActionMouseEnter($event) {
      if (!isNavigationMobile.value) {
        useDebounceFn(toggleDealerFlyout($event), KEYDOWN_DEBOUNCE);
      }
    }

    function onActionLeaveEnter() {
      if (!isNavigationMobile.value) {
        closeDealerFlyout();
      }
    }

    function closeMobileNavigation($event) {
      emit('closeMobileNavigation', $event);
    }

    return {
      closeMobileNavigation,
      isNavigationMobile,
      isDealerFlyoutOpen,
      toggleDealerFlyout,
      onActionMouseEnter,
      onActionLeaveEnter,
      closeDealerFlyout,
    };
  },
};
</script>
<template>
  <div
    v-if="location"
    id="nav-actions"
    ref="navActions"
    class="main-navigation__actions link-hover"
    @mouseenter="onActionMouseEnter"
    @mouseleave="onActionLeaveEnter"
  >
    <div class="main-navigation__actions-divider">
      <p-divider orientation="vertical"></p-divider>
    </div>

    <div class="main-navigation__actions-location">
      <button
        ref="navActionsButton"
        class="main-navigation__actions-button"
        :aria-expanded="`${isDealerFlyoutOpen}`"
        @click="toggleDealerFlyout"
        @keydown.tab.shift="
          !isNavigationMobile ? (isDealerFlyoutOpen = false) : ''
        "
      >
        <p-icon
          :name="icon"
          class="main-navigation__actions-location-icon"
          size="inherit"
          color="inherit"
        ></p-icon>
        <div class="main-navigation__actions-location-title">
          {{ location }}
        </div>

        <p-icon
          name="arrow-head-right"
          class="main-navigation__link-arrow"
          color="inherit"
        ></p-icon>
      </button>
    </div>

    <dwaas-main-navigation-dealer-flyout
      v-if="dealer && !isNavigationMobile"
      :mobile-title="mobileTitle"
      :is-open="isDealerFlyoutOpen"
      :address="dealer.address"
      :phone="dealer.phone"
      :phone-label="dealer.phoneLabel"
      :phone-target="dealer.phoneTarget"
      :mail="dealer.mail"
      :mail-label="dealer.mailLabel"
      :mail-target="dealer.mailTarget"
      :links="dealer.links"
      :title="location"
      @close-dealer-flyout="closeDealerFlyout"
      @close-mobile-navigation="closeMobileNavigation"
    ></dwaas-main-navigation-dealer-flyout>
  </div>
</template>

<style lang="scss" src="./DwaasMainNavigationActions.scss"></style>
