<script>
import { ref, watch, nextTick } from 'vue';
import { useBreakpoints } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

export const props = {
  mobileTitle: String,
  isOpen: {
    type: Boolean,
    default: false,
  },
  address: {
    type: Array,
    default: () => [],
  },
  title: String,
  phone: String,
  phoneLabel: String,
  phoneTarget: String,
  mail: String,
  mailLabel: String,
  mailTarget: String,
  links: {
    type: Array,
    default: () => [],
  },
};

export default {
  name: 'DwaasMainNavigationDealerFlyout',
  props,
  emits: ['closeDealerFlyout', 'closeMobileNavigation'],
  setup(props, { emit }) {
    const dealerFlyoutBackButton = ref(null);
    const dealerContainerRef = ref(null);

    const { isNavigationMobile } = useBreakpoints();

    function closeFlyout($event) {
      emit('closeDealerFlyout', $event);
    }

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function triggerCloseMobileNavigation($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_CLOSE,
        $event,
        MODULE_PREFIX
      );
      closeFlyout($event);
      emit('closeMobileNavigation', $event);
    }

    function onBackClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_BACK,
        $event,
        MODULE_PREFIX
      );
      closeFlyout($event);
    }

    watch(
      () => props.isOpen,
      async (isOpen) => {
        await nextTick();

        if (isOpen && isNavigationMobile.value) {
          dealerFlyoutBackButton.value.focus();
        }
      }
    );

    return {
      dealerContainerRef,
      dealerFlyoutBackButton,
      closeFlyout,
      isNavigationMobile,
      triggerCloseMobileNavigation,
      onBackClick,
    };
  },
};
</script>
<template>
  <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div v-show="!isNavigationMobile || isOpen" ref="dealerContainerRef" class="dealer-flyout__container" :class="
      isOpen
        ? 'dealer-flyout__container--open'
        : 'dealer-flyout__container--closed'
    ">
      <div class="dealer-flyout__triangle-top">
        <div class="dealer-flyout__inner-triangle"></div>
      </div>
      <div class="dealer-flyout__header">
        <button ref="dealerFlyoutBackButton" class="dealer-flyout__back link-hover" @click="onBackClick">
          <span>
            <p-icon name="arrow-head-left" aria-label="Arrow head left icon" role="img" color="inherit"></p-icon>
          </span>
          <p-text color="inherit"> {{ mobileTitle }} </p-text>
        </button>
        <button ref="dealerFlyoutCloseButton" hide-label="true" aria-label="Close button"
          class="dealer-flyout__button--close" @click="triggerCloseMobileNavigation">
          <p-icon name="close" variant="tertiary" color="inherit"></p-icon>
        </button>
      </div>

      <div class="dealer-flyout__overlay-title">
        <p-headline variant="headline-4">{{ title }}</p-headline>
      </div>

      <dwaas-main-navigation-dealer-flyout-list :address="address" :phone="phone" :phone-target="phoneTarget"
        :phone-label="phoneLabel" :mail="mail" :mail-target="mailTarget" :mail-label="mailLabel" :links="links"
        @close-dealer-flyout="closeFlyout" />
    </div>
  </transition>
</template>

<style lang="scss" src="./DwaasMainNavigationDealerFlyout.scss">
</style>
