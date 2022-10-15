<script setup lang="ts">
import { ref, watch } from 'vue';

import { useBootstrapper } from '/@/composables';
import { useCookieConsent } from '/@/plugins/vue-cookies/cookieConsent';
import { CookiesOverlay } from '/@/types';

const props = defineProps<{
  lazy: boolean;
  widgetId: string;
  widgetScriptUrl: string;
  overlay: CookiesOverlay;
  skipConsent: boolean;
}>();

const { el } = useBootstrapper();

const { allConsentsAccepted } = useCookieConsent();

const skeleton = ref(false);
const storystream = ref(null);
const isStorystreamInitialized = ref(false);

function initStoryStream() {
  isStorystreamInitialized.value = true;
  skeleton.value = false;
  let storyStreamScript = document.createElement('script');
  storyStreamScript.setAttribute('src', props.widgetScriptUrl);
  const wrapper = document.getElementById('wrapper');

  if (wrapper) {
    wrapper.appendChild(storyStreamScript);
  }
}

watch(
  allConsentsAccepted,
  (value) => {
    if (value) initStoryStream();
  },
  {
    immediate: true,
  }
);

watch(
  () => props.skipConsent,
  (value) => {
    if (value) initStoryStream();
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div ref="el" class="porsche-live">
    <p-content-wrapper width="basic">
      <dwaas-privacy-shield
        v-if="overlay && !allConsentsAccepted && !skipConsent"
        :image="overlay.image"
        :show-button="overlay.showButton"
        :cookies="overlay.cookies"
      >
        <template #cookie-disclaimer>
          <slot name="cookie-disclaimer" />
        </template>
      </dwaas-privacy-shield>
      <section
        ref="storystream"
        class="storystream__container"
        v-if="isStorystreamInitialized"
      >
        <div v-if="skeleton" class="skeleton storystream__skeleton">
          <img
            alt="skeleton"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3C/svg%3E"
          />
        </div>
        <div ref="slotContainer">
          <slot />
        </div>
      </section>
      <slot v-if="allConsentsAccepted" name="button"></slot>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasPorscheLive.scss"></style>
