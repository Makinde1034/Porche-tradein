<template lang="">
  <div class="value">
    <section class="value__info">
      <p>
        Below we have provided the Kelley Blue Book® Trade-in Range, which is an
        expected value based on current market data and the information you
        provided on the previous screens. You can use the below information to
        provide guidance towards your down payment to assist you in your
        financial calculation towards your next Porsche. <br />
        <br />
        Please proceed below to submit a request to appraise your vehicle's
        value by an authorized Porsche dealer.
      </p>
    </section>
    <section class="value__svg">
      <iframe scrolling="no" :src="priceAdvisoryUrl"></iframe>
    </section>
    <section class="value__buttons">
      <p-button
        class="button"
        @click="moveTonextStage"
        style="marginright: 20px"
        variant="primary"
        hide-label="{  s: false }"
        >Send your trade-in value</p-button
      >
      <p-button variant="tertiary" hide-label="{ m: false }"
        >Call us to get in contact</p-button
      >
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// import  svg from '../../../assets/images/value_svg.svg'

export default defineComponent({
  props: ['priceAdvisoryUrl', 'incStep', ],
  data() {
    return {
      valueBy: 0,
    };
  },
  methods: {
    moveTonextStage() {
      this.incStep();
    },
  },
  inject: ['step', 'data', 'increamentStep'],
  mounted() {
   
  },
});
</script>

<style scoped lang="" src="./VehicleValue.scss"></style>
