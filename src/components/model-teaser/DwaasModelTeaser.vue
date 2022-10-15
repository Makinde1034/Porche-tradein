<script>
import { useBootstrapper } from '/@/composables';
import DwaasModelTeaserCard from './DwaasModelTeaserCard.vue';

const props = {
  headline: {
    type: String,
    default: '',
  },
  models: {
    type: Array,
    default: () => [],
  },
};

const components = {
  DwaasModelTeaserCard,
};

export default {
  name: 'DwaasModelTeaser',
  components,
  props,
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>

<template>
  <section ref="el" class="model-teaser">
    <div class="model-teaser__headline-wrapper">
      <p-headline variant="headline-2">
        {{ headline }}
      </p-headline>
    </div>
    <div class="model-teaser__cards-wrapper">
      <DwaasModelTeaserCard
        v-for="(model, key) in models"
        :key="key"
        :title="model.title"
        :description="model.description"
        :images="model.images"
        :buttons="model.buttons"
        :price="model.price"
      ></DwaasModelTeaserCard>
    </div>
  </section>
</template>

<style lang="scss" src="./DwaasModelTeaser.scss"></style>
