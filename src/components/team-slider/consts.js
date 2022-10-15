// import { ANALYTICS_PREFIX } from '/@/plugins/vue-gdl/globalDataLayer';

export const MODULE_NUMBER = 'M17';
export const MODULE_PREFIX = 'TeamSlider';

// TODO: re-enable this when analyticis events naming conventions are corrected
// export const MODULE_ANALYTICS_PREFIX = `${ANALYTICS_PREFIX}_${MODULE_NUMBER}${MODULE_PREFIX}`;

export const AnalyticsEvents = {
  TEAM_SLIDER_LOAD: `PAGDWaaS_M17TeamSlider_Load`,
  TEAM_SLIDER_DEPARTMENT_CLICK: `PAGDWaaS_M17TeamSliderDepartment_Click`,
};

export const TEAM_MEMBER_SOURCES = [
  { width: 413, breakpoint: 480 },
  { width: 653, breakpoint: 759 },
  { width: 412, breakpoint: 999 },
  { width: 349, breakpoint: 1300 },
  { width: 325, breakpoint: 1760 },
  { width: 357, breakpoint: 1920 },
  { width: 357, breakpoint: 1920 },
];
