<script>
import { ref, watch, nextTick } from 'vue';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';
import { useBreakpoints } from '/@/composables';

const props = {
  text: String,
  title: String,
  hasSubNav: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  items: { type: Array, default: () => [] },
};
export default {
  name: 'DwaasMainNavigationLink',
  props,
  emits: ['closeMobileNavigation'],
  setup(props, { emit }) {
    const isDropdownOpen = ref(false);
    const backButton = ref(null);
    const submenuRef = ref(null);

    // Utils
    const { isNavigationMobile } = useBreakpoints();

    function toggleDropdown(value) {
      if (!value) {
        // TODO: FOCUS TRAP ON HOLD
        // deactivate();
      }
      isDropdownOpen.value = value || !isDropdownOpen.value;
    }

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onNavItemClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_ITEM_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    // TODO: FOCUS TRAP ON HOLD
    // import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
    // const { activate, deactivate } = useFocusTrap(submenuRef);

    watch(isDropdownOpen, async (isOpen) => {
      //   // We add nextTick to give time to template ref to grab the DOM element
      await nextTick();

      if (isOpen && isNavigationMobile.value) {
        backButton.value.focus();
        // activate();
      } else {
        // deactivate();
      }
    });

    function triggerCloseMobileNavigation($event) {
      toggleDropdown(false);
      emit('closeMobileNavigation', $event);
    }

    return {
      onNavItemClick,
      isDropdownOpen,
      isNavigationMobile,
      toggleDropdown,
      backButton,
      submenuRef,
      triggerCloseMobileNavigation,
    };
  },
};
</script>
<template>
  <li
    :class="{
      'main-navigation__link': true,
      'main-navigation__link--sub-nav': hasSubNav,
    }"
    role="menuitem"
    @mouseenter="!isNavigationMobile ? toggleDropdown(true) : ''"
    @mouseleave="!isNavigationMobile ? toggleDropdown(false) : ''"
  >
    <button
      v-if="hasSubNav"
      ref="submenuButton"
      class="main-navigation__link-button link-hover"
      aria-haspopup="true"
      :aria-expanded="`${isDropdownOpen}`"
      @click="toggleDropdown()"
      @keydown.tab.shift="!isNavigationMobile ? (isDropdownOpen = false) : ''"
    >
      <p-text color="inherit">
        <slot />
        <p-icon
          name="arrow-head-right"
          class="main-navigation__link-arrow"
          color="inherit"
        ></p-icon>
      </p-text>
    </button>

    <a
      v-else
      class="main-navigation__link-text link-hover"
      v-bind="$attrs"
      role="menuitem"
      @click="onNavItemClick"
    >
      <p-text color="inherit">
        <slot />
      </p-text>
    </a>

    <div
      v-if="hasSubNav"
      v-show="isDropdownOpen"
      ref="submenuRef"
      class="main-navigation__dropdown"
      :class="{
        'main-navigation__dropdown--closed': !isDropdownOpen,
      }"
    >
      <div class="main-navigation__dropdown-triangle-top">
        <div class="main-navigation__dropdown-inner-triangle"></div>
      </div>
      <div ref="subNavigationHeader" class="main-navigation__dropdown-header">
        <button
          ref="backButton"
          class="main-navigation__dropdown-back link-hover"
          @click="toggleDropdown(false)"
        >
          <p-icon
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
          hide-label="true"
          class="main-navigation__dropdown-close"
          aria-label="Close button"
          @click="triggerCloseMobileNavigation"
        >
          <p-icon name="close" variant="tertiary" color="inherit"></p-icon>
        </button>
      </div>
      <div class="main-navigation__dropdown-title">
        <p-headline variant="headline-4">{{ text }}</p-headline>
      </div>
      <ul role="menu" class="main-navigation__dropdown-container">
        <dwaas-main-navigation-link-simple
          v-for="(item, $index) in items"
          :key="$index"
          :href="item.href"
          :target="item.target"
          :last="$index === items.length - 1"
          @close-navigation-submenu="toggleDropdown(false)"
        >
          {{ item.text }}
        </dwaas-main-navigation-link-simple>
      </ul>
    </div>
  </li>
</template>

<style lang="scss" src="./DwaasMainNavigationLink.scss"></style>
