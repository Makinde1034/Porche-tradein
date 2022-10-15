import { inject } from 'vue';
export const googleMapsSymbol = Symbol();

export function useGoogleMaps() {
  const googleMaps = inject(googleMapsSymbol);
  if (!googleMaps) throw new Error('No GoogleMaps provided!!!');

  return googleMaps;
}

export function createGoogleMaps(options = {}) {
  let mapApiInitialized;
  let isGoogleMapsApiInjected = false;
  window.isGoogleMapsApiInjected = false;

  const googleMapApiLoader = function (callback, apiKey) {
    if (window.google) {
      callback();
      return true;
    } else if (window.isGoogleMapsApiInjected) {
      // eslint-disable-next-line no-inner-declarations
      function checkIfGoogleApiIsLoaded() {
        if (typeof window.google !== 'undefined') {
          callback();
        } else {
          setTimeout(checkIfGoogleApiIsLoaded, 250);
        }
      }
      checkIfGoogleApiIsLoaded();
      return true;
    }
    mapApiInitialized = callback;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=mapApiInitialized`;
    document.body.appendChild(script);

    isGoogleMapsApiInjected = true;
    window.isGoogleMapsApiInjected = true;
    window.mapApiInitialized = mapApiInitialized;
  };

  const initializeMap = (ref, config) => {
    if (ref && config) {
      if (window.google) {
        return new window.google.maps.Map(ref, config);
      }
    } else {
      console.error('[DWAAS] - Error initializing map');
    }
    return null;
  };

  const getGeocoder = () => {
    if (window.google) {
      return new window.google.maps.Geocoder();
    }
    return null;
  };

  const createGoogleMapMarker = (position, map) =>
    new window.google.maps.Marker({
      position,
      map,
    });

  const getLatLngBounds = () => {
    if (window.google) {
      return new window.google.maps.LatLngBounds();
    }
    return null;
  };

  const getStreetViewPanorama = (mapRef, position, config) =>
    new window.google.maps.StreetViewPanorama(mapRef, {
      position: position,
      ...config,
    });

  const $googleMaps = {
    load: googleMapApiLoader,
    isGoogleMapsApiInjected,
    mapApiInitialized,
    initializeMap,
    getGeocoder,
    createGoogleMapMarker,
    getLatLngBounds,
    getStreetViewPanorama,
    options,
    install(app) {
      app.__VUE_GOOGLE_MAPS_SYMBOL__ = googleMapsSymbol;
      app.provide(googleMapsSymbol, $googleMaps);
      app.config.globalProperties.$googleMaps = $googleMaps;

      Object.defineProperty(app.config.globalProperties, '$maps', {
        get() {
          return $googleMaps;
        },
      });
    },
  };

  return $googleMaps;
}
