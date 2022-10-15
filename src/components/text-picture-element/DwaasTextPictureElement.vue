<script>
import { computed, onMounted } from 'vue';
import { useBootstrapper, useBreakpoints } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  mobileSrc: {
    type: String,
    default: '',
  },
};
export default {
  name: 'DwaasTextPictureElement',
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const { isMobile } = useBreakpoints();

    const sources = computed(() => [
      { breakpoint: 480, width: 480, image: props.mobileSrc },
      { breakpoint: 760, width: 760, image: props.mobileSrc },
      { breakpoint: 1000, width: 1000, image: props.mobileSrc },
      { breakpoint: 1300, width: 1300 },
      { width: 590, breakpoint: 1760 },
      { width: 640, breakpoint: 1760 },
    ]);

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(
        AnalyticsEvents.TEXT_PICTURE_ELEMENT_LOAD,
        null,
        MODULE_PREFIX
      );
    });

    return {
      el,
      sources,
      isMobile,
    };
  },
};
</script>
<template>
  <div ref="el" class="text-picture-element">
    <p-content-wrapper width="basic">
      <article class="text-picture-element__article">
        <dwaas-media-image
          class="text-picture-element__image"
          v-bind="$attrs"
          :sources="sources"
          :full-width-on-max="true"
        />

        <div class="text-picture-element__content">
          <div class="text-picture-element__headline">
            <p-text size="medium" tag="h2">
              <slot name="headline"></slot>
            </p-text>
          </div>
          <p-text class="text-picture-element__text">
            <slot name="text"></slot>
          </p-text>
          <slot name="button"></slot>
        </div>
      </article>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasTextPictureElement.scss"></style>
