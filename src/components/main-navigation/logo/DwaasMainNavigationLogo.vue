<script>
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  href: String,
  alt: String,
  arialabel: String,
  src: String,
};
export default {
  name: 'DwaasMainNavigationLogo',
  props,
  setup() {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onLogoClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_LOGO_CLICK,
        $event,
        `nav-logo ${MODULE_PREFIX}`
      );
    }

    return {
      onLogoClick,
    };
  },
};
</script>
<template>
  <a
    id="main-navigation-logo"
    ref="mainNavigationLogo"
    class="main-navigation__logo"
    :href="href"
    :aria-label="arialabel"
    @click="onLogoClick"
  >
    <img :src="src" :alt="alt" />
  </a>
</template>

<style lang="scss" src="./DwaasMainNavigationLogo.scss"></style>
