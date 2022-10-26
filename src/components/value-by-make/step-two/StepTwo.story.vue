<template lang="">
  <div class="step">
    <header>
      <h3>Your Vehicle Options</h3>
      <p>
        Which options are on your {{ vehicleInfo.year }} {{ vehicleInfo.make }}
        {{ vehicleInfo.model }}
      </p>
    </header>
    <div class="step__options">
      <div v-for="(option, index) in truncatedOptions" :key="index">
        <p-checkbox-wrapper :label="option.optionName" hide-label="false">
          <input
            v-model="selectedoptions"
            :checked="option.isTypical"
            type="checkbox"
            :value="option.vehicleOptionId"
            name="option.optionName"
            @input="handleOptionsSelection"
          />
        </p-checkbox-wrapper>
      </div>
    </div>
    <section class="step__showmore">
      <img src="../../../assets/images/arrow_down.svg" alt="" />
      <p @click="toggleShowMoreOptions">
        {{ showMore ? 'Show less options' : 'Show more options' }}
      </p>
    </section>
    <section class="step__condition">
      <h3>
        What condition is your {{ vehicleInfo.year }} {{ vehicleInfo.make }}
        {{ vehicleInfo.model }} in?
      </h3>
      <p>Please select carefully, it will affect your car’s value.</p>
    </section>
    <table>
      <tbody>
        <tr>
          <td data-label="Account">
            <p-radio-button-wrapper
              class="tradeIn__radio"
              label="Excellent"
              hide-label="false"
            >
              <input
                v-model="condition"
                type="radio"
                value="Excellent"
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
                v-model="condition"
                type="radio"
                value="Very Good"
                name="vg"
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
              <input
                v-model="condition"
                type="radio"
                value="Good"
                name="Good"
              />
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
              <input
                v-model="condition"
                type="radio"
                value="Fair"
                name="Fair"
              />
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
      <p-button variant="primary" v-if="pending === true" loading
        >Fetching trade-in value</p-button
      >
      <p-button
        v-else
        class="button"
        @click="getTradeInValue"
        variant="primary"
        hide-label="{ s: false }"
        >Get your trade-in value</p-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import tradeInApi from '../../../core/tradeInApi';

export default defineComponent({
  props: ['testOptions', 'vehicleId', 'setPriceAdvisoryUrl', 'setRanges'],
  data() {
    return {
      condition: '',
      showMore: false,
      vehicleInfo: this.data,
      allOptions: this.options,
      selectedoptions: [],
      pending: false,
    };
  },
  methods: {
    moveTonextStage() {
      this.increamentStep();
    },

    toggleShowMoreOptions() {
      this.showMore = !this.showMore;
    },

    captureDefaultSelectedOptionsOnRender() {
      for (let i = 0; i < this.testOptions.length; i++) {
        if (
          this.testOptions[i].isTypical &&
          this.testOptions[i].optionType === 'Option'
        ) {
          this.selectedoptions.push(this.testOptions[i].vehicleOptionId);
        }
      }

      console.log(this.selectedoptions);
    },

    async getTradeInValue() {
      this.pending = true;
      try {
        const data = {
          vehicleId: this.vehicleId,
          mileage: this.vehicleInfo.mileage,
          zipCode: this.vehicleInfo.zipCode,
          optionIds: this.selectedoptions,
        };

        const res = await tradeInApi.getTraeInValue(data);
        const resJson = await res.json();
        console.log(resJson);

        this.getpriceAdvisoryUrl(resJson.toggles.priceAdvisorAPIKey);
        this.getPriceRange(resJson.valuations.prices);
        this.pending = false;
      } catch (err) {
        console.log(err);
      }
    },
    getpriceAdvisoryUrl(apiKey: string) {
      const priceAdvisoryUrl = `https://pauc.syndication.kbb.com/priceadvisorusedcar/tradein?APIKey=${apiKey}&VehicleId=${this.vehicleId}&OptionIds=${this.selectedoptions}&ZipCode=${this.vehicleInfo.zipCode}&Mileage=${this.vehicleInfo.mileage}&Condition=${this.condition}`;
      this.setPriceAdvisoryUrl(priceAdvisoryUrl);
      this.increamentStep();
      // try {
      //   const res = await tradeInApi.getPriceAdvisory(
      //     apiKey,
      //     this.vehicleId,
      //     this.selectedoptions,
      //     this.vehicleInfo.zipCode,
      //     this.vehicleInfo.mileage,
      //     this.condition
      //   );
      //   const resJson = await res.json();
      //   this.increamentStep();
      //   console.log(resJson);
      // } catch (err) {
      //   console.log(err);
      //   this.increamentStep();
      // }
    },
    getPriceRange(prices: any) {
      console.log(prices, 'over here');
      for (let i = 0; i < prices.length; i++) {
        if (
          prices[i].priceTypeDisplay.toLowerCase().includes('trade-in') &&
          prices[i].priceTypeDisplay
            .toLowerCase()
            .includes(this.condition.toLowerCase())
        ) {
          this.setRanges(prices[i].rangeHigh, prices[i].rangeLow);
         
        }
      }
    },
  },
  computed: {
    truncatedOptions() {
      if (this.showMore === true) {
        return this.getOnlyNameOptions;
      } else {
        return this.getOnlyNameOptions.slice(0, 10);
      }
    },
    getOnlyNameOptions() {
      let colors: Array<String> = [];
      for (let i = 0; i < this.testOptions.length; i++) {
        if (this.testOptions[i].optionType === 'Option') {
          colors.push(this.testOptions[i]);
        }
      }

      return colors;
    },
  },
  inject: ['step', 'data', 'increamentStep', 'options'],
  mounted() {
    this.captureDefaultSelectedOptionsOnRender();
    // console.log(this.testOptions, this.vehicleId);
  },
});
</script>
<style lang="" src="./StepTwo.scss"></style>
