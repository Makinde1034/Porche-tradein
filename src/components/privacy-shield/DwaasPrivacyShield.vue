<script lang="ts" setup>
import { watch, ref } from 'vue';
import { useCookieConsent } from '/@/plugins/vue-cookies/cookieConsent';

import { CookiesContent, PRIVACY_SHIELD_BG_SOURCES } from './const';
import { DwaasLink, DwaasMedia } from '/@/types';

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
const props = defineProps<{
  image: DwaasMedia;
  showButton?: DwaasLink;
  cookies: CookiesContent;
  skipConsent: boolean; // For unit testing only
}>();

const { acceptAllCookies, ucInitialized } = useCookieConsent();

const showLoader = ref(!props.skipConsent);
watch(
  () => ucInitialized.value,
  (newValue) => {
    if (newValue) {
      const timeout = setTimeout(() => {
        showLoader.value = false;
        clearTimeout(timeout);
      }, 1000);
    }
  }
);
</script>
<template>
  <div v-if="image" class="dwaas-privacy-shield">
    <dwaas-media-image
      class="dwaas-privacy-shield__background-wrapper"
      :sources="PRIVACY_SHIELD_BG_SOURCES"
      :src="image.url"
      :alt="image.alt"
      :height="image.height"
      :width="image.width"
    />
    <div class="dwaas-privacy-shield__shader"></div>
    <div
      class="dwaas-privacy-shield__content"
      :class="showLoader ? 'dwaas-privacy-shield__content--loading' : ''"
    >
      <template v-if="!showLoader">
        <p-headline
          class="dwaas-privacy-shield__title"
          theme="dark"
          variant="headline-3"
          tag="h2"
          >{{ cookies.heading }}</p-headline
        >
        <p-text class="dwaas-privacy-shield__text" theme="dark"
          ><slot name="cookie-disclaimer"></slot
        ></p-text>
        <div class="dwaas-privacy-shield__buttons">
          <p-button
            class="dwaas-privacy-shield__button"
            @click="acceptAllCookies"
            >{{ cookies.agreeButton }}</p-button
          >
          <p-link
            v-if="showButton"
            class="dwaas-privacy-shield__button"
            :href="showButton.href"
            :target="showButton.target"
          >
            {{ cookies.showButton }}
          </p-link>
        </div>
      </template>
      <p-spinner
        v-else
        theme="dark"
        size="medium"
        aria="{'aria-label': 'Loading content'}"
      />
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasPrivacyShield.scss"></style>
