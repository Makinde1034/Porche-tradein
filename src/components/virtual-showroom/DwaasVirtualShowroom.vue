<script>
import { useBootstrapper } from '/@/composables';

const props = {
  panorama: {
    type: Object,
    default: () => ({}),
  },
};
export default {
  name: 'DwaasVirtualShowroom',
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
  <div ref="el" class="virtual-showroom">
    <p-content-wrapper width="basic">
      <dwaas-google-panorama
        :api-key="panorama.apiKey"
        :marker="panorama.marker"
        :overlay="panorama.overlay"
        class="virtual-showroom__map-inner"
      >
        <template #cookie-disclaimer>
          <slot name="cookie-disclaimer" />
        </template>
      </dwaas-google-panorama>
    </p-content-wrapper>
  </div>
</template>
