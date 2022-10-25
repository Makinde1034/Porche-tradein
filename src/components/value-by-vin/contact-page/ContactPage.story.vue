<template lang="">
  <form @submit.prevent="submitForm" class="contact">
    <header>
      <h3>My Kelley Blue Book®</h3>
      <p>
        {{ vehicleData.trim }} 
      </p>
      <p>
        Value trade-in range is $38,339 - $40,988, and my trade-in value is
        $39,664 <br />
        * Reference only, the actual value may change
      </p>
    </header>
    <p-textarea-wrapper
      class="contact__textarea"
      label="Your Message (Optional)"
      hide-label="false"
      >``
      <textarea name="Your Message (Optional)"></textarea>
    </p-textarea-wrapper>
    <section class="input__wrap">
      <div class="input__box">
        <p-text-field-wrapper label="First Name" hide-label="false">
          <input
            type="text"
            name="First name"
            placeholder="Please enter your name"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Last Name" hide-label="false">
          <input
            type="text"
            name="some-name"
            placeholder="Please enter your last name"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Email" hide-label="false">
          <input
            type="text"
            name="Email"
            placeholder="Please enter your email"
          />
        </p-text-field-wrapper>
      </div>
      <div class="input__box">
        <p-text-field-wrapper label="Phone (Optional)" hide-label="false">
          <input
            type="text"
            name="some-name"
            placeholder="Please enter your phone number"
          />
        </p-text-field-wrapper>
      </div>
    </section>
    <section class="contact__privacy">
      <h3>Privacy Policy</h3>
      <P
        >*Please note: By providing your contact information we assume that you
        are consenting to be contacted by Porsche Cars North America, Inc.
        (PCNA), its affiliate companies and our authorized Porsche dealers. If
        you don't wish to be contacted in this manner, please do not provide
        your email and/or phone information, as applicable. To the extent
        permitted by law, your permission supersedes any prior opt-outs given to
        PCNA as well as any government registries of Do Not Call Lists. Your
        information may be used to inform you about Porsche products, services,
        news and events in accordance with our Privacy Notice, available at
        https://www.porsche.com/usa/privacy-policy/. You may opt out at any time
        by calling 1-800-PORSCHE or by sending an email to privacy@porsche.us.
        California residents may view information about PCNA’s privacy practices
        and rights they may have under California law in our Privacy Notice, in
        the section titled “Additional Notice to California Consumers".
      </P>
    </section>
    <section class="contact__security">
      <div>
        <p style="color: #018a16">SSL encryption</p>
        <p>Your data is safe</p>
      </div>
      <img src="../../assets/images/lock.svg" alt="" />
    </section>
    <section class="contact__button">
      <p-button class="button" variant="primary" hide-label="{s: false }"
        >Submit</p-button
      >
    </section>
  </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['vehicleData'],
  data() {
    return {};
  },
  methods: {
    // submitForm() {
    //   this.increamentStep();
    // },
  },
  mounted() {
    console.log(this.vehicleData);
  },
});
</script>
<style scoped lang="" src="./ContactPage.scss"></style>
