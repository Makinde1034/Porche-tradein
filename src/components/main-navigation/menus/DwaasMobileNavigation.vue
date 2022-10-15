<script>
import { computed, ref, onMounted, watch, nextTick, watchEffect } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  title: String,
  items: { type: Array, default: () => [] },
  dealer: Object,
  icon: String,
  location: String,
};
export default {
  name: 'DwaasMobileNavigation',
  props,
  setup() {
    // Utils
    const { pushGdlEvent } = useGDL();

    // Refs
    const navCloseButton = ref(null);
    const navWrapper = ref(null);
    const backButton = ref(null);

    // Feature Navigation Open and close
    const isNavigationOpen = ref(false);

    const navWrapperClass = computed(() => {
      return isNavigationOpen.value
        ? 'main-navigation__wrapper--overlay-open'
        : 'main-navigation__wrapper--overlay-closed';
    });

    function toggleNavigation($event) {
      setActiveItem(null);

      isNavigationOpen.value = !isNavigationOpen.value;

      const body = document.getElementsByTagName('body')[0];
      body.classList.toggle('disable-scroll');

      pushGdlEvent(
        isNavigationOpen.value
          ? AnalyticsEvents.NAVIGATION_MOBILE_LOAD
          : AnalyticsEvents.NAVIGATION_MOBILE_CLOSE,
        $event,
        MODULE_PREFIX
      );
    }

    onMounted(() => {
      navWrapper.value.addEventListener('click', ($event) => {
        const hasClass = $event.target.classList.contains(
          'main-navigation__wrapper--overlay-open'
        );
        if (hasClass) toggleNavigation();
      });
    });

    // Submenu
    const activeItem = ref(null);
    function setActiveItem(value) {
      activeItem.value = value;
    }

    watchEffect(() => {
      if (backButton.value) {
        backButton.value.focus();
      }
    });

    // Feature Focus Trap
    const { activate, deactivate } = useFocusTrap(navWrapper, {allowOutsideClick: true});

    watch(isNavigationOpen, async (isOpen) => {
      await nextTick();

      if (isOpen) {
        navCloseButton.value.focus();
        activate();
      } else {
        deactivate();
      }
    });

    return {
      navCloseButton,
      backButton,
      navWrapper,
      navWrapperClass,
      activeItem,
      setActiveItem,
      toggleNavigation,
      isNavigationOpen,
    };
  },
};
</script>

<template>
  <button
    class="main-navigation__button"
    :aria-expanded="`${isNavigationOpen}`"
    aria-controls="navMobileWrapper"
    @click="toggleNavigation"
  >
    <p-text color="inherit">
      {{ title }}
    </p-text>
    <div class="main-navigation__button--open link-hover">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </button>
  <div
    id="navMobileWrapper"
    ref="navWrapper"
    class="main-navigation__wrapper"
    :class="navWrapperClass"
  >
    <div class="mobile-navigation__dialogue">
      <button
        v-show="!activeItem"
        ref="navCloseButton"
        hide-label="true"
        :aria-expanded="`${isNavigationOpen}`"
        aria-controls="navMobileWrapper"
        aria-label="Close menu"
        class="main-navigation__button--close"
        @click="toggleNavigation(false)"
      >
        <p-icon name="close" variant="tertiary" color="inherit"></p-icon>
      </button>

      <ul
        key="mainNav"
        ref="navContainer"
        class="main-navigation__container"
        role="menu"
      >
        <dwaas-main-navigation-link-simple
          v-for="(item, $index) in items"
          :key="$index"
          :href="item.href"
          :target="item.target"
          :item="item"
          :has-sub-nav="item.hasSubNav"
          :active-item="activeItem"
          :button-class="'main-navigation__link-button link-hover'"
          @close-navigation-submenu="setActiveItem(null)"
          @set-active-item="setActiveItem"
        >
          {{ item.text }}
        </dwaas-main-navigation-link-simple>

        <dwaas-main-navigation-link-simple
          key="dealerFlyout"
          item="dealerFlyout"
          :has-sub-nav="true"
          :active-item="activeItem"
          :button-class="'main-navigation__link-button link-hover'"
          @close-navigation-submenu="setActiveItem(null)"
          @set-active-item="setActiveItem"
        >
          <p-icon
            :name="icon"
            class="main-navigation__actions-location-icon"
            size="inherit"
            color="inherit"
          ></p-icon>
          {{ location }}
        </dwaas-main-navigation-link-simple>
      </ul>
    </div>

    <transition-group
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >
      <div v-if="activeItem" class="mobile-navigation__dialogue">
        <button
          ref="backButton"
          class="main-navigation__dropdown-back link-hover"
          @click="setActiveItem(null)"
        >
          <p-icon
            v-if="activeItem"
            name="arrow-head-left"
            aria-label="Arrow head left icon"
            role="img"
            color="inherit"
          ></p-icon>
          <p-text color="inherit">
            {{ title }}
          </p-text>
        </button>

        <button
          ref="navCloseButton"
          hide-label="true"
          :aria-expanded="`${isNavigationOpen}`"
          aria-controls="navMobileWrapper"
          aria-label="Close menu"
          class="main-navigation__button--close"
          @click="toggleNavigation(false)"
        >
          <p-icon
            v-if="activeItem"
            name="close"
            variant="tertiary"
            color="inherit"
          ></p-icon>
        </button>
        <ul
          v-if="activeItem && activeItem !== 'dealerFlyout'"
          role="menu"
          class="main-navigation__dropdown-container"
        >
          <li class="main-navigation__dropdown-title">
            <p-headline variant="headline-4">{{ activeItem.text }}</p-headline>
          </li>
          <dwaas-main-navigation-link-simple
            v-for="(subItem, $index) in activeItem.subitems"
            :key="$index"
            :href="subItem.href"
            :target="subItem.target"
            :last="$index === activeItem.subitems.length - 1"
            @close-navigation-submenu="setActiveItem(null)"
          >
            {{ subItem.text }}
          </dwaas-main-navigation-link-simple>
        </ul>

        <dwaas-main-navigation-dealer-flyout-list
          v-if="activeItem && activeItem == 'dealerFlyout'"
          :address="dealer.address"
          :phone="dealer.phone"
          :phone-label="dealer.phoneLabel"
          :phone-target="dealer.phoneTarget"
          :mail="dealer.mail"
          :mail-label="dealer.mailLabel"
          :mail-target="dealer.mailTarget"
          :links="dealer.links"
          :location="location"
          :is-open="activeItem == 'dealerFlyout'"
          @close-dealer-flyout="setActiveItem(null)"
        />
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" src="./DwaasMobileNavigation.scss"></style>
