const isProd = process.env.NODE_ENV === 'production';

const logPrefix = '[DwaaS] -';

export function useLogger() {
  function logError(message, value) {
    if (!isProd) {
      console.error(`${logPrefix} ${message}`, value);
    }
  }

  function logWarning(message, value) {
    if (!isProd) {
      console.warn(`${logPrefix} ${message}`, value);
    }
  }

  function logInfo(name, value) {
    if (!isProd) {
      console.info(`${logPrefix} - ${name}:`, value);
    }
  }

  function logMessage(name, value) {
    if (!isProd) {
      console.log(`${logPrefix} - ${name}:`, value);
    }
  }

  return {
    logError,
    logWarning,
    logMessage,
    logInfo,
  };
}
