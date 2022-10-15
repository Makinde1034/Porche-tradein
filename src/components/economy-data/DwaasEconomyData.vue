<script setup lang="ts">
import { computed } from 'vue';
import { useBootstrapper } from '/@/composables';
import { EconomyData } from '/@/types/models';

const props = defineProps<{
  models: Array<EconomyData>
  series: Array<EconomyData>;
  ranges: Array<EconomyData>;
}>();
const { el } = useBootstrapper();

const economyArray = computed(() => [
  ...props.models,
  ...props.series,
  ...props.ranges,
]);
</script>
<template>
  <div ref="el" class="economy-data">
    <p-content-wrapper width="basic">
      <p-grid class="economy-data__grid">
        <template v-for="(item, $index) of economyArray" :key="$index">
          <dwaas-economy-data-item v-bind="item" />
        </template>
      </p-grid>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasEconomyData.scss"></style>
