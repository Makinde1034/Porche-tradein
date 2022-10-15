<script>
import { useSanitizer } from '/@/plugins/vue-sanitizer/sanitizer';

const props = {
  id: Number,
  mapTitle: String,
  activeTab: Number,
  phone: Object,
  homepage: Object,
  lat: 0,
  lng: 0,
};

export default {
  name: 'DwaasDealerSwitchLinks',
  props,
  setup() {
    const { sanitize } = useSanitizer();

    return {
      sanitize,
    };
  },
};
</script>
<template>
  <div
    :class="
      activeTab === id
        ? 'dealer-switch__link-container'
        : 'dealer-switch__link-container--hidden'
    "
  >
    <div v-if="activeTab === id">
      <div v-if="phone" class="dealer-switch__link">
        <p-link-pure
          icon="phone"
          theme="dark"
          size="small"
          :href = "phone.href"
          :target="phone.target"
        >
        {{phone.title}}
        </p-link-pure>
      </div>
      <div class="dealer-switch__link">
        <p-link-pure
          icon="map"
          theme="dark"
          size="small"
          :href="`https://www.google.com/maps?q=${lat},${lng}`"
          target="_blank"
        >
          {{ mapTitle }}
        </p-link-pure>
      </div>
      <div v-if="homepage" class="dealer-switch__link">
        <p-link-pure
          icon="home"
          theme="dark"
          size="small"
          :href = "homepage.href"
          :target="homepage.target"
        >
        {{homepage.title}}
        </p-link-pure>
      </div>
    </div>
  </div>
</template>
