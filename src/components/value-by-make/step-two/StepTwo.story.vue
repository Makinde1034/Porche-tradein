<template lang="">
  <div class="step">
    <header>
      <h3>Your Vehicle Options</h3>
      <p>Which options are on your 2019 BMW 4X M</p>
    </header>
    <div class="step__options">
      <div>
        <p-checkbox-wrapper
          label="Lorem ipsum dolor sit amet"
          hide-label="false"
        >
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
      </div>
      <div>
        <p-checkbox-wrapper
          label="Lorem ipsum dolor sit amet"
          hide-label="false"
        >
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
      </div>
      <div>
        <p-checkbox-wrapper
          label="Lorem ipsum dolor sit amet"
          hide-label="false"
        >
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
      </div>
      <div>
        <p-checkbox-wrapper
          label="Lorem ipsum dolor sit amet"
          hide-label="false"
        >
          <input type="checkbox" name="some-name" />
        </p-checkbox-wrapper>
      </div>
    </div>
    <section class="step__showmore">
      <img src="../../../assets/images/arrow_down.svg" alt="" />
      <p>Show more options</p>
    </section>
    <section class="step__condition">
      <h3>What condition is your BMW Z4 iM23 in?</h3>
      <p>Please select carefully, it will affect your car’s value.</p>
    </section>
    <table>
      <!-- <thead>
        <tr>
          <th scope="col">Account</th>
          <th scope="col">Due Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Period</th>
        </tr>
      </thead> -->
      <tbody>
        <tr>
          <td data-label="Account">
            <p-radio-button-wrapper
              class="tradeIn__radio"
              label="Excellent"
              hide-label="false"
            >
              <input
                v-model="valueBy"
                type="radio"
                :value="0"
                name="Excellent"
              />
            </p-radio-button-wrapper>
          </td>
          <td id="td__grey" data-label="Due Date">
            Looks new and is in excellent mechanical condition
          </td>
          <td data-label="Amount">
            <div class="price">
              <p class="price__percentage">3%</p>
              <p>of cars</p>
            </div>
          </td>
        </tr>
        <!--  -->
        <tr>
          <td scope="row" data-label="Account">
            <p-radio-button-wrapper
              class="tradeIn__radio"
              label="Very Good"
              hide-label="false"
            >
              <input
                v-model="valueBy"
                type="radio"
                :value="1"
                name="Very Good"
              />
            </p-radio-button-wrapper>
          </td>
          <td id="td__grey" data-label="Due Date">
            Has a minor cosmetic defects and is in excellent mechanical
            condition
          </td>
          <td data-label="Amount">
            <div class="price">
              <p class="price__percentage">23%</p>
              <p>of cars</p>
            </div>
          </td>
        </tr>
        <!--  -->
        <tr>
          <td scope="row" data-label="Account">
            <p-radio-button-wrapper
              class="tradeIn__radio"
              label="Good"
              hide-label="false"
            >
              <input v-model="valueBy" type="radio" :value="1" name="Good" />
            </p-radio-button-wrapper>
          </td>
          <td id="td__grey" data-label="Due Date">
            Has some repairable cosmetic defects and is free of major mechanical
            problems
          </td>
          <td data-label="Amount">
            <div class="price">
              <p class="price__percentage">54%</p>
              <p>of cars</p>
            </div>
          </td>
        </tr>
        <!--  -->
        <tr>
          <td scope="row" data-label="Account">
            <p-radio-button-wrapper
              class="tradeIn__radio"
              label="Fair"
              hide-label="false"
            >
              <input v-model="valueBy" type="radio" :value="1" name="Fair" />
            </p-radio-button-wrapper>
          </td>
          <td id="td__grey" data-label="Due Date">
            Has some cosmetic defects that require repairing and/or replacing
          </td>
          <td data-label="Amount">
            <div class="price">
              <p class="price__percentage">18%</p>
              <p>of cars</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="next__button">
      <p-button @click="moveTonextStage" variant="primary" hide-label="{ base: true, s: false }"
        >Get your trade-in value</p-button
      >
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      valueBy: 0,
    };
  },
  methods: {
    moveTonextStage() {
      this.increamentStep();
    },
  },
  inject: ['step', 'data', 'increamentStep'],
  mounted() {},
});
</script>
<style lang="" src="./StepTwo.scss"></style>
