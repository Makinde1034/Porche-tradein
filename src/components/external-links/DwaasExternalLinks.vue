<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export const props = {
  items: {
    type: Array,
    default: () => [],
  },
};
export default {
  name: 'DwaasExternalLinks',
  props,
  setup() {
    // Refs
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.EXTERNAL_LINKS_LOAD, null, MODULE_PREFIX);
    });

    return {
      el,
    };
  },
};
</script>
<template>
  <div ref="el" class="external-links">
    <p-content-wrapper class="external-links__container" width="basic">
      <div class="external-links__flex-container">
        <ul class="external-links__links">
          <li
            v-for="(link, $index) in items"
            :key="$index"
            class="external-links__link"
          >
            <a :href="link.href" :target="link.target"
              ><p-link-pure size="small">{{ link.text }}</p-link-pure>
            </a>
            <p-divider
              v-show="$index !== items.length - 1"
              orientation="vertical"
              class="external-links__divider"
            ></p-divider>
          </li>
        </ul>
      </div>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" scoped src="./DwaasExternalLinks.scss"></style>
