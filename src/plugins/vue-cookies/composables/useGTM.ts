// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// TODO: Check if there is a typescript version of this
import { ref } from 'vue';

const isGTMScriptLoaded = ref(false);

export function useGTM() {
  function setGTM() {
    if (window.GlobalConsent?.gtmcode && !isGTMScriptLoaded.value) {
      window.oneGa = window.oneGa || [];
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s);
        const dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'oneGa', window.GlobalConsent.gtmcode);

      isGTMScriptLoaded.value = true;
    }
  }

  return {
    isGTMScriptLoaded,
    setGTM,
  };
}
