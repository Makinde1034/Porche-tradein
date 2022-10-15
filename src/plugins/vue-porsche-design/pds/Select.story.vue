<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  options: [911, 718, 'Cayman', 'Panamera', 'Taycan']
})
</script>

<template>
  <Story title="v2/pds/Select" id="pds-select" icon="mdi:form-dropdown">
    <Variant title="playground">
      <div class="htw-p-8">
        <p-select-wrapper label="Some label" hide-label="false">
          <select name="some-name">
            <option :value="option" v-for="option of state.options">{{ option }}</option>
          </select>
        </p-select-wrapper>
      </div>
    </Variant>
  </Story>
</template>