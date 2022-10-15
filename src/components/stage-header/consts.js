// import { ANALYTICS_PREFIX } from '/@/plugins/vue-gdl/globalDataLayer';

export const MODULE_NUMBER = 'M3';
export const MODULE_PREFIX = 'Stage Header';

// TODO: re-enable this when analyticis events naming conventions are corrected
// export const MODULE_ANALYTICS_PREFIX = `${ANALYTICS_PREFIX}_${MODULE_NUMBER}${MODULE_PREFIX}`;

export const AnalyticsEvents = {
  STAGE_HEADER_LOAD: 'PAGDWaaS_M3StageHeader_Load',
  STAGE_HEADER_RIGHT_CLICK: 'PAGDWaaS_M3StageHeaderRight_Click',
  STAGE_HEADER_LEFT_CLICK: 'PAGDWaaS_M3StageHeaderLeft_Click',
  STAGE_HEADER_INDICATOR_CLICK: 'PAGDWaaS_M3StageHeaderIndicator_Click',
  STAGE_HEADER_LINK_CLICK: 'PAGDWaaS_M3StageHeaderLink_Click',
};

export const CarouselTypes = {
  DEFAULT: 'default',
  SLIM: 'slim',
};

export const STAGE_HEADER_SOURCES = [
  { width: 480, breakpoint: 480 },
  { width: 759, breakpoint: 759 },
  { width: 1000, breakpoint: 1000 },
  { width: 1300, breakpoint: 1300 },
  { width: 1760, breakpoint: 1760 },
  { width: 1920, breakpoint: 1920 },
];