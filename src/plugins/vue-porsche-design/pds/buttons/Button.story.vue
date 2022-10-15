<script lang="ts" setup>
import { hstEvent } from 'histoire/client'

const initState = () => ({
  label: 'Some Label',
  icon: false,
  disabled: false,
  loading: false,
  variant: 'primary',
  hideLabel: false,
  aria: {
    'aria-label': 'Some descriptive Label'
  }
})

const options = ['primary', 'secondary', 'tertiary']
</script>

<template>
  <Story title="v2/pds/Button" id="pds-button" icon="mdi:button-pointer" :layout="{
    type: 'grid',
  }">
    <Variant title="Playground" :init-state="initState">
      <template #default="{ state }">
        <p-button :variant="state.variant" :icon="state.icon" :disabled="state.disabled" :loading="state.loading"
          :aria="state.aria" :hide-label="state.hideLabel" @click="hstEvent('Click', $event)">{{ state.label }}
        </p-button>
      </template>
      <template #controls="{ state }">
        <!-- Interact with state here -->
        <HstText title="Label" v-model="state.label"></HstText>
        <HstSelect title="Variant" :options="options" v-model="state.variant"></HstSelect>
        <HstCheckbox title="Disabled" v-model="state.disabled"></HstCheckbox>
        <HstCheckbox title="Loading" v-model="state.loading"></HstCheckbox>
        <HstCheckbox title="Hide Label" v-model="state.hideLabel"></HstCheckbox>
        <HstText title="Icon" v-model="state.icon"></HstText>
        <HstText title="Aria Label" v-model="state.aria['aria-label']"></HstText>
      </template>
    </Variant>
    <Variant title="Primary" :init-state="initState">
      <template #default="{ state }">
        <p-button variant="primary">{{ state.label }}</p-button>
      </template>
    </Variant>
    <Variant title="Secondary" :init-state="initState">
      <template #default="{ state }">
        <p-button variant="secondary">{{ state.label }}</p-button>
      </template>
    </Variant>
    <Variant title="Tertiary" :init-state="initState">
      <template #default="{ state }">
        <p-button variant="tertiary">{{ state.label }}</p-button>
      </template>
    </Variant>
    <Variant title="Disabled">
      <p-button disabled>Disabled</p-button>
    </Variant>
    <Variant title="Loading">
      <p-button loading>Loading</p-button>
    </Variant>
    <Variant title="Hide Label">
      <p-button hide-label="true">Hide Label</p-button>
    </Variant>
    <Variant title="Responsive Hide Label">
      <p-button hide-label="{ base: true, l: false}">Use mobile</p-button>
    </Variant>
    <Variant title="ARIA">
      <p-button aria="{ 'aria-label': 'Some descriptive Label'}">ARIA</p-button>
    </Variant>
    <Variant title="Icon">
      <p-button variant="primary" icon="steeringWheel">Request Drive</p-button>
    </Variant>
  </Story>
</template>

<docs lang="md">
# PDS Button

Official documentation [here](https://designsystem.porsche.com/v2/components/button/examples)
</docs>