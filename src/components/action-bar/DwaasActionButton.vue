<script>
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'arrow-head-right',
  },
};
export default {
  name: 'DwaasActionButton',
  props,
  setup() {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function handleClick($event) {
      pushGdlEvent(
        AnalyticsEvents.ACTION_BAR_LINK_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    return {
      handleClick,
    };
  },
};
</script>

<template>
  <a
    class="action-bar__button"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <div>
      <p-icon :name="icon" color="inherit"> </p-icon>
    </div>
    <div class="action-bar__button-label">
      <p-text color="inherit" size="inherit" align="center">
        <slot name="label" />
      </p-text>
    </div>
  </a>
</template>
