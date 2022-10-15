import { inject } from 'vue';
import sanitizeHtml from 'sanitize-html';

export const sanitizerSymbol = Symbol();

export function useSanitizer() {
  const sanitizer = inject(sanitizerSymbol);
  if (!sanitizer) throw new Error('No Sanitizer provided!!!');

  return sanitizer;
}

export function createSanitizer(options = {}) {
  const sanitize = (dirty, opts = null) => sanitizeHtml(dirty, opts || options);

  const $sanitizer = {
    options,
    sanitize,
    install(app) {
      app.__VUE_SANITIZER_SYMBOL__ = sanitizerSymbol;
      app.provide(sanitizerSymbol, $sanitizer);

      Object.defineProperty(app.config.globalProperties, '$sanitizer', {
        get() {
          return $sanitizer;
        },
      });
    },
  };

  return $sanitizer;
}
