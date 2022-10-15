export const getBreakpoint = () => {
  const { innerWidth } = window;

  if (innerWidth < 480) {
    return 'xs';
  } else if (innerWidth < 760) {
    return 's';
  } else if (innerWidth < 1000) {
    return 'm';
  } else if (innerWidth < 1300) {
    return 'l';
  } else if (innerWidth < 1760) {
    return 'xl';
  } else if (innerWidth < 1920) {
    return 'xxl';
  }
};

export const getBreakpointWidth = (): string => {
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
  } else {
    return '760';
  }
};

export const isMobile = (breakpoints: string[]) => {
  return breakpoints.includes(getBreakpoint() as string);
};

export const isDefined = <T = any>(val?: T): val is T =>
  typeof val !== 'undefined';

export const isArray = (a: any) => !!a && a.constructor === Array;
export const isObject = (a: any) => !!a && a.constructor === Object;
export const isEvent = (e: any) => !!e && e.constructor === Event;
export const isPromise = (e: any) => !!e && e.constructor.name === 'Promise';

/**
 * Check if value is empty
 * @param  {Object|Array} entry
 */
export const isEmpty = (
  entry: Array<string | { [key: string]: any }> | { [key: string]: any }
) => {
  if (isArray(entry)) {
    return entry.length <= 0;
  }
  if (isObject(entry)) {
    return Object.entries(entry).length <= 0;
  }
};
