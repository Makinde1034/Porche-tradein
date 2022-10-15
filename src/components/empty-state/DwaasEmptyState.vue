<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';

const props = {
  title: String,
  text: String,
  previousCTA: String,
};

export default {
  name: 'DwaasEmptyState',
  props,
  emits: ['load'],
  setup(_props, { emit }) {
    const { el } = useBootstrapper();

    function goBack() {
      window.history.back();
    }

    onMounted(() => {
      emit('load');
    });

    return { el, goBack };
  },
};
</script>
<template>
  <div ref="el" class="empty-state">
    <p-headline variant="headline-2" class="empty-state__headline">
      {{ title }}
    </p-headline>
    <p-text class="empty-state__text">{{ text }}</p-text>
    <!--  <p-button-group class="empty-state__actions">
      <p-button variant="tertiary" @click="goBack">{{ previousCTA }}</p-button>
    </p-button-group> -->
  </div>
</template>

<style lang="scss" src="./DwaasEmptyState.scss"></style>
