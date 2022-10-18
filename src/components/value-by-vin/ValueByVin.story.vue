<template lang="">
  <div class="wrapper">
    <section class="input__wrap">
      <div class="input__box">
        <p-text-field-wrapper label="Enter your VIN">
          <input
            type="text"
            name="some-name"
            placeholder="Please enter your VIN number"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Mileage">
          <input
            type="text"
            name="some-name"
            placeholder="Please enter the current milage"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Zip Code">
          <input
            type="text"
            name="some-name"
            placeholder="Pelase enter the your zip code"
          />
        </p-text-field-wrapper>
      </div>
    </section>
    <div class="button">
      <p-button disabled class="button__button" variant="primary" hide-label="{s: false }">Next</p-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../core/tradeInApi';

export default defineComponent({
  components: {},
  data() {
    return {};
  },
});
</script>
<style scoped lang="scss" src="./ValueByVin.scss"></style>
