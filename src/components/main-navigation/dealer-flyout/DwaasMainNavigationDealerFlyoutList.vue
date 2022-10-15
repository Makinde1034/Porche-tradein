<script>
import { useBreakpoints } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  address: {
    type: Array,
    default: () => [],
  },
  title: String,
  phone: String,
  phoneLabel: String,
  phoneTarget: String,
  mail: String,
  mailLabel: String,
  mailTarget: String,
  links: {
    type: Array,
    default: () => [],
  },
  location: {
    type: String,
    default: '',
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
};
export default {
  name: 'DwaasMainNavigationDealerFlyoutList',
  props,
  emits: ['closeDealerFlyout'],
  setup(props, { emit }) {
    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    function onAddressClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_LOCATION_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onPhoneClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_PHONE_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    function onEmailClick($event) {
      pushGdlEvent(
        AnalyticsEvents.NAVIGATION_FLYOUT_EMAIL_CLICK,
        $event,
        MODULE_PREFIX
      );
    }

    const { isNavigationMobile } = useBreakpoints();
    function onEmailTab($event) {
      if (props.links.length === 0 && !isNavigationMobile.value) {
        emit('closeDealerFlyout', $event);
      }
    }

    return {
      onAddressClick,
      onPhoneClick,
      onEmailClick,
      onEmailTab,
      isNavigationMobile,
    };
  },
};
</script>

<template>
  <ul class="dealer-flyout__links" role="menu">
    <li class="dealer-flyout__link dealer-flyout__link--title" role="menuitem">
      <p-headline variant="headline-4">{{ location }}</p-headline>
    </li>
    <li class="dealer-flyout__link" role="menuitem">
      <div class="dealer-flyout__icon--margin-right">
        <p-icon v-if="isOpen" name="pin"></p-icon>
      </div>
      <div class="dealer-flyout__link-address" @click="onAddressClick">
        <p-text v-for="line in address" :key="line"> {{ line }} </p-text>
      </div>
    </li>
    <li class="dealer-flyout__link" role="menuitem">
      <a
        class="container__link-contacts link-hover"
        :href="phone"
        :target="phoneTarget"
        :tabindex="undefined"
        @click="onPhoneClick"
        ><p-icon
          v-if="isOpen"
          name="phone"
          variant="tertiary"
          color="inherit"
        ></p-icon>
        {{ phoneLabel }}
      </a>
    </li>
    <li class="dealer-flyout__link" role="menuitem">
      <a
        class="container__link-contacts link-hover"
        :href="mail"
        :target="mailTarget"
        :tabindex="undefined"
        @click="onEmailClick"
        @keydown.tab.exact="onEmailTab"
        ><p-icon
          v-if="isOpen"
          name="email"
          variant="tertiary"
          color="inherit"
        ></p-icon>
        {{ mailLabel }}
      </a>
    </li>

    <dwaas-main-navigation-dealer-link
      v-for="(item, $index) in links"
      :key="$index"
      :href="item.href"
      :target="item.target"
      :has-sub-nav="item.hasSubNav"
      :items="item.subitems"
      :last="$index === links.length - 1"
      :is-navigation-mobile="isNavigationMobile"
      @close-dealer-flyout="$emit('closeDealerFlyout', $event)"
    >
      {{ item.text }}
    </dwaas-main-navigation-dealer-link>
  </ul>
</template>
