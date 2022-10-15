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
    default: '',
  },
};

export default {
  name: 'DwaasMapAndActionLinksCta',
  props,
  setup() {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function handleCtaClick($event) {
      pushGdlEvent(
        AnalyticsEvents.MAP_ACTION_LINKS_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    return {
      handleCtaClick,
    };
  },
};
</script>

<template>
  <div class="map-action-links__link">
    <p-link-pure
      theme="dark"
      size="{ base: 'small', m: 'medium'}"
      :href="href"
      :target="target"
      :icon="icon"
      @click="handleCtaClick"
    >
      <slot />
    </p-link-pure>
  </div>
</template>
