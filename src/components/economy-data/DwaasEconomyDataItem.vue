<script setup lang="ts">
const props = defineProps<{
  label: string;
  consumption: {
    value: string;
    unit: string;
    formattedValue: string;
    label: string;
  };
  emission: {
    min: string | number;
    max: string | number;
    unit: string;
    formattedValue: string;
  };
  econsumption: {
    value: string;
    unit: string;
    formattedValue: string;
    label: string;
  };
  efficiency: {
    value: string;
    image: string;
    label: string;
  };
}>();
</script>
<template>
  <p-grid-item size="{ base: 12, s: 6, m: 4 }" class="economy-data__grid--item">
    <VMenu
      :auto-hide="false"
      placement="top-start"
      :delay="{ show: 0, hide: 50 }"
      handle-resize
    >
      <button role="button" tabindex="0" class="economy-data__button">
        <p-text
          size="small"
          color="neutral-contrast-medium"
          class="economy-data__heading"
        >
          {{ label }}</p-text
        >
        <div class="economy-data__items">
          <dwaas-economy-data-info
            v-if="consumption.value"
            icon="fuel-station"
            :value="consumption.value"
            :unit="consumption.unit"
          />
          <dwaas-economy-data-info
            v-if="emission.min"
            icon="co2-emission"
            :value="`${emission.max} - ${emission.min}`"
            :unit="emission.unit"
          />
          <dwaas-economy-data-info
            v-if="econsumption.value"
            icon="plug"
            :value="econsumption.value"
            :unit="econsumption.unit"
          />
        </div>
      </button>
      <template #popper>
        <div class="economy-data-popup">
          <button v-close-popper class="economy-data-popup__close">
            <p-icon
              v-if="consumption.value || econsumption.value || emission.min"
              name="close"
              aria="{ 'aria-label': 'Close icon' }"
            ></p-icon>
          </button>
          <p-text
            class="economy-data-popup__headline"
            tag="h3"
            weight="semibold"
            size="inherit"
          >
            {{ label }}
          </p-text>
          <p-text size="small" color="neutral-contrast-low">{{
            consumption.label || econsumption.label
          }}</p-text>
          <p-text
            v-if="consumption.formattedValue"
            class="economy-data-popup__text-line"
            size="small"
            >{{ consumption.formattedValue }}</p-text
          >
          <p-text
            v-if="emission.formattedValue"
            class="economy-data-popup__text-line"
            size="small"
            >{{ emission.formattedValue }}</p-text
          >
          <p-text
            v-if="econsumption.formattedValue"
            class="economy-data-popup__text-line"
            size="small"
            >{{ econsumption.formattedValue }}</p-text
          >
          <template v-if="efficiency.value">
            <p-text class="economy-data-popup__text-line" size="small"
              >{{ efficiency.label }}: {{ efficiency.value }}</p-text
            >
            <img
              :data-src="efficiency.image"
              class="lazyload economy-data-popup__image"
              aria-hidden="true"
            />
          </template>
        </div>
      </template>
    </VMenu>
  </p-grid-item>
</template>

<style lang="scss" src="./DwaasEconomyData.scss"></style>
