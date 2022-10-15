<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useBootstrapper } from '/@/composables';

export default {
  name: 'DwaasActionBar',
  setup() {
    const { el } = useBootstrapper();
    const isSticky = ref(false);

    function handleScroll() {
      const stickyElementOffset = el.value.getBoundingClientRect();

      isSticky.value = stickyElementOffset.top <= 1;
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      el,
      isSticky,
    };
  },
};
</script>

<template>
  <!-- This additional div allows to maintain the value of the stickyElementOffset -->
  <div ref="el">
    <div class="action-bar" :class="{ 'action-bar--sticky': isSticky }">
      <div class="action-bar__flex-container">
        <slot />
        <p-divider class="action-bar__divider-horizontal"></p-divider>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasActionBar.scss"></style>
