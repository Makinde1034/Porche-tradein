<script>
import { computed } from 'vue';
import { useBootstrapper, useBreakpoints } from '/@/composables';

const props = {
  imageLink: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  imageMobileLink: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '',
  },
  buttonTarget: String,
  showButton: {
    type: Boolean,
    default: false,
  },
  imageWidth: Number,
  imageHeight: Number,
  carIconLeft: String,
  carIconMiddle: String,
  carIconRight: String,
  showFirstBlock: Boolean,
  showSecondBlock: Boolean,
  showThirdBlock: Boolean,
};

export default {
  name: 'DwaasModelStageHeader',
  props,
  setup(props) {
    const { el } = useBootstrapper();
    const { isMobile } = useBreakpoints();

    const sources = computed(() => [
      { breakpoint: 480, width: 480, image: props.imageMobileLink },
      { breakpoint: 759, width: 759, image: props.imageMobileLink },
      { breakpoint: 999, width: 999, image: props.imageMobileLink },
      { breakpoint: 1920, width: 1920 },
      { breakpoint: 2100, width: props.imageWidth },
    ]);

    return {
      el,
      sources,
      isMobile,
    };
  },
};
</script>
<template>
  <div ref="el" class="model-stage-header">
    <p-content-wrapper width="fluid" class="model-stage-header__wrapper">
      <dwaas-media-image
        :class="'model-stage-header__image'"
        :src="imageLink"
        :alt="imageAlt"
        :sources="sources"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :full-width-on-max="true"
      />
      <div class="model-stage-header__shader"></div>
      <p-content-wrapper width="basic">
        <div class="model-stage-header__content">
          <p-headline
            variant="headline-1"
            tag="h1"
            theme="dark"
            class="model-stage-header__headline"
          >
            <slot name="title" />
          </p-headline>

          <p-text
            size="small"
            weight="semibold"
            theme="dark"
            class="model-stage-header__subline"
          >
            <slot name="sub-title" />
          </p-text>

          <div v-if="!isMobile" class="model-stage-header__car-info-container">
            <div v-if="showFirstBlock">
              <p-text
                weight="semibold"
                tag="h4"
                theme="dark"
                class="car-info-container__wrapper"
              >
                <p-icon :name="carIconLeft" size="large" theme="dark" />
                <span class="car-info-container__text">
                  <slot name="wheel-info" />
                </span>
              </p-text>
            </div>

            <div v-if="showSecondBlock">
              <p-text
                weight="semibold"
                tag="h4"
                theme="dark"
                class="car-info-container__wrapper"
              >
                <p-icon :name="carIconMiddle" size="large" theme="dark" />
                <span class="car-info-container__text">
                  <slot name="engine-info" />
                </span>
              </p-text>
            </div>

            <div v-if="showThirdBlock">
              <p-text
                weight="semibold"
                tag="h4"
                theme="dark"
                class="car-info-container__wrapper"
              >
                <p-icon :name="carIconRight" size="large" theme="dark" />
                <span class="car-info-container__text">
                  <slot name="seat-info" />
                </span>
              </p-text>
            </div>
          </div>

          <p-headline
            variant="headline-3"
            tag="h3"
            theme="dark"
            class="model-stage-header__price"
          >
            <slot name="currency" />
          </p-headline>

          <div v-if="showButton" class="model-stage-header__button">
            <p-link
              variant="tertiary"
              theme="dark"
              :href="buttonLink"
              :target="buttonTarget"
              class="model-stage-header__button-link"
            >
              <slot name="button" />
            </p-link>
          </div>
        </div>
      </p-content-wrapper>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasModelStageHeader.scss"></style>
