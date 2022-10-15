/* eslint-disable id-length */
export default {
  debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  },
};

export const getBreakpointWidth = () => {
  const { innerWidth } = window;

  if (innerWidth < 480) {
    return '480';
  } else if (innerWidth < 760) {
    return '760';
  } else if (innerWidth < 1000) {
    return '1000';
  } else if (innerWidth < 1300) {
    return '1300';
  } else if (innerWidth < 1760) {
    return '1760';
  } else if (innerWidth < 1920) {
    return '1920';
  }
};

// ==========================================================================
// Browser sniffing
// Unfortunately, due to mixed support, UA sniffing is required
// ==========================================================================
export const browser = {
  isIE: Boolean(window.document.documentMode),
  isEdge: navigator.userAgent.includes('Edge'),
  isWebkit:
    'WebkitAppearance' in document.documentElement.style && !/Edge/.test(navigator.userAgent),
  isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
  isIos:
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
    /(iPad|iPhone|iPod)/gi.test(navigator.platform),
  isFbInAppBrowser: /FBAN|FBAV|FBIOS|FB_IAB/gi.test(navigator.userAgent),
  isInstagramInAppBrowser: /Instagram/gi.test(navigator.userAgent),
  get isiOSorInApp() {
    return this.isFbInAppBrowser || this.isInstagramInAppBrowser || this.isIos;
  },
  isAndroid: /Android/i.test(navigator.userAgent),
  isBot: /Googlebot|Pinterestbot|Applebot|bingbot/gi.test(navigator.userAgent),
  isWindowInactive:
    document.hidden || document.msHidden || document.webkitHidden || document.mozHidden,
  fromExternal: !document.referrer?.startsWith(window.location.origin),
};

/**
 * adds the device pixel ratio to the width to get the correct image width
 * for the current screen. Please note, that a dpr bigger then 2 should not
 * be used, as this will not be observable by the human eye.
 * @param {Number} baseImageWidth
 */
export const getImageWidthByScreenType = (baseImageWidth) => {
  if (!('devicePixelRatio' in window)) return baseImageWidth;

  const MAX_DPR = 2;
  const devicePixelRatio = Math.min(window.devicePixelRatio, MAX_DPR);

  return baseImageWidth * Math.floor(devicePixelRatio);
};
