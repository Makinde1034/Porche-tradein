<script>
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  last: Boolean,
  isNavigationMobile: {
    type: Boolean,
    default: true,
  },
};
export default {
  name: 'DwaasMainNavigationDealerLink',
  props,
  emits: ['closeDealerFlyout'],
  setup(props, { emit }) {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onTab($event) {
      if (props.last && !props.isNavigationMobile) {
        emit('closeDealerFlyout', $event);
      }
    }

    return {
      onClick,
      onTab,
    };
  },
};
</script>
<template>
  <li class="dealer-flyout__link" role="menuitem">
    <a
      v-bind="$attrs"
      class="link-hover"
      @click="onClick"
      @keydown.tab.exact="onTab"
    >
      <p-text color="inherit">
        <slot />
      </p-text>
    </a>
  </li>
</template>

<style lang="scss" src="./DwaasMainNavigationDealerFlyout.scss"></style>
