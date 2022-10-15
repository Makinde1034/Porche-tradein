<script>
import { computed } from 'vue';
import DwaasMediaimage from '../media-image/DwaasMediaImage.vue';
import { MODEL_SELECT_SOURCES, ModelSelectTypes } from './consts';

const props = {
  variant: {
    type: String,
    default: ModelSelectTypes.DEFAULT,
  },
  model: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  visibleOverlay: {
    type: Number,
    default: -1,
  },
};

const components = {
  DwaasMediaimage,
};
export default {
  components,
  props,
  emits: ['toggleOverlay', 'tabToIndex'],
  setup(props, { emit }) {
    function sendToggleOverlayEvent(index) {
      emit('toggleOverlay', index);
    }

    function tabTo(index) {
      emit('tabToIndex', index);
    }

    const accelerationData = computed(() => {
      return {
        value: props.model.acceleration || props.model.accelerationSCP || '-',
        label:
          (props.model.acceleration
            ? props.model.accelerationLabel
            : props.model.accelerationSCP) || '-',
      };
    });

    const powerData = computed(() => {
      return {
        value:
          props.model.powerKW && props.model.powerHP
            ? props.model.powerKW + ' / ' + props.model.powerHP
            : '-',
        label:
          props.model.powerKWLabel && props.model.powerHPLabel
            ? props.model.powerKWLabel + ' / ' + props.model.powerHPLabel
            : '-',
      };
    });

    const showEmissionClassLabel = computed(() => {
      return props.variant === ModelSelectTypes.EMISSION_CLASS_LABEL;
    });

    return {
      MODEL_SELECT_SOURCES,
      sendToggleOverlayEvent,
      tabTo,
      accelerationData,
      powerData,
      showEmissionClassLabel,
    };
  },
};
</script>

<template>
  <div class="model-select__slide" :class="isActive ? 'model-select__slide--selected' : ''">
    <div class="model-select__underline">
      <p-headline variant="headline-4" tag="h3">{{ model.name }}</p-headline>
      <p-headline v-if="model.price" variant="headline-5" tag="h4">
        {{ model.price?.formatted || '' }}
      </p-headline>
      <span></span>
    </div>
    <div @mouseleave="sendToggleOverlayEvent(-1)">
      <dwaas-media-image :key="model.name" aspect-ratio="16/9" :sources="MODEL_SELECT_SOURCES" :src="model.thumbnail"
        :alt="model.name" :width="model.pictureWidth" :height="model.pictureHeight"></dwaas-media-image>
      <p-grid class="model-select__consumption-emission-data">
        <p-grid-item v-if="model.consumption || model.emission" class="model-select__consumption" size="12" tabindex="0"
          @keydown.tab="tabTo(index + 1)" @keydown.tab.shift="tabTo(index - 1)" @click="sendToggleOverlayEvent(index)"
          @focus="sendToggleOverlayEvent(index)" @blur="sendToggleOverlayEvent(-1)"
          @mouseover="sendToggleOverlayEvent(index)">
          <p-flex>
            <p-flex-item>
              <p-icon v-if="model.consumption" class="model-select__consumption-icon" name="fuelStation"
                aria-label="Fuel Station icon" size="small"></p-icon>
            </p-flex-item>
            <p-flex-item>
              <p-text size="small">
                {{ model.consumption?.value || '' }}
              </p-text>
              <p-text size="x-small">
                {{ model.consumption?.unit || '' }}
              </p-text>
            </p-flex-item>
            <p-flex-item class="model-select__emission">
              <p-icon v-if="model.emission" class="model-select__consumption-icon" name="co2Emission"
                aria-label="Co2 Emission icon" size="small"></p-icon>
            </p-flex-item>
            <p-flex-item>
              <p-text size="small">
                {{ model.emission?.value || '' }}
              </p-text>
              <p-text size="x-small">
                {{ model.emission?.unit || '' }}
              </p-text>
            </p-flex-item>
          </p-flex>
        </p-grid-item>
      </p-grid>
      <p-grid v-if="index === visibleOverlay">
        <p-grid-item class="model-select__overlay" size="12" tabindex="-1" @mouseover="sendToggleOverlayEvent(index)"
          @mouseleave="sendToggleOverlayEvent(-1)">
          <p-flex class="model-select__overlay-title" justify-content="space-between" align-items="center">
            <p-flex-item>
              <p-headline variant="headline-5" tag="h4" theme="dark">
                {{ model.overlayTitle }}
              </p-headline>
            </p-flex-item>
            <p-flex-item>
              <p-button-pure icon="close" hide-label="true" size="small" aria-label="Close icon" theme="dark"
                @click="sendToggleOverlayEvent(-1)" @blur="sendToggleOverlayEvent(-1)">Close icon
              </p-button-pure>
            </p-flex-item>
          </p-flex>
          <p-text class="model-select__overlay-title" theme="dark">
            {{ model.overlaySubtitle }}
          </p-text>
          <p-text class="model-select__overlay-text" theme="dark">
            {{ model.overlayConsumption }}
          </p-text>
          <p-text class="model-select__overlay-text" theme="dark">
            {{ model.overlayEmission }}
          </p-text>
          <p-text v-if="model.custom15" class="model-select__overlay-text" theme="dark">
            {{ model.custom15.formatedvalue }}
          </p-text>
          <img v-if="model.efficiencyClassImage" class="model-select__overlay-image lazyload"
            :data-src="model.efficiencyClassImage.uri" :alt="model.label" :src="`
              data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 
              ${model.efficiencyClassImage.width} ${model.efficiencyClassImage.height} '%3E%3C/svg%3E
            `" />
        </p-grid-item>
      </p-grid>
    </div>

    <dwaas-emission-class-label v-if="showEmissionClassLabel" :efficiency-class="model.efficiencyClass">
    </dwaas-emission-class-label>

    <p-divider></p-divider>
    <p-grid>
      <p-grid-item size="5">
        <p-headline class="model-select__data-text" variant="headline-5" tag="h4">
          {{ powerData.value }}
        </p-headline>
      </p-grid-item>
      <p-grid-item size="7">
        <p-text class="model-select__data-text hydrated" :class="powerData.label === '-' ? ' empty' : ''" size="small">
          {{ powerData.label }}
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item size="5">
        <p-headline class="model-select__data-text" variant="headline-5" tag="h4">
          {{ accelerationData.value }}
        </p-headline>
      </p-grid-item>
      <p-grid-item size="7">
        <p-text class="model-select__data-text hydrated" :class="accelerationData.value == '-' ? ' empty' : ''"
          size="small">
          {{ accelerationData.label }}
        </p-text>
      </p-grid-item>
    </p-grid>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item size="5">
        <p-headline class="model-select__data-text hydrated" variant="headline-5" tag="h4">
          {{ model.topSpeed || '-' }}
        </p-headline>
      </p-grid-item>
      <p-grid-item size="7">
        <p-text class="model-select__data-text hydrated" :class="!model.topSpeed ? ' empty' : ''" size="small">
          {{ model.topSpeedLabel || '-' }}
        </p-text>
      </p-grid-item>
    </p-grid>
  </div>
</template>
