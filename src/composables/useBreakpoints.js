import { useBreakpoints as VueUseBreakpoints } from '@vueuse/core';

const breakpointSizes = {
  xxs: 0,
  xs: 480,
  sm: 760,
  md: 1000,
  lg: 1300,
  xl: 1760,
  '2xl': 1920,
};
const breakpoints = VueUseBreakpoints(breakpointSizes);

export function useBreakpoints() {
  const isMobile = breakpoints.smaller('md');

  const isNavigationMobile = breakpoints.smaller('lg');

  const isDesktop = breakpoints.greater('md');

  return {
    isMobile,
    isDesktop,
    breakpoints,
    isNavigationMobile,
    breakpointSizes,
  };
}
