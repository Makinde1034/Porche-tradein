<script setup lang="ts">
import { useFinderCard } from '/@/composables';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';
import { VehicleDTO } from '/@/types/vehicles';
import { DwaasMedia } from '/@/types';

const props = defineProps<{
  vehicle: VehicleDTO;
  media: Array<{
    imageDimensions: Array<DwaasMedia>;
  }>;
}>();

const { onImageClick } = useFinderCard(props.vehicle, MODULE_PREFIX);
</script>

<template>
  <div class="car-finder-card__gallery">
    <picture
      v-for="({ imageDimensions }, $index) of media"
      :key="$index"
      class="car-finder-card__image"
      @click.stop="onImageClick($event, AnalyticsEvents.CARFINDER_IMAGE_CLICK)"
    >
      <source
        v-for="source of imageDimensions"
        :key="source.url"
        :media="`(max-width: ${source.width}px)`"
        :data-srcset="source.url"
      />
      <img
        :data-src="imageDimensions[imageDimensions.length - 1].url"
        :alt="imageDimensions[imageDimensions.length - 1].alt"
        class="lazyload"
        :src="
          'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 ' +
          imageDimensions[imageDimensions.length - 1].width +
          ' ' +
          imageDimensions[imageDimensions.length - 1].height +
          ' width=\'' +
          imageDimensions[imageDimensions.length - 1].width +
          '\'%3E%3C/svg%3E'
        "
      />
    </picture>
  </div>
</template>
