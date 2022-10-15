import { computed } from 'vue';
import { useLogger } from '/@/composables/useLogger';
import { Consent } from '/@/types/usercentrics';
import { templateIds } from './consts';
import { useGTM } from './useGTM';
import { CookieConsentState } from '../consts';

export interface UCEvent {
  data: { element: string; event: string };
}
export const UserCentricsEventsV1 = {
  EVENTS: 'ucEvents',
};

const { logInfo, logError } = useLogger();

export function useCookiesV1(state: CookieConsentState) {
  const isConsentForAnalyticsGiven = computed(
    () =>
      state.consents.find(
        ({ templateId }) => templateId === templateIds.analytics
      ) !== undefined
  );

  function onUcInit() {
    // appVersion "2.16.1"
    logInfo(`Usercentric v1 Initialized`, window.usercentrics);
    state.uc = window.usercentrics;
    state.ucInitialized = true;
  }

  function onUcEvent(ucEvent: UCEvent) {
    const { element, event } = ucEvent.data;

    if (event !== 'ui_changed' || !state.uc) return;

    logInfo(`UC Event`, ucEvent);

    if (element === 'firstLayer') {
      getConsents();
    } else if (element === 'secondLayer') {
      const timeout = setTimeout(function () {
        const data = document.querySelectorAll<HTMLElement>(
          `[data-expandable="true"]`
        );
        [...data].forEach((section) => {
          const link = section.querySelectorAll(`[data-readmore="link"]`)[0];
          link?.addEventListener('click', function () {
            const readMoreSection = section.querySelectorAll<HTMLElement>(
              `[data-readmore="text"]`
            )[0];
            readMoreSection.style.display = 'block';
            link.classList.add('hidden');
          });
        });
        clearTimeout(timeout);
      }, 100);
    }
  }

  function acceptAllCookies() {
    if (state.uc) {
      state.uc.acceptAllConsentsAndCloseInitialView();
    }
  }

  function initEventListeners() {
    window.addEventListener('load', () => {
      onUcInit();
    });
    window.addEventListener(
      UserCentricsEventsV1.EVENTS,
      (ev: unknown) => onUcEvent(ev as UCEvent),
      false
    );
  }

  async function getConsents() {
    try {
      state.consents = (await getAllConsents()) as Consent[];
      sendSitecoreCookieStatus();
      if (isConsentForAnalyticsGiven.value) {
        const { setGTM } = useGTM();
        setGTM();
      }
    } catch (error) {
      logError(`There was an error on getting consents`, error);
    }
  }

  function getAllConsents() {
    return new Promise((resolve) => {
      let consentsArray: Consent[] = [];
      const timer = setInterval(() => {
        if (consentsArray.length) {
          clearInterval(timer);
          resolve(consentsArray);
        }
        if (state.uc) consentsArray = state.uc.getConsents() as Consent[];
      }, 100);
    });
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
  return { initEventListeners, getConsents, acceptAllCookies };
}
