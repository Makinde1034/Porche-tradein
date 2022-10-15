<script>
import { useBreakpoints } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  last: Boolean,
  item: { type: [Object, String], default: null },
  activeItem: {
    type: [Object, String],
    default: null,
  },
  hasSubNav: {
    type: Boolean,
    default: false,
  },
  buttonClass: {
    type: String,
    default: '',
  },
};

export default {
  name: 'DwaasMainNavigationLinkSimple',
  props,
  emits: ['closeNavigationSubmenu', 'setActiveItem'],
  setup(props, { emit }) {
    const { isNavigationMobile } = useBreakpoints();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onClick($event) {
      if (props.hasSubNav) emit('setActiveItem', props.activeItem ? null : props.item);

      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_ITEM_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onTab($event) {
      if (props.last && !isNavigationMobile.value) {
        emit('closeNavigationSubmenu', $event);
      }
    }

    return {
      onTab,
      onClick,
    };
  },
};
</script>
<template>
  <li class="main-navigation__dropdown-link" role="menuitem">
    <component
      :is="hasSubNav ? 'button' : 'a'"
      v-bind="$attrs"
      :class="buttonClass + ' link-hover'"
      :tabindex="activeItem ? -1 : 0"
      @click="onClick"
      @keydown.tab.exact="onTab"
    >
      <p-text color="inherit">
        <slot />

        <p-icon
          v-if="hasSubNav"
          name="arrow-head-right"
          class="main-navigation__link-arrow"
          color="inherit"
        ></p-icon>
      </p-text>
    </component>
  </li>
</template>

<style lang="scss" src="./DwaasMainNavigationLink.scss"></style>
