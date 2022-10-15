<script>
import { isDefined } from '/@/shared/utils';
import { computed, getCurrentInstance, reactive } from 'vue';
import { imgFitModes } from './consts';

const props = {
  sources: {
    type: Array,
    default: [],
  },
  fullWidthOnMax: {
    type: Boolean,
    default: false,
  },
  aspectRatio: {
    type: String,
    default: null,
  },
  objectFit: {
    type: String,
    default: imgFitModes.COVER,
  },
  customStyles: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  customClass: {
    type: String,
    default: '',
  },
};

export default {
  name: 'DwaasMediaImage',
  inheritAttrs: true,
  props,
  setup(props, { attrs }) {
    const internalInstance = getCurrentInstance();

    const sourceList = computed(() =>
      props.sources.slice(0, -1).map((source) => ({
        ...source,
        srcSet: buildImageUrl(source.image || attrs.src, source.width),
      }))
    );

    const imgSrc = computed(
      () => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ' +
            ${attrs.width} ${attrs.height} width='${attrs.width}' %3E%3C/svg%3E`
    );

    const lastSource = computed(() => props.sources.slice(-1)[0]);

    const lastDataSrc = computed(
      () =>
        `${buildImageUrl(
          isDefined(lastSource.value.image)
            ? lastSource.value.image
            : attrs.src,
          props.fullWidthOnMax ? getParentWidth.value : lastSource.value.width
        )}`
    );

    const getParentWidth = computed(() => {
      const element = internalInstance.parent.ctx.el;
      return element?.offsetWidth;
    });

    function buildImageUrl(url, size) {
      return url?.includes('?') ? `${url}&w=${size}` : `${url}?w=${size}`;
    }

    const imgStyles = reactive({
      objectFit: props.objectFit,
      aspectRatio: props.aspectRatio,
      ...props.customStyles,
    });

    const pictureClasses = computed(() => [
      'media-image',
      props.aspectRatio
        ? `aspect-ratio-${props.aspectRatio.replace('/', '-')}`
        : null,
      props.customClass,
    ]);

    return {
      sourceList,
      lastSource,
      imgSrc,
      buildImageUrl,
      lastDataSrc,
      imgStyles,
      pictureClasses,
    };
  },
};
</script>
<template>
  <picture :class="pictureClasses">
    <source
      v-for="source in sourceList"
      :key="source.breakpoint"
      :media="`(max-width: ${source.breakpoint}px)`"
      :data-srcset="source.srcSet"
    />
    <source
      :media="`(min-width: ${lastSource.breakpoint}px)`"
      :data-srcset="lastDataSrc"
    />

    <img
      :data-src="$attrs.src"
      :src="imgSrc"
      class="lazyload"
      :style="imgStyles"
      :alt="$attrs.alt"
      :data-index="index"
    />
  </picture>
</template>

<style lang="scss" src="./DwaasMediaImage.scss"></style>
