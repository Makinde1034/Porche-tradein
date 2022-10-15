export const CAR_INVENTORY_SOURCES = [
  { width: 320, breakpoint: 320 },
  { width: 640, breakpoint: 640 },
  { width: 960, breakpoint: 960 },
  { width: 1280, breakpoint: 1300 },
  { width: 1600, breakpoint: 1760 },
  { width: 1920, breakpoint: 1920 },
];

export const MODULE_PREFIX = 'Car-Inventory';

export enum AnalyticsEvents {
  CARINVENTORY_LOAD = 'PAGDWaaS_M34CarIventory_Load',
  CARINVENTORY_EMPTY_STATE_LOAD = 'PAGDWaaS_M34CarInventoryEmptyState_Load',
  CARINVENTORY_ERROR_STATE_LOAD = 'PAGDWaaS_M34CarInventoryErrorState_Load',
  CARINVENTORY_CARD_CLICK = 'PAGDWaaS_M34CarInventoryCarCard_Click',
  CARINVENTORY_IMAGE_CLICK = 'PAGDWaaS_M34CarInventoryImage_Click',
  CARINVENTORY_PRICE_CLICK = 'PAGDWaaS_M34CarInventoryPrice_Click',
  CARINVENTORY_DETAILS_CLICK = 'PAGDWaaS_M34CarInventoryDetails_Click',
};

export enum NAVIGATION_ELEMENTS {
  next = '.car-inventory__button-next',
  prev = '.car-inventory__button-prev',
};
