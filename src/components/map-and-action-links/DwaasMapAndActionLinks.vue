<script>
import { useBootstrapper } from '/@/composables';

const props = {
  googleMap: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'DwaasMapAndActionLinks',
  props,
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>

<template>
  <div ref="el" class="map-action-links">
    <p-content-wrapper>
      <div class="map-action-links__wrapper">
        <div class="map-action-links__map">
          <dwaas-google-map
            :api-key="googleMap.apiKey"
            :markers="googleMap.markers"
            :overlay="googleMap.overlay"
            :focused-marker="1"
            class="map-action-links__map-inner"
          >
            <template #cookie-disclaimer>
              <slot name="cookie-disclaimer" />
            </template>
          </dwaas-google-map>
        </div>
        <div class="map-action-links__links">
          <slot name="links" />
        </div>
      </div>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasMapAndActionLinks.scss"></style>
