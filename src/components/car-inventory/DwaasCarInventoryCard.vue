<script setup lang="ts">
import { computed } from 'vue';
import { useFinderAPI, useFinderCard } from '/@/composables';
import {
  CAR_INVENTORY_SOURCES,
  AnalyticsEvents,
  MODULE_PREFIX,
} from './consts';
import { VehicleDTO, Vehicle } from '/@/types/vehicles';

const props = defineProps<{
  vehicle: VehicleDTO;
  ctaLabel: string;
  dealerId: string;
  numberOfOwnersLabel: string;
  isVisible: boolean;
}>();

const sources = CAR_INVENTORY_SOURCES;

const {
  vehicleUIFormatted,
  onDetailsClick,
  onPriceClick,
  onImageClick,
  onCardClick,
} = useFinderCard(props.vehicle, MODULE_PREFIX);

const vehicleUIData: Vehicle = vehicleUIFormatted(props.numberOfOwnersLabel);

const headline = computed(
  () => `${vehicleUIData.modelYear} ${vehicleUIData.name}`
);

const defaultImg = computed(
  () => vehicleUIData.media[vehicleUIData.media.length - 1]
);

// Feature finder redirect url
const { queryUrl } = useFinderAPI();

const finderRedirectUrl = computed(() => {
  return `${vehicleUIData.url}?dealership=${props.dealerId}&redirectUrl=${queryUrl.value}`;
});
</script>

<template>
  <div
    class="car-inventory-card"
    role="tabpanel"
    @click="onCardClick($event, AnalyticsEvents.CARINVENTORY_CARD_CLICK)"
  >
    <div class="car-inventory-card__content">
      <dwaas-media-image
        v-if="defaultImg"
        class="car-inventory-card__img"
        :src="defaultImg.url"
        :width="defaultImg.width"
        :height="defaultImg.height"
        :alt="defaultImg.alt || `Image ${headline}`"
        :aspect-ratio="'4/3'"
        :full-width-on-max="true"
        :sources="sources"
        @click.stop="
          onImageClick($event, AnalyticsEvents.CARINVENTORY_IMAGE_CLICK)
        "
      />
      <div class="car-inventory-card__details">
        <p-headline class="car-inventory-card__title" variant="headline-4">{{
          headline
        }}</p-headline>
        <p-text class="car-inventory-card__subtitle">{{
          vehicleUIData.condition
        }}</p-text>
        <p-flex
          class="car-inventory-card__specs"
          direction="row"
          wrap="wrap"
          justify-content="space-between"
        >
          <p-flex-item class="car-inventory-card__spec-item">{{
            vehicleUIData.mileage
          }}</p-flex-item>
          <p-flex-item class="car-inventory-card__spec-item"
            >{{ vehicleUIData.numberOfPreviousOwners }}
          </p-flex-item>
          <p-flex-item class="car-inventory-card__spec-item">{{
            vehicleUIData.transmission
          }}</p-flex-item>
          <p-flex-item class="car-inventory-card__spec-item">{{
            vehicleUIData.power
          }}</p-flex-item>
        </p-flex>
        <p-text class="car-inventory-card__color"
          ><strong>{{ vehicleUIData.exteriourColor }}</strong> ·
          {{ vehicleUIData.interior }}</p-text
        >
      </div>
    </div>
    <div class="car-inventory-card__footer">
      <p-headline
        variant="headline-4"
        class="car-inventory-card__price"
        @click.stop="
          onPriceClick($event, AnalyticsEvents.CARINVENTORY_PRICE_CLICK)
        "
        >{{ vehicleUIData.price }}</p-headline
      >
      <a
        class="car-inventory-card__btn"
        :aria-label="`${ctaLabel} ${headline}`"
        :href="finderRedirectUrl"
        :aria-hidden="!isVisible"
        :tabindex="isVisible ? 0 : -1"
        target="_self"
        @click.stop="
          onDetailsClick($event, AnalyticsEvents.CARINVENTORY_DETAILS_CLICK)
        "
      >
        <p-icon
          v-if="ctaLabel"
          class="car-inventory-card__btn--icon"
          color="inherit"
        ></p-icon>
        <p-text color="inherit" class="label">{{ ctaLabel }}</p-text>
      </a>
    </div>
  </div>
</template>
