<script>
import { ref } from 'vue';
import { useBootstrapper } from '/@/composables';

const props = {
  dealers: {
    type: Array,
    default: () => [],
  },
  googleMap: {
    type: Object,
    default: () => ({}),
  },
};
export default {
  name: 'DwaasDealerSwitch',
  props,
  setup() {
    const { el } = useBootstrapper();

    const activeTab = ref(-1);

    function toggleAccordion(id) {
      activeTab.value = id;
    }

    return {
      el,
      activeTab,
      toggleAccordion,
    };
  },
};
</script>
<template>
  <div ref="el" class="dealer-switch">
    <p-content-wrapper>
      <div class="dealer-switch__wrapper">
        <div class="dealer-switch__map">
          <dwaas-google-map
            :api-key="googleMap.apiKey"
            :markers="googleMap.markers"
            :overlay="googleMap.overlay"
            :focused-marker="activeTab"
            class="dealer-switch__map-inner"
          >
            <template #cookie-disclaimer>
              <slot name="cookie-disclaimer" />
            </template>
          </dwaas-google-map>
        </div>
        <div class="dealer-switch__contact-container">
          <div class="dealer-switch__accordion">
            <template v-for="(dealer, $index) in dealers" :key="$index">
              <dwaas-dealer-switch-button
                :id="$index"
                :active-tab="activeTab"
                :name="dealer.name"
                :address="dealer.address"
                @update:active-tab="toggleAccordion"
              />
              <dwaas-dealer-switch-links
                :id="$index"
                :active-tab="activeTab"
                :map-title="dealer.mapTitle"
                :lat="dealer.lat"
                :lng="dealer.lng"
                :phone="dealer.phone"
                :homepage="dealer.homepage"
              />
            </template>
          </div>
        </div>
      </div>
    </p-content-wrapper>
  </div>
</template>

<style lang="scss" src="./DwaasDealerSwitch.scss"></style>
