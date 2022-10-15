<script>
import { ref, watch } from 'vue';
import { useGoogleMaps } from '/@/plugins/vue-google-maps/googleMaps';
import { useBootstrapper, useBreakpoints } from '/@/composables';
import { useCookieConsent } from '/@/plugins/vue-cookies/cookieConsent';

import { GOOGLE_PANORAMA_CONFIG } from './const';

const props = {
  overlay: { type: Object, default: () => ({}) },
  apiKey: String,
  marker: {
    type: Object,
    requitred: true,
  },
};

export default {
  name: 'DwaasGooglePanorama',
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const { allConsentsAccepted } = useCookieConsent();
    const { breakpoints } = useBreakpoints();
    const isMobile = breakpoints.smaller('xs')

    const { load, initializeMap, getGeocoder, getStreetViewPanorama } =
      useGoogleMaps();

    const isCoverClosed = ref(false);

    function closeCover() {
      isCoverClosed.value = true;
    }

    // Feature: Google Maps initialization
    const googleMap = ref(null);
    const mapInstance = ref(null);
    const geocoder = ref(null);
    const panorama = ref(null);

    function convertFovToSafeZoom(fov) {
      if (!isFinite(fov)) return GOOGLE_PANORAMA_CONFIG.zoom;
      if (fov <= 0 || fov > 180) return GOOGLE_PANORAMA_CONFIG.zoom;
      return Math.log(180 / fov) / Math.log(2);
    }

    function convertHeadingToSafeHeading(heading) {
      if (!isFinite(heading)) return GOOGLE_PANORAMA_CONFIG.pov.heading;
      return heading;
    }

    function convertTiltToSafePitch(tilt) {
      if (!isFinite(tilt)) return GOOGLE_PANORAMA_CONFIG.pov.pitch;
      return tilt - 90;
    }

    function parseCameraConfigPart(configString, partCode) {
      try {
        const regex = new RegExp(
          `([+-]?([0-9]+([.][0-9]*)?|[.][0-9]+))${partCode}`
        );
        const match = regex.exec(configString);
        return parseFloat(match[1]);
      } catch (e) {
        return NaN;
      }
    }

    function parseCameraConfig() {
      const configString = props.marker?.cameraConfig?.trim();
      if (!configString) return GOOGLE_PANORAMA_CONFIG;
      if (configString.length == 0) return GOOGLE_PANORAMA_CONFIG;

      const y = parseCameraConfigPart(configString, 'y');
      const h = parseCameraConfigPart(configString, 'h');
      const t = parseCameraConfigPart(configString, 't');

      const zoom = convertFovToSafeZoom(y);
      const heading = convertHeadingToSafeHeading(h);
      const pitch = convertTiltToSafePitch(t);

      const config = {
        pov: {
          heading: heading,
          pitch: pitch,
        },
        zoom: zoom,
      };

      return config;
    }

    function setStreetView(position) {
      const cameraConfig = parseCameraConfig();

      panorama.value = getStreetViewPanorama(
        googleMap.value,
        position,
        cameraConfig
      );

      mapInstance.value.setStreetView(panorama.value);
    }

    function initializePanoramaFromAddress() {
      geocoder.value = getGeocoder();
      geocoder.value.geocode(
        { address: `${props.marker.lat} ${props.marker.lng}` },
        (results) => {
          const location = results[0]?.geometry?.location;
          const position = location ?? { lat: 0, lng: 0 };
          setStreetView(position);
        }
      );
    }

    function initializePanoramaFromLatLng() {
      const position = {
        lat: parseFloat(props.marker.lat),
        lng: parseFloat(props.marker.lng),
      };
      setStreetView(position);
    }

    function isValidLatLng(lat, lng) {
      if (isNaN(lat) || isNaN(lng)) return false;
      if (!isFinite(lat) || !isFinite(lng)) return false;
      if (lat < -90 || lat > 90) return false;
      if (lng < -180 || lng > 180) return false;
      return true;
    }

    function initializePanorama() {
      mapInstance.value = initializeMap(
        googleMap.value,
        GOOGLE_PANORAMA_CONFIG
      );

      if (isValidLatLng(props.marker.lat, props.marker.lng)) {
        initializePanoramaFromLatLng();
      } else {
        initializePanoramaFromAddress();
      }
    }

    function initGoogleMap() {
      try {
        load(initializePanorama, props.apiKey);
      } catch (error) {
        console.error(
          '[DWAAS] - There was en error loading the google panoram',
          error
        );
      }
    }

    watch(
      allConsentsAccepted,
      (value) => {
        if (value) initGoogleMap();
      },
      {
        immediate: true,
      }
    );

    return {
      el,
      allConsentsAccepted,
      googleMap,
      mapInstance,
      isCoverClosed,
      closeCover,
      isMobile,
    };
  },
};
</script>
<template>
  <div ref="el" class="google-panorama">
    <div
      ref="googleMap"
      :class="{ 'google-panorama__instance': allConsentsAccepted || !isMobile }"
    ></div>
    <div
      v-if="allConsentsAccepted && !isCoverClosed"
      class="google-panorama__cover"
    >
      <p-button-pure
        icon="360"
        hide-label="true"
        theme="dark"
        size="x-large"
        @click="closeCover"
        >360</p-button-pure
      >
    </div>
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
  </div>
</template>

<style lang="scss" src="./DwaasGooglePanorama.scss"></style>
