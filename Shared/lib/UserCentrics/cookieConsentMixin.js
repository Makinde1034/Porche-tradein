export default {
  created() {
    window.addEventListener('ucInitializationEvent', this.dispatchEvent, false);
    window.addEventListener('ucEvents', this.dispatchEvent, false);
  },
  methods: {
    dispatchEvent(event) {
      this.$emit('userCentricsInitialized', event);
    },
  },
};
