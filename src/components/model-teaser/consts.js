// import { ANALYTICS_PREFIX } from '/@/plugins/vue-gdl/globalDataLayer';

export const MODULE_NUMBER = 'M20';
export const MODULE_PREFIX = 'ModelTeaser';

// TODO: re-enable this when analyticis events naming conventions are corrected
// export const MODULE_ANALYTICS_PREFIX = `${ANALYTICS_PREFIX}_${MODULE_NUMBER}${MODULE_PREFIX}`;

export const AnalyticsEvents = {
  MODEL_TEASER_CTA_CLICK: `PAGDWaaS_M20ModelTeaserCallToAction_Click`,
};

export const MODEL_TEASER_CARD_SOURCES = [
  { width: 480, breakpoint: 480 },
  { width: 760, breakpoint: 760 },
  { width: 1000, breakpoint: 1000 },
  { width: 870, breakpoint: 1300 },
  { width: 1180, breakpoint: 1760 },
  { width: 960, breakpoint: 1920 },
  { width: 960, breakpoint: 1920 },
];
