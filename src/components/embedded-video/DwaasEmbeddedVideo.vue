<script>
import { ref, computed, onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useCookieConsent } from '/@/plugins/vue-cookies/cookieConsent';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  overlay: { type: Object, default: () => ({}) },
  videoUrl: String,
};

export default {
  name: 'DwaasEmbeddedVideo',
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const { allConsentsAccepted } = useCookieConsent();

    const isCookieConsentGiven = ref(false);

    const iframeSrc = computed(() =>
      props.videoUrl ? `${props.videoUrl}?rel=0&modestbranding=1` : null
    );

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.EMBEDDED_VIDEO_LOAD, null, MODULE_PREFIX);
    });

    return {
      el,
      iframeSrc,
      isCookieConsentGiven,
      allConsentsAccepted,
    };
  },
};
</script>
<template>
  <div ref="el" class="embedded-video">
    <p-content-wrapper width="basic">
      <p-grid>
        <p-grid-item
          size="{ base: 12, s: 10, m: 7 }"
          offset="{ base: 0, m: 1 }"
        >
          <dwaas-privacy-shield
            v-if="overlay && !allConsentsAccepted"
            :image="overlay.image"
            :show-button="overlay.showButton"
            :cookies="overlay.cookies"
          >
            <template #cookie-disclaimer>
              <slot name="cookie-disclaimer" />
            </template>
          </dwaas-privacy-shield>

          <div v-else class="embedded-video__wrapper">
            <iframe
              v-if="iframeSrc"
              class="embedded-video__content"
              :src="iframeSrc"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameborder="0"
              allowfullscreen
            >
            </iframe>
          </div>
        </p-grid-item>
      </p-grid>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasEmbeddedVideo.scss"></style>
