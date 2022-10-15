<script>
const props = {
  itemIndex: {
    type: Number,
    default: -1,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
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
};

export default {
  name: 'DwaasFeatureHighlightsDesktopImage',
  props,
};
</script>
<template>
  <div ref="desktopImage" class="feature-highlights-desktop-image">
    <div
      class="feature-highlights__desktop-image"
      :class="{ 'feature-highlights__desktop-image--active': isActive }"
    >
      <picture>
        <source
          media="(max-width: 1000px)"
          :data-srcset="`${imageUrl}&w=1000`"
        />
        <source
          media="(max-width: 1300px)"
          :data-srcset="`${imageUrl}&w=1300`"
        />
        <source
          media="(max-width: 1760px)"
          :data-srcset="`${imageUrl}&w=1760`"
        />
        <source
          media="(max-width: 1920px)"
          :data-srcset="`${imageUrl}&w=1920`"
        />
        <source
          media="(min-width: 1920px)"
          :data-srcset="`${imageUrl}&w=1920`"
        />
        <img
          class="lazyload"
          :data-src="imageUrl"
          :height="imageHeight"
          :width="imageWidth"
          :alt="imageAlt"
          :src="`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 ${imageWidth} ${imageHeight}'%3E%3C/svg%3E`"
        />
      </picture>
    </div>
  </div>
</template>
