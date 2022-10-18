<template>
  <Story title="v2/pages/TradeIn" icon="ri:home-5-line">
    <div class="tradeIn__wrapper">
      <header class="tradeIn__header">
        <h3>Trade-in Value</h3>
        <img src="../../../../assets/images/close_button.svg" alt="" />
      </header>
      <section class="tradeIn__description">
        <h3 v-if="parentActiveStep === 0">
          Let’s Get Your Kelley Blue Book® Trade-in Value
        </h3>
        <p v-if="parentActiveStep === 0">
          By completing the following steps, you will receive your Kelley Blue
          Book® Trade-in Value to submit a request for a detailed value by an
          authorized dealer.
        </p>
        <p v-if="parentActiveStep !== 3" style="font-weight: 600">
          Your Vehicle
        </p>
      </section>
      <!-- stages -->
      <section v-if="parentActiveStep !== 3" class="tradeIn__stages">
        <!-- Information -->
        <div>
          <div v-if="parentActiveStep === 0" class="tradeIn__stage">
            <span>1</span>
            <p>Information</p>
          </div>
          <div class="tradeIn__checked" v-else-if="parentActiveStep > 0">
            <img src="../../../../assets/images/check.svg" alt="" />
            <p>Information</p>
          </div>
        </div>
        <!-- conditions and options -->
        <div>
          <div v-if="parentActiveStep === 0" class="tradeIn__completed__stage">
            <span>2</span>
            <p>Condition & Options</p>
          </div>
          <div v-else-if="parentActiveStep === 1" class="tradeIn__stage">
            <span>2</span>
            <p>Condition & Options</p>
          </div>
          <div class="tradeIn__checked" v-else="parentActiveStep > 1">
            <img src="../../../../assets/images/check.svg" alt="" />
            <p>Condition & Options</p>
          </div>
        </div>
        <!-- results -->
        <div>
          <div
            v-if="parentActiveStep < 2"
            class="tradeIn__completed__stage"
          >
            <span>3</span>
            <p>Results{{ parentActiveStep }}</p>
          </div>
          <div class="tradeIn__checked" v-else>
            <img src="../../../../assets/images/check.svg" alt="" />
            <p>Results</p>
          </div>
        </div>
      </section>
      <section v-if="showOptions === true" class="tradeIn__value__options">
        <p>Value by:</p>
        <div>
          <p-radio-button-wrapper
            class="tradeIn__radio"
            label="Year, Make, Model "
            hide-label="false"
          >
            <input
              v-model="valueBy"
              type="radio"
              :value="0"
              name="some-name-1"
            />
          </p-radio-button-wrapper>
          <p-radio-button-wrapper label="VIN" hide-label="false">
            <input
              v-model="valueBy"
              :value="1"
              type="radio"
              name="some-name-1"
            />
          </p-radio-button-wrapper>
        </div>
      </section>
      <section v-if="valueBy === 0">
        <ValueByMake
          :setParentActiveStep="setParentActiveStep"
          :hideOptionsIcon="hideOptionsIcon"
        />
      </section>
      <section v-if="valueBy === 1">
        <ValueByVin />
      </section>
    </div>
  </Story>
</template>

<script lang="ts">
// import navigationData from '/@/components/main-navigation/__fixtures/navigation.json'
// import stageHeaderData from '/@/components/stage-header/__fixtures/stage-header.json'
// import teasersData from '/@/components/finder-teaser/__fixtures/teasers.json'
import closeIcon from '../../../../assets/images/close_button.svg';
import ValueByMake from '../../../../components/value-by-make/ValueByMake.story.vue';
import ValueByVin from '../../../../components/value-by-vin/ValueByVin.story.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  // type inference enabled
  components: { ValueByMake, ValueByVin },
  data() {
    return {
      valueBy: 0,
      showOptions: true,
      parentActiveStep: 0,
    };
  },
  methods: {
    hideOptionsIcon() {
      this.showOptions = false;
    },
    setParentActiveStep() {
      this.parentActiveStep += 1;
    },
  },

  mounted() {},
});
</script>

<style scoped lang="scss" src="./TradeIn.scss"></style>
