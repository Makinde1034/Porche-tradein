<template lang="">
  <form @submit.prevent="moveTonextStage" class="wrapper">
    <section class="input__wrap">
      <div class="input__box">
        <p-select-wrapper filter="true" label="Year">
          <select name="year" v-model="msg.year" required>
            <option>Please select Year</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Make">
          <select v-model="msg.make" name="make" required>
            <option hidden>Please select make</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Model">
          <select v-model="msg.model" name="model" required>
            <option hidden>Please select model</option>
            <option selected value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Trim">
          <select v-model="msg.trim" name="trim" required>
            <option>Please select trim</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-select-wrapper filter="true" label="Vehicle Color">
          <select v-model="msg.color" name="color" required>
            <option>Please select color</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Mileage">
          <input
            v-model="msg.mileage"
            type="number"
            name="some-name"
            placeholder="Please enter the current mileage"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Zip Code">
          <input
            v-model="msg.zipCode"
            type="number"
            maxlenght="5"
            name="Zip Code"
            placeholder="Please enter your zip code"
          />
        </p-text-field-wrapper>
      </div>
    </section>
    <div class="button">
      <p-button
        class="buttonn"
        :disabled="buttonEnabledChecker"
        variant="primary"
        hide-label="{s: false }"
        >Next</p-button
      >
    </div>
  </form>
  <!-- <button @click="checkState">chect state</button> -->
</template>
<script>
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../../core/tradeInApi';

export default defineComponent({
  // type inference enabled
  components: {},
  data() {
    return {
      msg: this.data,
      isButtonDisabled: true,
    };
  },

  methods: {
    async getVehicleMake() {
      const res = await tradeInApi.getVehicleMakeOptions();
      console.log(res);
    },

    checkState() {
      console.log(this.msg);
    },
    moveTonextStage() {
      this.increamentStep();
    },
  },
  computed: {
    buttonEnabledChecker() {
      if (
        this.msg.year === '' ||
        this.msg.make === '' ||
        this.msg.model === '' ||
        this.msg.trim === '' ||
        this.msg.color === '' ||
        this.msg.model === '' ||
        this.msg.zipCode === '' ||
        this.msg.mileage === ''
      ) {
        return true;
      }
    },
  },
  inject: ['step', 'data', 'increamentStep'],

  mounted() {
    this.getVehicleMake();
    console.log(this.step, 'efijeoifeofjefefefwefwfwfwfwe');
  },
});
</script>
<style scoped lang="scss" src="./StepOne.scss"></style>
