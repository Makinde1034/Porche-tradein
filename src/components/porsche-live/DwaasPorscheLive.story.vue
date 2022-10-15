<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  lazy: true,
  widgetId: 'StoryStreamWidgetApp',
  widgetScriptUrl: 'https://apps.storystream.ai/widget/js/203818638990.js',
  overlay: {
    image: {
      alt: 'cayenne-gts-coupe-4-3840x4318',
      width: '3840',
      height: '4318',
      url: 'https://assets.porsche.com/-/media/Project/DealerWebsites/SharedDealersWebsite/Cookie-Consent/cookieconsent.jpg?rev=370d47d27d934fe984535d990b41a14a',
    },
  },
  skipConsent: true,
});
</script>
<template>
  <Story title="v2/modules/PorscheLive" icon="simple-icons:porsche">
    <Variant title="Playground">
      <dwaas-porsche-live v-bind="state">
        <template #cookie-disclaimer>
          <div>
            Auf unserer Website stellen wir Inhalte von
            <span style="text-decoration: underline"
              >Google Maps, Youtube, Facebook, Instagram, Twitter</span
            >
            bereit. Um diese Inhalte zu sehen, müssen Sie der Datenverarbeitung
            durch
            <span style="text-decoration: underline"
              >Google Maps, Youtube, Facebook, Instagram, Twitter</span
            >
            zustimmen.&nbsp;
          </div>
          <div
            id="gtx-trans"
            style="position: absolute; left: -80px; top: -25px"
          >
            <div class="gtx-trans-icon">&nbsp;</div>
          </div>
        </template>
        <div :id="state.widgetId" class="stry-widget"></div>
      </dwaas-porsche-live>
    </Variant>
  </Story>
</template>
