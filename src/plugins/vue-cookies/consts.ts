import { App, ComputedRef, Ref } from 'vue';
import { Consent, UserCentrics } from '/@/types/usercentrics';

export type UserCentricsVersion = 'v1' | 'v2';

export interface CookieConsentState {
  uc?: UserCentrics;
  isScriptLoaded: boolean;
  isGTMScriptLoaded: boolean;
  isNewSDK: boolean;
  consents: Array<Consent>;
  ucInitialized: boolean;
}

export interface CookiesPlugin {
  allConsentsAccepted: ComputedRef<boolean>;
  ucInitialized: Ref<boolean>;
  acceptAllCookies: () => void;
  install: (app: App) => void;
}
