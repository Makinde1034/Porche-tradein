export const MODULE_NUMBER = 'M6';
export const MODULE_PREFIX = 'OfferTeaser';

export const MODULE_ANALYTICS_PREFIX = `PAGDWaaS_${MODULE_NUMBER}${MODULE_PREFIX}`;

export const AnalyticsEvents = {
  OFFER_TEASER_LOAD: `${MODULE_ANALYTICS_PREFIX}_Load`,
  OFFER_TEASER_LINK_CLICK: `${MODULE_ANALYTICS_PREFIX}Link_Click`,
};
