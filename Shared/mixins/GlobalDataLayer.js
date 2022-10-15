let _uniqueIdCounter = 0;

function getUniqueId() {
  return _uniqueIdCounter++;
}

/**
 * Use this mixin in Vue if your index.js includes the shared global data layer library and adds the $gdl object
 * to the vue prototype.
 *
 */
export default {
  data() {
    return {
      uniqueViewportTrackerId: null,
      context: {
        moduleId: null,
      },
    };
  },
  methods: {
    /**
     * Push event to the global data layer.
     * @param eventName The name of the pushed event.
     * @param dataObject Additional data for the event.
     */
    invokeAnalyticsEvent(eventName, dataObject = { context: this.context }) {
      if (typeof this.$gdl !== 'undefined') this.$gdl?.push(eventName, dataObject);
    },

    /**
     * Register tracking viewport event into the global data layer.
     * @param moduleId The name of the pushed event.
     * @param dataObject Additional data for the event.
     * @param element DOM element to track viewport to. Default to current module wrapper
     */
    registerTrackViewportEvent(
      moduleId = this.context?.moduleId,
      dataObject = {},
      element = this.$el,
    ) {
      if (element?.nodeType == Node.COMMENT_NODE) return;

      if (!this.$gdl) return;

      const viewportTracker = this.$gdl.getRegisteredExtensionByClassName(
        'ViewportTrackerExtension',
      );
      if (!viewportTracker) return;

      if (this.uniqueViewportTrackerId === null) {
        // Make sure we have a unique id for this instance
        this.uniqueViewportTrackerId = `${moduleId}_vpt${getUniqueId()}`;
      }

      // make sure we override the unique id in the register
      if (!dataObject?.context?.moduleId) {
        dataObject.context = {
          ...dataObject?.context,
          moduleId,
        };
      }

      viewportTracker.registerElement({ el: element, properties: dataObject });
    },

    /**
     * Get component instance position regarding the document.
     * @param className The name of class that wraps up the entire component.
     */
    getComponentPosition(className) {
      let componentList = document.querySelectorAll(`.${className}`);
      if (componentList.length === 0) {
        componentList = document.querySelectorAll(className);
      }

      let position = 0;
      Object.entries(componentList).forEach(([index, moduleInstance]) => {
        if (this.$el === moduleInstance) {
          position = index;
        } else if (this.$el.offsetParent?.firstElementChild === moduleInstance) {
          position = index;
        } else if (this.$el === moduleInstance.shadowRoot?.querySelector(`.${className}`)) {
          position = index;
        }
      });
      return typeof position === 'string' ? parseInt(position) : position;
    },

    /**
     * Generate standardized module id.
     * @param className The name of class that wraps up the entire component.
     */
    getModuleId(className) {
      let moduleId = '';
      const modulePosition = this.getComponentPosition(className);
      if (this.$options.name && typeof this.$options.name === 'string') {
        const moduleName = this.$options.name.toLowerCase();
        moduleId = `s-${moduleName}_${modulePosition}`;
      } else {
        console.info("To get the Id the Vue instance must have the 'name' attribute");
        moduleId = `s-modulenumber_${modulePosition}`;
      }
      return moduleId;
    },

    /**
     * Formats the text with dash and without spaces to be use in the code attributes of the GDL
     * @param text The text to format
     */
    formatTextCode(text) {
      return text.toLowerCase().replaceAll(' ', '-');
    },

    mergeDataLayerPayload(base, other) {
      if (typeof other === 'undefined') {
        return base;
      }

      const resultData = {
        ...base,
        ...other,
      };
      for (const key in resultData) {
        resultData[key] = {
          ...base[key],
          ...other[key],
        };
      }

      return resultData;
    },
  },
};
