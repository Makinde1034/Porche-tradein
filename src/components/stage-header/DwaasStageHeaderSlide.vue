<script>
import { onMounted, ref } from 'vue';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { useBreakpoints } from '/@/composables';
import {
  AnalyticsEvents,
  MODULE_PREFIX,
  CarouselTypes,
  STAGE_HEADER_SOURCES,
} from './consts';

const props = {
  variant: {
    type: String,
    default: CarouselTypes.DEFAULT,
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
  hasTitle: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  imageMobileUrl: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  imageWidth: {
    type: String,
    default: '',
  },
  imageHeight: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  slideCount: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  aspectRatio: {
    type: String,
    default: '12/5',
  },
};

export default {
  name: 'DwaasStageHeaderSlide',
  props,
  setup(props) {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onSlideSelect($event) {
      pushGdlEvent(
        AnalyticsEvents.STAGE_HEADER_LINK_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    const sources = ref(STAGE_HEADER_SOURCES);
    onMounted(() => {
      const { breakpointSizes } = useBreakpoints();
      sources.value = STAGE_HEADER_SOURCES.map((source) => {
        const image =
          source.width < breakpointSizes.md
            ? props.imageMobileUrl
            : props.imageUrl;
        return { ...source, image };
      });
    });

    return {
      onSlideSelect,
      sources,
    };
  },
};
</script>

<template>
  <div class="stage-header__slide" :aria-hidden="!isVisible" role="tabpanel">
    <component
      :is="!href ? 'div' : 'a'"
      tabindex="-1"
      class="stage-header__slide-link"
      :class="{ 'stage-header__slide-link--disabled': href == '' }"
      :href="href"
      :target="target"
      @click="onSlideSelect"
    >
      <dwaas-media-image
        :sources="sources"
        :src="imageUrl"
        :alt="imageAlt"
        :height="imageHeight"
        :width="imageWidth"
        :aspect-ratio="aspectRatio"
        :custom-styles="{ position: 'absolute', top: 0 }"
      ></dwaas-media-image>

      <div v-if="!hasTitle" class="stage-header__slide-overlay"></div>
      <p-content-wrapper width="basic">
        <div class="stage-header__slide-button">
          <p-link-pure
            v-if="href && isVisible"
            :href="href"
            :target="target"
            theme="dark"
            size="{base: 'medium', m: 'x-large'}"
            weight="semibold"
          >
            <h2 class="stage-header__slide-headline">
              {{ title }}
            </h2>
            <p slot="subline">{{ subtitle }}</p>
          </p-link-pure>
          <div v-else>
            <p-text
              theme="dark"
              weight="semibold"
              size="{base: 'medium', m: 'x-large'}"
              :tag="isFirst ? 'h1' : 'h2'"
            >
              {{ title }}
            </p-text>
            <div class="stage-header__slide-subline">
              <p-text theme="dark" size="inherit">
                {{ subtitle }}
              </p-text>
            </div>
          </div>
        </div>
        &nbsp;
      </p-content-wrapper>
    </component>
  </div>
</template>
