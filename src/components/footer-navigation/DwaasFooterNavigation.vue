<script>
import { onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  copyrightText: {
    type: String,
    default: '',
  },
  links: {
    type: Array,
    default: [],
  },
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
  name: 'DwaasFooterNavigation',
  props,
  setup() {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onFooterTextLinkClick($event) {
      pushGdlEvent(AnalyticsEvents.FOOTER_LINK_CLICK, $event, MODULE_PREFIX);
    }

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.FOOTER_LOAD, null, MODULE_PREFIX);
    });

    return {
      el,
      onFooterTextLinkClick,
    };
  },
};
</script>

<template>
  <div ref="el" class="footer-navigation">
    <div class="footer-navigation__content">
      <div class="footer-navigation__copyright">
        <p-content-wrapper width="basic">
          <div class="footer-navigation__content-wrapper">
            <div
              v-if="languages.length > 0"
              class="footer-navigation__language-switch-wrapper"
            >
              <dwaas-language-switch
                class="footer-navigation__language-switch"
                :current-language="currentLanguage"
                :languages="languages"
              ></dwaas-language-switch>
            </div>
            <div class="footer-navigation__copyright-text">
              <p-text theme="dark" color="default">
                <span v-if="copyrightText">{{ copyrightText }}</span>
                <a
                  v-for="(link, key) in links"
                  :key="key"
                  :href="link.href"
                  :target="link.target"
                  @click="onFooterTextLinkClick"
                  >{{ link.text }}</a
                >
              </p-text>
              <slot name="wltp"></slot>
            </div>
          </div>
        </p-content-wrapper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasFooterNavigation.scss"></style>
