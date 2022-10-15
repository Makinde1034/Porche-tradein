export interface Consent {
  action: string;
  categorySlug: string;
  consentStatus: boolean;
  controllerId: string;
  defaultConsentStatus: boolean;
  consentStatus: boolean;
  description: string;
  isDeactivated: boolean;
  isHidden: boolean;
  isShared: boolean;
  processorId: string;
  subConsents: Consent[];
  templateId: string;
  unsavedConsentStatus: boolean;
  updatedBy: string;
  version: string;
}

export interface UserCentrics {
    appLoaded: boolean;
    baseUrl: string;
    settingsIds: string;
    settingsId: string;
    version: string;
    consents: Consent[];
    categories: [];
    consentTemplates: any;
    settingsVersion: string;
    appVersion: string;
    settings: any;
    isInitialized: boolean;
    acceptAllConsentsAndCloseInitialView(): void,
    getConsents(firstArgument?: string): Consent | Consent[],
    updateConsents(consents: Array<{ templateId: string, status: boolean}>)
    toggleCenteredModalIsVisible(firstArgument: boolean)
}

export interface IGlobalConsent {
  Processor: {
    sitecore: string,
    googleMaps: string,
    webanalytics: string,
    youtubeVideo: string,
    facebookVideos: string,
    facebookSocialplugins: string,
    twitterPlugin: string,
    twitterAdvertising: string,
  }
  NewModalSDK: boolean
  SettingsId: string
  consentExpire: string,
  gtmcode: string,
}

