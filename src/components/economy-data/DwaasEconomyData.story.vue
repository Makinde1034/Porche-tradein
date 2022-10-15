<script setup lang="ts">
import { reactive } from 'vue';
import economyDataData from './__fixtures/economy-data.json';
const state = reactive(economyDataData);
</script>
<template>
  <Story title="v2/modules/EconomyData" icon="ion:car-sport">
    <dwaas-economy-data
      :models="state.models"
      :series="state.series"
      :ranges="state.ranges"
    ></dwaas-economy-data>
  </Story>
</template>
