<template lang="">
  <div class="thank">
    <h3>Dear Bryan</h3>
    <p>
      Thanks for contacting us regarding this vehicle. We will ensure that
      someone gets back to you as soon as possible (No more than 24 hours).
      <br />
      <br />
      Alternatively please feel free to contact Porsche North Houston directly.
      <br />
      <br />
      Kind Regards
      <br />
      <br />
      Porsche North Houston
    </p>
  </div>
</template>
<script>

import { defineComponent, ref } from 'vue';


export default defineComponent({
  // type inference enabled
  props: ['setOptions', 'setVehicleId'],
  components: {},
  data() {
    
    
  },

  methods: {
  
  },
  computed: {
    
  },
  inject: [ 'data', ],

  
});
</script>
<style lang="" src="./ThankYou.scss"></style>
