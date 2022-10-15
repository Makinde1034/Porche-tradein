<script>
import { computed, onMounted } from 'vue';
import { useBootstrapper } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from './consts';

const props = {
  headline: String,
  shopname: String,
  address: Array,
  email: Object,
  homepage: Object,
  phonenumbers: Object,
  openinghours: String,
  departments: {
    type: Array,
    default: () => [],
  },
};

export default {
  name: 'DwaasContactDetails',
  props,
  setup(props) {
    const { el } = useBootstrapper();

    // Feature: analytics
    const { pushGdlEvent } = useGDL();

    onMounted(() => {
      pushGdlEvent(AnalyticsEvents.CONTACT_DETAILS_LOAD, null, MODULE_PREFIX);
    });

    const phoneNumbersWithTitle = computed(() => {
      return props.phonenumbers.filter((number) => number.title);
    });

    return {
      el,
      phoneNumbersWithTitle,
    };
  },
};
</script>

<template>
  <address ref="el" class="contact-details">
    <p-content-wrapper width="basic">
      <p-grid>
        <p-grid-item size="{ base: 12, l: 4 }">
          <div class="contact-details__address">
            <div>
              <p-headline
                v-if="headline"
                variant="headline-2"
                class="contact-details__address-headline"
              >
                {{ headline }}
              </p-headline>
              <p-headline v-if="shopname" variant="headline-4" tag="h3">
                {{ shopname }}
              </p-headline>
              <p-text v-for="addressLine in address" :key="addressLine">
                {{ addressLine }}
              </p-text>
              <div class="contact-details__address-contacts">
                <p-link-pure
                  v-if="email && email.text"
                  class="contact-details__address-link"
                  :href="email.href"
                  :target="email.target"
                  icon="email"
                >
                  {{ email.text }}
                </p-link-pure>
                <p-link-pure
                  v-if="homepage && homepage.text"
                  class="contact-details__address-link"
                  :href="homepage.href"
                  :target="homepage.target"
                  icon="globe"
                >
                  {{ homepage.text }}
                </p-link-pure>
              </div>
            </div>
          </div>
        </p-grid-item>

        <p-grid-item size="{ base: 12, l: 4 }">
          <div class="contact-details__phone">
            <p-headline
              v-for="phone in phoneNumbersWithTitle"
              :key="phone"
              variant="headline-2"
              class="contact-details__phone-title"
            >
              {{ phone.title }}
            </p-headline>
            <div class="contact-details__table-container">
              <div
                v-for="phonenumber in phonenumbers"
                :key="phonenumber"
                class="contact-details__table-row"
              >
                <div class="contact-details__table-entry">
                  <p-text v-if="phonenumber.department">
                    {{ phonenumber.department }}
                  </p-text>
                </div>
                <div
                  class="contact-details__table-entry contact-details__table-entry--left-padded"
                >
                  <p-link-pure
                    v-if="phonenumber.text"
                    class="contact-details__phone-numbers-text"
                    :href="phonenumber.href"
                    :target="phonenumber.target"
                  >
                    {{ phonenumber.text }}
                  </p-link-pure>
                </div>
              </div>
            </div>
          </div>
        </p-grid-item>
        <p-grid-item size="{ base: 12, l: 4 }">
          <div v-if="departments.length > 0" class="contact-details__hours">
            <p-headline
              v-if="openinghours"
              variant="headline-2"
              class="contact-details__hours-headline"
            >
              {{ openinghours }}
            </p-headline>
            <template
              v-for="(department, $index) of departments"
              :key="`department-${$index}`"
            >
              <p-headline variant="headline-4" tag="h3">
                {{ department.name }}
              </p-headline>
              <div class="contact-details__table-container">
                <div
                  v-for="day of department.days"
                  :key="day.label"
                  class="contact-details__table-row"
                >
                  <p-text class="contact-details__table-entry">
                    {{ day.label }}
                  </p-text>
                  <p-flex
                    class="contact-details__table-entry contact-details__table-entry--left-padded"
                  >
                    <p-text v-if="day.starting">
                      {{ day.starting }}
                    </p-text>
                    <p-text v-if="day.closing">
                      <span class="contact-details__hours-times-dashspace"
                        >-</span
                      >

                      {{ day.closing }}
                    </p-text>
                  </p-flex>
                </div>
              </div>
              <p-text class="contact-details__note"
                ><slot :name="`note${$index + 1}`"
              /></p-text>
            </template>
          </div>
        </p-grid-item>
      </p-grid>
    </p-content-wrapper>
  </address>
</template>

<style lang="scss" src="./DwaasContactDetails.scss"></style>
