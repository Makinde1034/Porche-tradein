import { computed } from 'vue';
import { useLogger } from '/@/composables/useLogger';
import { useDebounceFn } from '@vueuse/core';
import { templateIds } from './consts';
import { useGTM } from './useGTM';
import { Consent } from '/@/types/usercentrics';
import { CookieConsentState } from '../consts';

export const UserCentricsEventsV2 = {
  READY: 'ucReady', // Is triggered after the SDK files are loaded.
  INIT: 'ucInit', // Is triggered after the SDK is initialised.
  EVENT: 'ucEvent', // Is fired as soon as layer 1, layer 2 or layer 4 becomes visible to modify the content.
  CONSENT_CHANGED: 'usercentrics-events',
};

const { logInfo, logError } = useLogger();

export function useCookiesV2(state: CookieConsentState) {
  const isConsentForAnalyticsGiven = computed(
    () =>
      state.consents.find(
        ({ templateId }) => templateId === templateIds.analytics
      ) !== undefined
  );

  function onUcInit() {
    // appVersion "2.16.1"
    logInfo(`Usercentric sdk v2 Initialized`, window.usercentrics);
    state.uc = window.usercentrics;
    state.ucInitialized = true;
  }

  function onUcEvent(ucEvent: Event) {
    logInfo(`UC Event`, ucEvent);

    getConsents();
    sendSitecoreCookieStatus();
  }

  function onAcceptCookiesButtonClicked() {
    getConsents();
  }

  function initEventListeners() {
    window.addEventListener(UserCentricsEventsV2.INIT, onUcInit, false);
    window.addEventListener(UserCentricsEventsV2.EVENT, onUcEvent, false);

    window.addEventListener(
      UserCentricsEventsV2.CONSENT_CHANGED,
      useDebounceFn(onAcceptCookiesButtonClicked, 500),
      false
    );
  }

  function getConsents() {
    state.consents = state?.uc?.getConsents() as Consent[];
    sendSitecoreCookieStatus();

    if (isConsentForAnalyticsGiven.value) {
      const { setGTM } = useGTM();
      setGTM();
    }
  }

  function getConsentStatus(templateId: string) {
    const consent = state?.uc?.getConsents(templateId) as Consent;
    return consent ? consent.consentStatus : false;
  }

  async function sendSitecoreCookieStatus() {
    try {
      const sitecoreConsent = getConsentStatus(templateIds.sitecore);
      if (
        window?.GlobalConsent?.consentExpire &&
        isConsentForAnalyticsGiven.value
      ) {
        await fetch(
          `/api/cookieConsent/setAnalyticsCookieStatus?status=${
            sitecoreConsent && isConsentForAnalyticsGiven.value
          }&expiry=${window.GlobalConsent.consentExpire}`
        );
      }
    } catch (error) {
      logError(
        `There was an error on the setAnalyticsCookieStatus to Sitecore`,
        error
      );
    }
  }

  function acceptAllCookies() {
    const allConsents = state.consents.map(({ templateId }) => ({
      templateId,
      status: true,
    }));
    try {
      state?.uc?.updateConsents(allConsents);
      state?.uc?.toggleCenteredModalIsVisible(false);
    } catch (error) {
      logError(
        `There was an error accepting all cookies from Privacy Banner`,
        error
      );
    }
  }

  return { initEventListeners, getConsents, acceptAllCookies };
}
