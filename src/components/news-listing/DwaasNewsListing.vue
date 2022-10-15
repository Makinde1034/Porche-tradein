<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export default {
  name: 'DwaasNewsListing',
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.NEWS_LISTING_LOAD, null, MODULE_PREFIX);
    });

    return {
      el,
    };
  },
};
</script>
<template>
  <div ref="el" class="news-listing">
    <p-content-wrapper width="fluid">
      <p-content-wrapper width="basic">
        <div class="news-listing__container">
          <p-headline class="news-listing__title" variant="headline-2">
            <slot name="headline" />
          </p-headline>
          <dwaas-masonry :cols="{ default: 3, 1300: 2, 700: 1 }" :gutter="32">
            <slot name="list"></slot>
          </dwaas-masonry>
        </div>
      </p-content-wrapper>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasNewsListing.scss"></style>
