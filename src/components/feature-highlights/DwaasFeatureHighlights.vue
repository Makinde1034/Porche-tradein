<script>
import { onMounted, ref, computed, watch } from 'vue';
import { useBootstrapper } from '/@/composables';
import { isMobile } from '/@/shared/utils';

export default {
  name: 'DwaasFeatureHighlights',
  props: {
    tiles: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { el } = useBootstrapper();
    const displayedImage = ref(0);
    const isMobileView = ref(false);
    const tilesToDisplay = computed(() => {
      return props.tiles.slice(0, 4);
    });
    const activeTile = ref(0);

    function handleActiveTile(activeTileId) {
      activeTile.value = activeTileId;
    }

    function handleResize() {
      isMobileView.value = isMobile(['xs', 's', 'm']);
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
    });

    watch(activeTile, (activeTile, oldVal) => {
      activeTile < 0
        ? (displayedImage.value = oldVal)
        : (displayedImage.value = activeTile);
    });

    return {
      el,
      handleActiveTile,
      handleResize,
      activeTile,
      displayedImage,
      isMobileView,
      tilesToDisplay,
    };
  },
};
</script>
<template>
  <div ref="el" class="feature-highlights">
    <p-content-wrapper width="basic">
      <p-headline variant="headline-2" class="feature-highlights__headline">
        <slot name="headline"></slot>
      </p-headline>

      <div class="feature-highlights__desktop-image-container">
        <dwaas-feature-highlights-desktop-image
          v-for="(tile, index) in tilesToDisplay"
          :key="index"
          :is-active="index === displayedImage"
          :item-index="index"
          :image-url="tile.desktopImage.url"
          :image-alt="tile.desktopImage.alt"
          :image-width="tile.desktopImage.width"
          :image-height="tile.desktopImage.height"
        />
      </div>

      <p-flex
        direction="{ base: 'column', m: 'row' }"
        class="feature-highlights__tiles"
      >
        <dwaas-feature-highlights-item
          v-for="(tile, index) in tilesToDisplay"
          :key="index"
          :is-active="index === activeTile"
          :item-index="index"
          :image-url="tile.desktopImage.url"
          :image-mobile-url="tile.mobileImage.url"
          :image-alt="tile.desktopImage.alt"
          :image-width="tile.desktopImage.width"
          :image-height="tile.desktopImage.height"
          :heading="tile.title"
          :is-mobile-view="isMobileView"
          @tile-click="handleActiveTile"
        >
          <template #[`heading${index}`]>
            <slot :name="`heading${index}`"></slot>
          </template>
          <template #[`description${index}`]>
            <slot :name="`description${index}`"></slot>
          </template>
        </dwaas-feature-highlights-item>
      </p-flex>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasFeatureHighlights.scss"></style>
