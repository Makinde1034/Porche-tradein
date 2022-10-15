import {
  EventPropertyInterface,
  GlobalDataLayer,
} from '@porsche/globaldatalayer';
import { PageInfo } from '/@/types';
import { App, Plugin } from 'vue';

export enum GDLClickEventTypes {
  BUTTON = 'button',
  LINK = 'link',
  TOGGLE = 'toggle',
  TAB = 'tab',
  NAVIGATION = 'navigation',
  IMAGE = 'image',
  VIDEO = 'video',
}

export const GDLTargetUrlType = {
  OUTBOUND: 'outbound',
  INTERNAL: 'internal',
  ANCHOR: 'anchor',
};

export interface GDLEventOptions {
  itemTargetUrl: string;
  componentPrefix: GDLModulePrefix;
  clickElementName?: string;
  itemName: string;
  clickElementType: GDLClickEventTypes;
  targetUrl?: string;
}

export interface GDLEvent {
  clickElementType: GDLClickEventTypes;
  clickElementName?: string;
  targetUrl: string;
}

export interface GDLNavigationEvent {
  itemId: string;
  itemName?: string;
  itemLevel: string;
  itemTargetUrl: string;
}

export interface GDLEventData {
  componentClick: Partial<GDLEvent>;
}

export interface GDLPluginOptions {
  applicationId?: string;
}

export interface GDLPlugin {
  prefix: string;
  gdl: GlobalDataLayer;
  options: GDLPluginOptions;
  pushGdlEvent: (
    eventName: string,
    e: Event,
    componentPrefix: GDLModulePrefix
  ) => void;
  pushCustomGdlEvent: (eventName: string, data: EventPropertyInterface) => void;
  componentClickEvent: (
    { currentTarget }: Event, // event
    options?: GDLEventOptions
  ) => GDLEvent;
  componentNavigationEvent: (
    { currentTarget }: Event,
    options: Partial<GDLEventOptions>
  ) => GDLNavigationEvent;
  install: (app: App) => void;
}

// If your module is not available here or hasn't being created, please add it
export type GDLModulePrefix =
  | 'Action-Bar'
  | 'Car-Finder'
  | 'Live-Chat'
  | 'Configuration-Teaser'
  | 'Contact-Details'
  | 'Embedded-Video'
  | 'External-Links'
  | 'Finder-Teaser'
  | 'Footer-Navigation'
  | 'Social-Network-Links'
  | 'OfferTeaser'
  | 'Main-Navigation'
  | 'Call-To-Action'
  | 'Media-Gallery'
  | 'ModelTeaser'
  | 'News-Listing'
  | 'Stage Header'
  | 'TeamSlider'
  | 'Text-Element'
  | 'Text-Picture-Element'
  | 'Car-Inventory';
