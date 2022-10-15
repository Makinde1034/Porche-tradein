<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  image: {
    alt: 'cayenne-gts-coupe-4-3840x4318',
    width: '3840',
    height: '4318',
    url: 'https://assets.porsche.com/-/media/Project/DealerWebsites/SharedDealersWebsite/Cookie-Consent/cookieconsent.jpg?rev=370d47d27d934fe984535d990b41a14a',
  },
  cookies: {
    heading: 'Hinweis zur Datenverarbeitung',
    agreeButton: 'Zustimmen',
    showButton: 'Hinweise zum Datenschutz',
  },
  skipConsent: true,
  showButton: {
    href: '/dwaasdev/en/Cookie-Policy-Settings',
    target: '',
  },
});
</script>
<template>
  <Story title="v2/modules/PrivacyShield" icon="ic:twotone-privacy-tip">
    <Variant title="Playground">
      <dwaas-privacy-shield v-bind="state">
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
      </dwaas-privacy-shield>
    </Variant>
  </Story>
</template>
