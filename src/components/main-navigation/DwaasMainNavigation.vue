<script>
import { ref, onMounted, computed } from 'vue';
import { useBootstrapper, useBreakpoints } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export const props = {
  title: String,
  items: { type: Array, default: () => [] },
  icon: String,
  location: String,
  dealer: Object,
};
export default {
  name: 'DwaasMainNavigation',
  props,
  setup() {
    // Refs
    const navWrapper = ref(null);
    const { el } = useBootstrapper();

    // Utils
    const { pushGdlEvent } = useGDL();
    const { isNavigationMobile } = useBreakpoints();

    const navComponent = computed(() => {
      return isNavigationMobile.value
        ? 'dwaas-mobile-navigation'
        : 'dwaas-desktop-navigation';
    });

    onMounted(() => {
      if (!isNavigationMobile.value) {
        pushGdlEvent(AnalyticsEvents.NAVIGATION_LOAD, null, MODULE_PREFIX);
      }
    });

    return {
      el,
      isNavigationMobile,
      navWrapper,
      navComponent,
    };
  },
};
</script>
<template>
  <nav ref="el" class="main-navigation">
    <slot name="navigation-logo" />

    <KeepAlive>
      <component
        :is="navComponent"
        :title="title"
        :items="items"
        :icon="icon"
        :location="location"
        :dealer="dealer"
      >
        <template #navLinks>
          <dwaas-main-navigation-actions
            :mobile-title="title"
            :icon="icon"
            :location="location"
            :dealer="dealer"
          >
          </dwaas-main-navigation-actions>
        </template>
      </component>
    </KeepAlive>
  </nav>
</template>

<style lang="scss" src="./DwaasMainNavigation.scss"></style>
