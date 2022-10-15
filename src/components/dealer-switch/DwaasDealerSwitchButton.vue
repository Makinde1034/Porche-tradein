<script>
import { computed } from 'vue';

const props = {
  id: Number,
  name: String,
  activeTab: Number,
  address: {
    type: Array,
    default: () => [],
  },
};
export default {
  name: 'DwaasDealerSwitchButton',
  props,
  emits: ['update:activeTab'],
  setup(props, { emit }) {
    function toggleAccordion() {
      emit('update:activeTab', props.activeTab === props.id ? -1 : props.id);
    }

    const cleanAddress = computed(() => props.address.filter(Boolean));

    return {
      cleanAddress,
      toggleAccordion,
    };
  },
};
</script>
<template>
  <button
    :aria-expanded="activeTab === id"
    class="dealer-switch__accordion-tab"
    @click="toggleAccordion"
  >
    <div class="dealer-switch__contact-name">
      <p-text theme="dark" size="inherit" weight="semibold" tag="h3">
        {{ id + 1 }}. {{ name }}
      </p-text>
    </div>
    <div class="dealer-switch__contact-address">
      <p-text theme="dark" size="{base: 'x-small', m: 'small'}">
        <template v-for="(line, $index) in cleanAddress" :key="line">
          <span class="dealer-switch__contact-address-item">
            {{ line }}
          </span>
          <p-divider
            v-if="$index !== cleanAddress.length - 1"
            orientation="vertical"
            theme="dark"
            color="neutral-contrast-high"
            class="dealer-switch__contact-divider"
          />
        </template>
      </p-text>
    </div>
    <p-icon
      aria-hidden="true"
      focusable="false"
      theme="dark"
      :name="activeTab === id ? 'arrow-head-up' : 'arrow-head-down'"
      class="dealer-switch__accordion-icon"
    >
    </p-icon>
  </button>
</template>
