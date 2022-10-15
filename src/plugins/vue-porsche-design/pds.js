import { inject, ref } from 'vue';
import { load, componentsReady } from '@porsche-design-system/components-js';

import * as utilities from '@porsche-design-system/utilities';

export const pdsSymbol = Symbol();

export function usePDS() {
  const pds = inject(pdsSymbol);
  if (!pds) throw new Error('No PDS provided!!!');

  return pds;
}

export function createPDS(options = {}) {
  const isPDSLoaded = ref(false);

  async function initializeComponentAfterPds() {
    try {
      await componentsReady();
      isPDSLoaded.value = true;
      console.info('[DwaaS] PDS components ready!');
    } catch (error) {
      console.error('[DwaaS] - There was an error loading PDS components');
    }
  }

  const $pds = {
    options,
    isPDSLoaded,
    utilities,
    componentsReady,
    install(app) {
      load();

      initializeComponentAfterPds();
      app.__VUE_PDS_SYMBOL__ = pdsSymbol;
      app.provide(pdsSymbol, $pds);
      app.config.globalProperties.$pds = $pds;
      app.config.compilerOptions.isCustomElement = (tag) =>
        tag.startsWith('p-');

      Object.defineProperty(app.config.globalProperties, '$pds', {
        get() {
          return $pds;
        },
      });
    },
  };

  return $pds;
}
