export enum CarFinderDetailsRefs {
  HEADER = '.ContentWrapper__Container-sc-1lh1ldf-0',
  FOOTER = '.Footer__FooterContainer-sc-1damr11-0',
};

export const CAR_FINDER_IMAGES_SOURCES = [
  { width: 410, breakpoint: 480 },
  { width: 645, breakpoint: 759 },
  { width: 850, breakpoint: 1000 },
  { width: 1300, breakpoint: 1300 },
  { width: 1100, breakpoint: 1760 },
  { width: 1275, breakpoint: 1920 },
  { width: 320, breakpoint: 1920 },
];

export const MODULE_PREFIX = 'Car-Finder';

export enum AnalyticsEvents {
  CARFINDER_LOAD = 'PAGDWaaS_M29CarFinder_Load',
  CARFINDER_CARD_CLICK = 'PAGDWaaS_M29CarFinderCarCard_Click',
  CARFINDER_IMAGE_CLICK = 'PAGDWaaS_M29CarFinderImage_Click',
  CARFINDER_PRICE_CLICK = 'PAGDWaaS_M29CarFinderPrice_Click',
  CARFINDER_DETAILS_CLICK = 'PAGDWaaS_M29CarFinderDetails_Click',
  CARFINDER_FILTER_CONDITION_CLICK =
    'PAGDWaaS_M29CarFinderFilterCondition_Click',
  CARFINDER_FILTER_MODEL_CLICK = 'PAGDWaaS_M29CarFinderFilterModel_Click',
  CARFINDER_EMPTY_STATE_LOAD = 'PAGDWaaS_M29CarFinderEmptyState_Load',
  CARFINDER_ERROR_STATE_LOAD = 'PAGDWaaS_M29CarFinderErrorState_Load',
};
