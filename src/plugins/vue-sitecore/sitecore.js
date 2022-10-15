/* eslint-disable no-undef */
import { inject, createApp } from 'vue';
import { registerComponents } from '/@/registerComponents';
import { registerPlugins } from '/@/registerPlugins';
import { VueMasonryCSS } from '/@/plugins';

import { showFormsContainer, useSitecoreForms } from './forms';

import { unregisterServiceWorker } from '/@/registerServiceWorker';

const env = process.env.NODE_ENV || 'development';

export const sitecoreSymbol = Symbol();

export function useSitecore() {
  const sitecore = inject(sitecoreSymbol);
  if (!sitecore) throw new Error('No Sitecore provided!!!');

  return sitecore;
}

export function createSitecore() {
  const $sitecore = {
    install(app) {
      if ('serviceWorker' in navigator && env === 'production') {
        unregisterServiceWorker();
      }

      // Are we on Experience Editor?
      if (typeof Sitecore !== 'undefined') {
        if (typeof Sitecore.PageModes.ChromeTypes !== 'undefined') {
          // extend the Sitecore placeholder chrome type
          Sitecore.PageModes.ChromeTypes.Placeholder =
            Sitecore.PageModes.ChromeTypes.Placeholder.extend(
              {
                insertRendering(data, openProperties) {
                  // call the base insertRendering() before processing
                  this.base(data, openProperties);

                  const insertedSection = data.content[1];

                  setTimeout(() => {
                    // check if forms inserted & make visible
                    showFormsContainer();

                    const componentApp = createApp({});

                    registerPlugins(componentApp);

                    componentApp.use(VueMasonryCSS);

                    registerComponents(componentApp);

                    componentApp.mount(`[id="${insertedSection.id}"]`);

                    // reset the chrome in Experience Editor after the Vue rendering pipeline is complete
                    Sitecore.PageModes.ChromeManager.resetChromes();
                  }, 500);
                },
              },
              {
                emptyLookFillerCssClass:
                  Sitecore.PageModes.ChromeTypes.Placeholder
                    .emptyLookFillerCssClass,
                getDefaultAjaxOptions:
                  Sitecore.PageModes.ChromeTypes.Placeholder
                    .getDefaultAjaxOptions,
              }
            );
        }
      }

      useSitecoreForms(app);

      app.__VUE_SITECORE_SYMBOL__ = sitecoreSymbol;
      app.provide(sitecoreSymbol, $sitecore);
      app.config.globalProperties.$sitecore = $sitecore;

      Object.defineProperty(app.config.globalProperties, '$sitecore', {
        get() {
          return $sitecore;
        },
      });
    },
  };

  return $sitecore;
}
