export const GOOGLE_MAP_CONFIG = {
  mapTypeId: 'roadmap',
  zoom: 4,
  center: {
    lat: 0,
    lng: 0,
  },
};

export const GOOGLE_PANORAMA_CONFIG = {
  zoom: 1,
  streetViewControl: true,
  pov: {
    heading: 0,
    pitch: 0,
  },
};

export const GOOGLE_MAP_ZOOM_LEVEL = 14;

export const GOOGLE_MAP_OVERLAY_BG_SOURCES = [
  { width: 760, breakpoint: 760 },
  { width: 1000, breakpoint: 1000 },
  { width: 650, breakpoint: 1300 },
  { width: 880, breakpoint: 1300 },
  { width: 1100, breakpoint: 1760 },
  { width: 960, breakpoint: 1920 },
  { width: 960, breakpoint: 1920 },
];
