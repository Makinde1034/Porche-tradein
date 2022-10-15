class CookieConsent {
  /**
   * The configuration field to used internal.
   * @type {Partial<UcConfig> | UcConfig}
   * @private
   */
  _config = {};
  /**
   * Create a new instance to handle Cookie Consent with UserCentrics.
   * @param {Partial<UcConfig> | UcConfig} config A configuration object for initializing this instance.
   */
  constructor(config = null) {
    if (config) {
      Object.assign(this._config, config);
    } else {
      this._config = ucConfig || {};
    }
    window.addEventListener('ucEvents', this._handleUserCentricsEvents.bind(this), false);
  }
  /**
   * Return the current existing instance or null of non existing found.
   * @return {CookieConsent|null}
   */
  getInstance() {
    return window.ucConfig || null;
  }
  /**
   * Check if the user centrics scripts are loaded and ready to use.
   * @return {boolean}
   */
  isUserCentricsLoaded() {
    return typeof window.usercentrics !== 'undefined' && window.usercentrics.isInitialized;
  }
  /**
   * Check if dc is active.
   * @return {boolean} Return true when active, otherwise false.
   */
  isConsentActive() {
    return this._config.dcActive || false;
  }
  /**
   * Get the text for the read more label.
   * @return {string}
   */
  getReadMoreLabelText() {
    return this._config.readMoreLabelText || 'read more';
  }
  /**
   * Get the current status of the consent by id.
   * @param dataProcessorId The data processor id to look up for.
   * @return {boolean}
   */
  getConsentStatus(dataProcessorId) {
    try {
      return window.usercentrics.getConsents(dataProcessorId).consentStatus;
    } catch {
      return false;
    }
  }

  getConsent(dataProcessorId, callback) {
    if (this.isUserCentricsLoaded()) {
      const consentStatus = window.usercentrics.getConsents(dataProcessorId);
      if (callback) callback(consentStatus);
    }
  }

  /**
   * Handles the UC Events. Will use callback function for different layers if provided.
   * @param {ucEvent} event The event arguments passed in by UC.
   * @private
   */
  _handleUserCentricsEvents(ucEvent) {
    const { element, event } = ucEvent.data;
    if (event !== 'ui_changed' || typeof this._config.callbacks === 'undefined') return;
    switch (element) {
      case 'firstLayer':
        debounced(100, this._config.callbacks.firstLayer(ucEvent.data));
        break;
      case 'secondLayer':
        debounced(100, this._config.callbacks.secondLayer(ucEvent.data));
        break;
    }
  }
}
/**
 * Helper function to debounce a function call or event
 * @param {number} delay The delay in ms to debounce to.
 * @param {Function | void | function(...[*]): any} fn The function to call after debounce.
 * @return {function(...[*]): void}
 */
const debounced = (delay, callback) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, delay);
  };
};
export default CookieConsent;
