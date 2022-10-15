<script>
import { useBootstrapper } from '/@/composables';
import { computed } from 'vue';

const props = {
  variant: String,
  mobileImg: String,
};

export default {
  name: 'DwaasNewsDetail',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    const imgSrc = computed(
      () => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ' +
            ${props.desktopImgWidth} ${props.desktopImgHeight} width='${props.desktopImgWidth}' %3E%3C/svg%3E`
    );

    const sources = computed(() => [
      { breakpoint: 759, width: 759, image: props.mobileImg },
      { breakpoint: 1000, width: 1000 },
      { breakpoint: 1300, width: 1300 },
      { breakpoint: 1760, width: 1760 },
      { breakpoint: 1920, width: 1920 },
    ]);

    return {
      el,
      imgSrc,
      sources,
    };
  },
};
</script>
<template>
  <div ref="el" class="news-detail">
    <div
      class="news-detail__stage-img-container"
      :class="`news-detail__stage-img-container--${variant}`"
    >
      <dwaas-media-image
        v-bind="$attrs"
        :sources="sources"
        :full-width-on-max="true"
        :mobile-img="mobileImg"
      />
    </div>
    <p-content-wrapper width="basic">
      <p-grid>
        <p-grid-item
          size="{ base: 12, s: 10, m: 7 }"
          offset="{ base: 0, m: 1 }"
        >
          <div class="news-detail__headline">
            <p-headline variant="headline-2" tag="h1">
              <slot name="headline"></slot>
            </p-headline>
          </div>
          <slot name="date"></slot>
          <div class="news-detail__divider">
            <p-divider></p-divider>
          </div>
          <slot name="text"></slot>
        </p-grid-item>
      </p-grid>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasNewsDetail.scss"></style>
