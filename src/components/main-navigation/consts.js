// import { ANALYTICS_PREFIX } from '/@/plugins/vue-gdl/globalDataLayer';

export const MODULE_NUMBER = 'M1';
export const MODULE_PREFIX = 'Main-Navigation';

// TODO: re-enable this when analyticis events naming conventions are corrected
// export const MODULE_ANALYTICS_PREFIX = `${ANALYTICS_PREFIX}_${MODULE_NUMBER}${MODULE_PREFIX}`;

export const AnalyticsEvents = {
  NAVIGATION_LOAD: 'PAGDWaaS_M1Navigation_Load',
  NAVIGATION_LOGO_CLICK: 'PAGDWaaS_M1Crest_Click',
  NAVIGATION_ITEM_CLICK: 'PAGDWaaS_M1NavigationTextItem_Click',
  NAVIGATION_MOBILE_LOAD: 'PAGDWaaS_M1NavigationMobile_Load',
  NAVIGATION_MOBILE_CLOSE: 'PAGDWaaS_M1NavigationMobileClose_Click',
  NAVIGATION_FLYOUT_OPEN: 'PAGDWaaS_M1DealerDetailsFlyout_Load',
  NAVIGATION_FLYOUT_BACK: 'PAGDWaaS_M1DealerDetailsFlyoutBack_Click',
  NAVIGATION_FLYOUT_CLOSE: 'PAGDWaaS_M1DealerDetailsFlyoutClose_Click',
  NAVIGATION_FLYOUT_CLICK: 'PAGDWaaS_M1DealerDetailsFlyout_Click',
  NAVIGATION_FLYOUT_LOCATION_CLICK: 'PAGDWaaS_M1DealerDetailsFlyoutLocation_Click',
  NAVIGATION_FLYOUT_PHONE_CLICK: 'PAGDWaaS_M1DealerDetailsFlyoutPhone_Click',
  NAVIGATION_FLYOUT_EMAIL_CLICK: 'PAGDWaaS_M1DealerDetailsFlyoutMail_Click',
};
