<script>
import { onMounted } from 'vue';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

export default {
  name: 'DwaasChat',
  setup(props, { attrs }) {
    try {
      const chatScript = document.createElement('script');
      chatScript.setAttribute('src', attrs.src);
      chatScript.setAttribute('async', true);
      document.body.appendChild(chatScript);
    } catch (error) {
      console.error(error);
    }

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      attrs.src
        ? pushGdlEvent(AnalyticsEvents.LIVE_CHAT_LOAD, null, MODULE_PREFIX)
        : null;
    });
  },
};
</script>

<template>
  <div style="display: none"></div>
</template>
