<script>
import { ref, watch, nextTick } from 'vue';
import { useDocumentVisibility } from '@vueuse/core';
import { useBootstrapper } from '/@/composables';
import { useCookieConsent } from '/@/plugins/vue-cookies/cookieConsent';
import { useGoogleMaps } from '/@/plugins/vue-google-maps/googleMaps';

import { GOOGLE_MAP_CONFIG, GOOGLE_MAP_ZOOM_LEVEL } from './const';

const props = {
  overlay: { type: Object, default: () => ({}) },
  apiKey: String,
  markers: {
    type: Array,
    default: () => [],
  },
  focusedMarker: {
    type: Number || Boolean,
    default: 0,
  },
};

export default {
  name: 'DwaasGoogleMap',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const { allConsentsAccepted } = useCookieConsent();

    const {
      load,
      initializeMap,
      getGeocoder,
      createGoogleMapMarker,
      getLatLngBounds,
    } = useGoogleMaps();

    const activeMarker = ref(props.focusedMarker);

    // Feature: Google Maps initialization
    const googleMap = ref(null);
    const mapInstance = ref(null);
    const geocoder = ref(null);
    const coordinateMarkers = ref([]);

    const visibility = useDocumentVisibility();

    function initializeLocalMap() {
      if (visibility.value === 'visible') {
        mapInstance.value = initializeMap(googleMap.value, GOOGLE_MAP_CONFIG);
        geocoder.value = getGeocoder();
        parseMarkerCoordinates();
      } else {
        // eslint-disable-next-line no-inner-declarations
        function checkDocumentVisibility() {
          visibility.value === 'visible'
            ? initializeLocalMap()
            : setTimeout(checkDocumentVisibility, 250);
          return;
        }
        checkDocumentVisibility();
      }
    }

    const createMarkerObj = async (id, lat, lng) => {
      return await {
        id,
        ...createGoogleMapMarker(
          {
            lat,
            lng,
          },
          mapInstance.value
        ),
      };
    };

    const parseMarkerCoordinates = async () => {
      try {
        if (props.markers.length > 0) {
          coordinateMarkers.value = await Promise.all(
            props.markers.map(async (marker, id) => {
              if (!isNaN(marker.lat) && !isNaN(marker.lng)) {
                return createMarkerObj(
                  id,
                  parseFloat(marker.lat),
                  parseFloat(marker.lng)
                );
              } else {
                const { lat, lng } = await turnAddressIntoCoordinates(
                  marker,
                  props.markers.length,
                  id
                );
                return createMarkerObj(id, lat, lng);
              }
            })
          );

          nextTick(() => {
            // If only 1 marker we can zoom in the map level to focus on marker
            if (props.markers.length === 1) {
              centerMarker(coordinateMarkers.value[0]);
              zoomFocusedMarker();
            } else {
              // If we have multiple map markers, we fit the map bounds to center them in one frame
              fitBounds();
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    async function turnAddressIntoCoordinates(marker, markersAmount, index) {
      try {
        const markerAddress = `${marker.lat} ${marker.lng}`;
        let addressResults;
        await geocoder.value.geocode(
          { address: markerAddress },
          async function (results) {
            addressResults = await results;
            onGeocodeSuccess(markersAmount, index);
          }
        );
        return {
          lat: await addressResults[0].geometry.location.lat(),
          lng: await addressResults[0].geometry.location.lng(),
        };
      } catch (err) {
        console.log(err);
      }
    }

    function onGeocodeSuccess(markersAmount, index) {
      activeMarker.value = markersAmount === 1 ? index : false;
      Number.isInteger(activeMarker.value)
        ? centerMarker(activeMarker.value)
        : fitBounds();
    }

    function centerMarker(marker) {
      if (marker) {
        mapInstance?.value?.panTo(marker.position);
      }
    }

    function zoomFocusedMarker() {
      mapInstance?.value?.setZoom(GOOGLE_MAP_ZOOM_LEVEL);
    }

    async function fitBounds() {
      const bounds = await getLatLngBounds();
      coordinateMarkers.value.map((marker) => {
        bounds.extend(marker.position);
      });
      mapInstance?.value?.fitBounds(bounds);
    }

    function handleFocusMarker(id) {
      if (id >= 0) {
        centerMarker(coordinateMarkers.value[id]);
        zoomFocusedMarker();
      } else {
        fitBounds();
      }
    }

    function initGoogleMap() {
      try {
        setTimeout(() => {
          load(initializeLocalMap, props.apiKey);
        }, 400);
      } catch (error) {
        console.error(
          '[DWAAS] - There was en error loading the google maps',
          error
        );
      }
    }

    watch(
      () => activeMarker.value,
      (id) => {
        handleFocusMarker(id);
      }
    );

    watch(
      () => props.focusedMarker,
      (id) => {
        handleFocusMarker(id);
      }
    );

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
      allConsentsAccepted,
      el,
      googleMap,
      mapInstance,
      geocoder,
      zoomFocusedMarker,
    };
  },
};
</script>
<template>
  <div ref="el" class="google-map">
    <div
      ref="googleMap"
      :class="{ 'google-map__instance': allConsentsAccepted }"
    ></div>
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

<style lang="scss" src="./DwaasGoogleMap.scss"></style>
