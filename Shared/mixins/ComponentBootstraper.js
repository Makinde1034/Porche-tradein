/**
 * Vue mixin to initialize.
 * Can be used to toggle functions which should not be or differently executed while in XE.
 */
export default {
  methods: {
    initializeComponent() {
      const parent = this.$el?.offsetParent;
      if (parent && parent.classList) {
        parent.classList.remove('unloaded');
      }
    },
  },
};
