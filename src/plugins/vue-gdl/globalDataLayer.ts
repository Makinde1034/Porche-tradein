/* eslint-disable no-undef */

import { App, inject } from 'vue';
import { isEmpty } from '/@/shared/utils';
import { PageInfo } from '/@/types';

import {
  GlobalDataLayer,
  DefaultWebProperties,
  EventPropertyInterface,
} from '@porsche/globaldatalayer';
import {
  GDLClickEventTypes,
  GDLEvent,
  GDLEventOptions,
  GDLModulePrefix,
  GDLNavigationEvent,
  GDLPlugin,
  GDLPluginOptions,
} from './consts';

export const ANALYTICS_PREFIX = 'PAGDWaaS';

const getDefaultProperties = (options: PageInfo) => {
  const {
    applicationId = options.applicationId || 'dwaas',
    environment = window.PAGEINFO?.gdlEnvironment,
    country = window.PAGEINFO?.country || 'DE',
    currency = window.PAGEINFO?.currency || 'EUR',
    language = window.PAGEINFO?.language || 'de',
    organization = window.PAGEINFO?.organization || 'PD',
  } = options;

  return {
    context: {
      environment,
      applicationId,
      country,
      currency,
      language,
      organization,
    },
    pageExperience: {
      pageName:
        document
          .querySelector("meta[property='og:title']")
          ?.getAttribute('content') || '',
    },
    partner: {
      companyName: window.dwaas?.partner,
    },
  };
};
export const gdlSymbol = Symbol();

export function useGDL(): GDLPlugin {
  const gdl = inject(gdlSymbol);
  if (!gdl) throw new Error('No GDL provided!!!');

  return gdl as GDLPlugin;
}

export function createGDL(options: GDLPluginOptions = {}) {
  const gdl = new GlobalDataLayer();

  gdl.registerExtension(new DefaultWebProperties(gdl));
  const defaultProps = getDefaultProperties(options as PageInfo);

  gdl.setDefaultProperties(
    /^PAGDWaaS_.*/,
    (gdl.ext.DefaultWebProperties as any).with(defaultProps)
  );

  /**
   * Push event to GDL with predefined data properties (componentClick |componentNavigation)
   * @param  {} eventName // name of clickable event (localized)
   * @param  {} e // event itself
   * @param  {} componentPrefix
   */
  const pushGdlEvent = (
    eventName: string,
    e: Event,
    componentPrefix: GDLModulePrefix
  ) => {
    if (e) {
      const data: EventPropertyInterface = {
        componentClick: componentClickEvent(e) as unknown as Record<
          string,
          unknown
        >,
        componentNavigation: componentNavigationEvent(e, {
          componentPrefix,
        }) as unknown as Record<string, unknown>,
      };
      gdl.push(eventName, data);
      return;
    }

    gdl.push(eventName);
  };

  // TODO: Eventually this should replace pushGDLEvent and refacor all analytic dependent components to
  // send the data obj they need using factories below
  const pushCustomGdlEvent = (
    eventName: string,
    data: EventPropertyInterface
  ) => {
    if (isEmpty(data)) {
      gdl.push(eventName);
      return;
    }

    gdl.push(eventName, data);
  };

  /**
   * Factory function to create a GDL event 'componentClick" data object
   * @param  {event} {currentTarget}
   * @param  {options} options
   */
  function componentClickEvent(
    { currentTarget }: Event, // event
    options?: GDLEventOptions //options
  ): GDLEvent {
    const { href, textContent } = currentTarget as HTMLBaseElement;
    return {
      clickElementType:
        options?.clickElementType || href
          ? GDLClickEventTypes.LINK
          : GDLClickEventTypes.BUTTON,
      clickElementName:
        options?.clickElementName || textContent?.trim().replace(/\s\s+/g, ' '),
      targetUrl: options?.targetUrl || href,
    };
  }
  /**
   * Factory function to create a GDL event 'componentNavigation" data object
   * @param  {event} {currentTarget}
   * @param  {options} options
   */
  function componentNavigationEvent(
    { currentTarget }: Event,
    options: Partial<GDLEventOptions> //options
  ): GDLNavigationEvent {
    const { id, href, textContent } = currentTarget as HTMLBaseElement;

    return {
      itemId: `${id} ${options.componentPrefix}`,
      itemName: options?.itemName || textContent?.trim().replace(/\s\s+/g, ' '),
      itemLevel: '1',
      itemTargetUrl: options?.itemTargetUrl || href,
    };
  }

  function formAnalyticsData() {
    // Scrape local storage for form analytics data
    const localStorageData = window.localStorage.getItem('formAnalytics');
    window.localStorage.removeItem('formAnalytics');

    const storage = localStorageData ? JSON.parse(localStorageData) : null;

    // Check if redirect from form
    if (storage?.formData && storage.referrer == document.referrer) {
      return storage.formData;
    }
    return null;
  }

  const $gdl: GDLPlugin = {
    options,
    prefix: ANALYTICS_PREFIX,
    gdl,
    pushGdlEvent,
    pushCustomGdlEvent,
    componentClickEvent,
    componentNavigationEvent,
    install(app: App) {
      app.provide(gdlSymbol, $gdl);
      app.config.globalProperties.$gdl = $gdl;
      window.gdl = gdl;

      pushCustomGdlEvent('PAGDWaaS_General_Pageload', formAnalyticsData());
    },
  };

  return $gdl;
}
