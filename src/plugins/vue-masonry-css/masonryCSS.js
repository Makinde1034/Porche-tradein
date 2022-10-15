import { inject } from 'vue';
import DWaaSMasonryCSS from './DWaaSMasonryCSS.vue';
const componentName = 'dwaas-masonry';
// Create masonry Symbol
export const dwaasMasonryCSSSymbol = Symbol();

export function useMasonryCSS() {
  const masonryCSS = inject(dwaasMasonryCSSSymbol);
  if (!masonryCSS) throw new Error('No DwaaSMsonryCSS provided!!!');

  return masonryCSS;
}

export function createMasonryCSS() {
  const $dwaasMasonryCSS = {
    install(app) {
      // Define the component property
      app.component(componentName, DWaaSMasonryCSS);
      // Plugin
      app.__VUE_MASONRY_CSS_SYMBOL__ = dwaasMasonryCSSSymbol;
      app.provide(dwaasMasonryCSSSymbol, $dwaasMasonryCSS);

      Object.defineProperty(app.config.globalProperties, '$dwaasMasonryCSS', {
        configurable: true,
        get() {
          return $dwaasMasonryCSS;
        },
      });
    },
  };

  return $dwaasMasonryCSS;
}
