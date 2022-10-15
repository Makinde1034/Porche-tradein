<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export default {
  name: 'DwaasIconNavigation',
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(
        AnalyticsEvents.SOCIAL_NETWORK_LINKS_LOAD,
        null,
        MODULE_PREFIX
      );
    });

    return {
      el,
    };
  },
};
</script>
<template>
  <div ref="el" class="icon-navigation">
    <p-content-wrapper width="basic">
      <div class="icon-nav__container">
        <p-divider class="icon-nav__divider"></p-divider>
        <slot name="headline"></slot>
        <div class="icon-nav__icon-container">
          <slot name="iconlist"></slot>
        </div>
      </div>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasIconNavigation.scss"></style>
