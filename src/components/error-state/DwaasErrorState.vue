<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';

const props = {
  title: String,
  text: String,
  previousCTA: String,
  refreshCTA: String,
};

export default {
  name: 'DwaasErrorState',
  props,
  emits: ['load'],
  setup(_props, { emit }) {
    const { el } = useBootstrapper();

    function goBack() {
      window.history.back();
    }

    function refresh() {
      window.history.go();
    }

    onMounted(() => {
      emit('load');
    });

    return { el, goBack, refresh };
  },
};
</script>
<template>
  <div ref="el" class="error-state">
    <p-headline variant="headline-2" class="error-state__headline">
      {{ title }}
    </p-headline>
    <p-text class="error-state__text">{{ text }}</p-text>
    <!--   <p-button-group class="error-state__actions">
      <p-button variant="secondary" @click="refresh">{{ refreshCTA }}</p-button>
      <p-button variant="tertiary" @click="goBack">{{ previousCTA }}</p-button>
    </p-button-group> -->
  </div>
</template>

<style lang="scss" src="./DwaasErrorState.scss"></style>
