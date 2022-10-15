<script setup lang="ts">
import { reactive } from 'vue';
import modelTeaserData from './__fixtures/model-teaser.json'
const state = reactive(modelTeaserData)
</script>
<template>
  <Story title="v2/modules/ModelTeaser" icon="ion:car-sport">
    <Variant title="ModelTeaserCard">
      <dwaas-model-teaser-card :title="state.models[0].title" :description="state.models[0].description"
        :images="state.models[0].images" :buttons="state.models[0].buttons" :price="state.models[0].price">
      </dwaas-model-teaser-card>
    </Variant>
    <Variant title="ModelTeaser">
      <dwaas-model-teaser :headline="state.headline" :models="state.models">
      </dwaas-model-teaser>
    </Variant>
  </Story>
</template>