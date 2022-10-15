<script>
import { ref, watch, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = {
  currentLanguage: {
    type: String,
    default: '',
  },
  languages: {
    type: Array,
    default: [],
  },
};

export default {
  name: 'DwaasLanguageSwitch',
  props,
  setup() {
    const isExpanded = ref(false);
    const langSwitch = ref(null);
    const langItems = ref([]);

    // TODO: FOCUS TRAP ON HOLD
    // const { activate, deactivate } = useFocusTrap(langSwitch);

    function toggleSwitch(value) {
      if (!value) {
        // TODO: FOCUS TRAP ON HOLD
        // deactivate();
      }
      isExpanded.value = value || !isExpanded.value;
    }

    onClickOutside(langSwitch, () => {
      if (isExpanded.value) {
        toggleSwitch(false);
      }
    });

    watch(isExpanded, async (isOpen) => {
      // We add nextTick to give time to template ref to grab the DOM element
      await nextTick();

      isOpen ? langItems.value[0].focus() : '';
    });

    // TODO: FOCUS TRAP ON HOLD
    // import { watch, nextTick } from 'vue';
    // import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

    // watch(isExpanded, async (isOpen) => {
    //   // We add nextTick to give time to template ref to grab the DOM element
    //   await nextTick();

    //   if (isOpen) {
    //     langItems.value[0].focus();
    //     activate();
    //   } else {
    //     deactivate();
    //   }
    // });

    return {
      isExpanded,
      langSwitch,
      langItems,
      toggleSwitch,
    };
  },
};
</script>

<template>
  <div ref="langSwitch" class="language-switch">
    <p-button-pure
      theme="dark"
      icon="globe"
      class="language-switch__button language-switch__item"
      aria-haspopup="true"
      :aria-expanded="isExpanded"
      @click="toggleSwitch()"
    >
      {{ currentLanguage }}
    </p-button-pure>
    <div
      class="language-switch__dropdown"
      :class="{ 'language-switch__dropdown--closed': !isExpanded }"
    >
      <a
        v-for="(language, key) in languages"
        :key="key"
        :ref="
          (el) => {
            langItems[key] = el;
          }
        "
        class="language-switch__item"
        :href="language.href"
      >
        <p-text class="language-switch__item-text" theme="dark">
          <span class="language-switch__language-code">
            {{ language.code }}
          </span>
          <p-divider
            class="language-switch__divider"
            theme="dark"
            orientation="vertical"
            color="neutral-contrast-high"
          ></p-divider>
          {{ language.name }}
        </p-text>
      </a>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasLanguageSwitch.scss"></style>
