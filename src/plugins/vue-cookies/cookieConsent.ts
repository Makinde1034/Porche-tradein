import { computed, inject, watch, reactive, toRefs, App } from 'vue';
import { useLogger } from '/@/composables/useLogger';
import { isEmpty } from '/@/shared/utils';

import { useCookiesV1 } from './composables/useCookiesV1';
import { useCookiesV2 } from './composables/useCookiesV2';
import { IGlobalConsent } from '/@/types/usercentrics';
import {
  CookieConsentState,
  CookiesPlugin,
  UserCentricsVersion,
} from './consts';

export const cookiesSymbol = Symbol();

const { logInfo, logError } = useLogger();
export const UserCentricsScripts = {
  v1: 'https://app.usercentrics.eu/latest/main.js',
  v2: 'https://www.porsche.com/redesign-scripts/vendor/udg-uc-sdk.min.js',
};

export function useCookieConsent(): CookiesPlugin {
  const cookies = inject(cookiesSymbol);
  if (!cookies) throw new Error('No CookieConsent provided!!!');

  return cookies as CookiesPlugin;
}

async function loadUCScript(version: UserCentricsVersion) {
  return new Promise((resolve, reject) => {
    try {
      const ucScript = document.createElement('script');
      ucScript.type = 'text/javascript';
      ucScript.defer = true;
      ucScript.id = (window.GlobalConsent as IGlobalConsent).SettingsId;
      ucScript.src = UserCentricsScripts[version];
      document.body.appendChild(ucScript);
      resolve(true);
    } catch (error) {
      logError('There was an error loading uc sdk');
      reject(false);
    }
  });
}

const state: CookieConsentState = reactive({
  uc: undefined, // local version of window.usercentrics
  isScriptLoaded: false,
  isGTMScriptLoaded: false,
  isNewSDK: false,
  consents: [],
  ucInitialized: false,
});

const ucVersion = computed(() => (state.isNewSDK ? 'v2' : 'v1'));
const allConsentsAccepted = computed(() =>
  state.consents.length > 0
    ? state.consents
        .filter(({ categorySlug }) => categorySlug === 'marketing')
        .every(({ consentStatus }) => consentStatus)
    : false
);

// Depending on the version use one composable or the other for v2
const { initEventListeners, getConsents, acceptAllCookies } =
  window.GlobalConsent && window.GlobalConsent.NewModalSDK
    ? useCookiesV2(state)
    : useCookiesV1(state);

export function createCookieConsent() {
  const $cookies: CookiesPlugin = {
    ...toRefs(state),
    allConsentsAccepted,
    acceptAllCookies,
    async install(app: App) {
      app.provide(cookiesSymbol, $cookies);

      if (!window) {
        logError(`Can't initialize Usercentrics, window object is undefined`);
        return;
      }

      if (
        !isEmpty(window.GlobalConsent as IGlobalConsent) &&
        window.GlobalConsent?.SettingsId
      ) {
        logInfo(
          'Usercentrics is configured for this page',
          window.GlobalConsent
        );
        state.isNewSDK = window.GlobalConsent.NewModalSDK;
        state.isScriptLoaded = (await loadUCScript(ucVersion.value)) as boolean;

        if (state.isScriptLoaded) {
          initEventListeners();

          // If windows.usercentric is defined
          watch(
            () => state.uc,
            (value) => {
              if (value) {
                getConsents();
              }
            }
          );
        }
      }

      logInfo('Cookie Plugin installed successfully', $cookies);
    },
  };
  return $cookies;
}
