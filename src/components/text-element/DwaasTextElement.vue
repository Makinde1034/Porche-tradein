<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';

import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export default {
  name: 'DwaasTextElement',
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.TEXT_ELEMENT_LOAD, null, MODULE_PREFIX);
    });

    return { el };
  },
};
</script>
<template>
  <p-content-wrapper ref="el" width="basic">
    <p-grid>
      <p-grid-item size="{ base: 12,s: 10, m: 7 }" offset="{ base: 0, m: 1 }">
        <div class="text-element">
          <div class="text-element__headline">
            <slot name="headline"></slot>
          </div>
          <slot name="richtext"></slot>
        </div>
      </p-grid-item>
    </p-grid>
  </p-content-wrapper>
</template>
<style scoped lang="scss" src="./DwaasTextElement.scss" />
