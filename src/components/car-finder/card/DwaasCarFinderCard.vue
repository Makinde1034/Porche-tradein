<script setup lang="ts">
import { computed } from 'vue';
import { useFinderAPI, useFinderCard } from '/@/composables';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';
import { VehicleDTO, Vehicle } from '/@/types/vehicles';
import DwaasCarFinderGallery from './DwaasCarFinderGallery.vue';

const props = defineProps<{
  vehicle: VehicleDTO;
  ctaLabel: string;
  dealerId: string;
  numberOfOwnersLabel: string;
}>();

const { vehicleUIFormatted, onDetailsClick, onPriceClick, onCardClick } =
  useFinderCard(props.vehicle, MODULE_PREFIX);

const vehicleUIData: Vehicle = vehicleUIFormatted(props.numberOfOwnersLabel);

const headline = computed(
  () => `${vehicleUIData.modelYear} ${vehicleUIData.name}`
);

const carMedia = computed(() => vehicleUIData.images.slice(0, 4));

// Feature finder redirect url
const { queryUrl } = useFinderAPI();

const finderRedirectUrl = computed(() => {
  return `${vehicleUIData.url}?dealership=${props.dealerId}&redirectUrl=${queryUrl.value}`;
});
</script>

<template>
  <div
    class="car-finder-card"
    @click="onCardClick($event, AnalyticsEvents.CARFINDER_CARD_CLICK)"
  >
    <DwaasCarFinderGallery :media="carMedia" :vehicle="props.vehicle" />

    <div class="car-finder-card__content">
      <p-headline class="car-finder-card__title" variant="headline-4" tag="h2"
        >{{ headline }}
      </p-headline>
      <p class="car-finder-card__subtitle">{{ vehicleUIData.condition }}</p>
      <ul class="car-finder-card__specs">
        <li class="car-finder-card__spec-item">{{ vehicleUIData.mileage }}</li>
        <li class="car-finder-card__spec-item">
          {{ vehicleUIData.numberOfPreviousOwners }}
        </li>
        <li class="car-finder-card__spec-item">
          {{ vehicleUIData.transmission }}
        </li>
        <li class="car-finder-card__spec-item">{{ vehicleUIData.power }}</li>
      </ul>
      <p class="car-finder-card__subtitle">
        <strong>{{ vehicleUIData.exteriourColor }}</strong> ·
        {{ vehicleUIData.interior }}
      </p>
      <p-headline
        variant="headline-4"
        class="car-finder-card__price"
        @click.stop="
          onPriceClick($event, AnalyticsEvents.CARFINDER_PRICE_CLICK)
        "
        >{{ vehicleUIData.price }}</p-headline
      >
      <p-link
        class="car-finder-card__btn"
        variant="secondary"
        :href="finderRedirectUrl"
        target="_self"
        @click.stop="
          onDetailsClick($event, AnalyticsEvents.CARFINDER_DETAILS_CLICK)
        "
      >
        {{ ctaLabel }}
      </p-link>
    </div>
  </div>
</template>
<style lang="scss" src="./DwaasCarFinderCard.scss"></style>
