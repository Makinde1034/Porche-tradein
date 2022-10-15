import { Component } from 'vue';
import { UserCentrics, IGlobalConsent } from './usercentrics';
import { GlobalDataLayer } from './';

export {};

export type DwaasComponent = {
  default: Component;
};

export interface DwaasMedia {
  url: string;
  height: number;
  width: number;
  alt?: string;
}

export interface DwaasLink {
  href: string;
  target?: string;
}

export interface CookiesContent {
  heading: string;
  agreeButton: string;
  showButton: string;
}

export interface CookiesOverlay {
  image: DwaasMedia;
  showButton: DwaasLink;
  cookies: CookiesContent;
}

export interface PageInfo {
  applicationId: string;
  country: string;
  environment: string;
  country: string;
  currency: string;
  language: string;
  organization: string;
  gdlEnvironment: string;
  hasForms: boolean;
}

interface EntryManifestMain {
  entry: string;
  css?: string[];
  preload: string[];
}

interface EntryManifestPds {
  meta: string;
  loader: string;
  styles: string;
  fonts: string;
  fontLinks?: string[];
  chunks: string[];
}

interface EntryManifestBrowser {
  banner: any;
  fallbackScript?: string;
  overlay: any;
}

export interface EntryManifest {
  main: EntryManifestMain;
  pds: EntryManifestPds;
  browser: EntryManifestBrowser;
}

/**
 * Function
 */
export type Fn<T = void> = () => T;

declare global {
  interface Window {
    usercentrics?: UserCentrics;
    GlobalConsent?: IGlobalConsent;
    oneGa: any;
    gdl?: GlobalDataLayer;
    PAGEINFO?: PageInfo;
    dwaas?: { partner: unknown };
    isGoogleMapsApiInjected?: boolean;
    google?: google.maps;
    mapApiInitialized?: false | Fn<boolean>;
    fireFormEvent: (eventName: string, domElement: HTMLElement) => void;
  }
}
