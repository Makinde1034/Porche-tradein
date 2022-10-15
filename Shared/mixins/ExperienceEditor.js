/**
 * Vue mixin to check if we are currently in the Sitecore XE.
 * Can be used to toggle functions which should not be or differently executed while in XE.
 */
export default {
  methods: {
    /**
     * Check if we currently in Sitecore XE.
     * @return {boolean} Returns true if Sitecore XE objects are available in window, otherwise false.
     */
    isInExperienceEditor() {
      return (
        typeof Sitecore !== 'undefined' &&
        typeof Sitecore.PageModes !== 'undefined' &&
        typeof Sitecore.PageModes.PageEditor !== 'undefined' &&
        typeof Sitecore.PageModes.PageEditor.ExperienceEditor !== 'undefined'
      );
    },
  },
};
