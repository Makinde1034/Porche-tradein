<script setup lang="ts">
const props = defineProps<{
  icon: string;
  value: string;
  unit: string | number;
}>();
</script>
<template>
  <div class="economy-data-info">
    <p-icon class="economy-data-info__icon" size="small" :name="icon" />
    <div class="economy-data-info__label">
      <p-text size="small" class="economy-data-info__value">{{ value }}</p-text>
      <p-text size="x-small" class="economy-data-info__unit">{{ unit }}</p-text>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasEconomyDataInfo.scss"></style>
