<script lang="ts" setup>
import { hstEvent } from 'histoire/client'

const initState = () => ({
    label: 'Some Label',
    disabled: false,
    icon: false,
    loading: false,
    hideLabel: false,
    active: true,
    weight: 'regular',
    alignLabel: 'right',
    stretch: false,
    size: 'small',
    aria: {
        'aria-label': 'Some descriptive Label'
    }
})

const sizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'inherit'
]

const weights = [
    'thin',
    'regular',
    'bold'
]

const alignments = [
    'left', 'right'
]
</script>

<template>
    <Story title="v2/pds/ButtonPure" icon="material-symbols:smart-button">
        <Variant title="Playground" :init-state="initState">
            <template #default="{ state }">
                <p-button-pure v-bind="state" @click="hstEvent('Click', $event)">{{ state.label
                }}</p-button-pure>
            </template>
            <template #controls="{ state }">
                <!-- Interact with state here -->
                <HstText title="Label" v-model="state.label"></HstText>
                <HstSelect title="Size" :options="sizes" v-model="state.size"></HstSelect>
                <HstSelect title="Weight" :options="weights" v-model="state.weight"></HstSelect>
                <HstSelect title="Alignment" :options="alignments" v-model="state.alignLabel"></HstSelect>
                <HstCheckbox title="Disabled" v-model="state.disabled"></HstCheckbox>
                <HstCheckbox title="Loading" v-model="state.loading"></HstCheckbox>
                <HstCheckbox title="Hide Label" v-model="state.hideLabel"></HstCheckbox>
                <HstText title="Aria Label" v-model="state.aria['aria-label']"></HstText>
            </template>
        </Variant>
        <Variant title="Disabled">
            <p-button-pure disabled>Disabled</p-button-pure>
        </Variant>
        <Variant title="Loading">
            <p-button-pure loading>Loading</p-button-pure>
        </Variant>
        <Variant title="Hide Label">
            <p-button-pure hide-label="true">Hide Label</p-button-pure>
        </Variant>
        <Variant title="Responsive Hide Label">
            <p-button-pure hide-label="{ base: true, l: false}">Use mobile</p-button-pure>
        </Variant>
        <Variant title="ARIA">
            <p-button-pure aria="{ 'aria-label': 'Some descriptive Label'}">ARIA</p-button-pure>
        </Variant>
        <Variant title="Icon">
            <p-button-pure icon="steeringWheel">Request Drive</p-button-pure>
        </Variant>
        <Variant title="No Icon">
            <p-button-pure icon="none">No icon</p-button-pure>
        </Variant>
        <Variant title="Sizes">
            <div class="grid">
                <p-button-pure v-for="size of sizes" :key="size" :size="size">Some Label</p-button-pure>
            </div>
        </Variant>
        <Variant title="Responsive Size">
            <p-button-pure size="{ base: 'small', l: 'medium' }">Awiwi</p-button-pure>
        </Variant>
        <Variant title="Weights">
            <div class="grid">
                <p-button-pure v-for="weight of weights" :key="weight" :weight="weight">Some Label</p-button-pure>
            </div>
        </Variant>
        <Variant title="Alignments">
            <div class="grid">
                <p-button-pure v-for="alignment of alignments" :key="alignment" :align-label="alignment">Some Label
                </p-button-pure>
            </div>
        </Variant>
        <Variant title="Stretch">
            <p-button-pure stretch="true">Stretched</p-button-pure>
        </Variant>
        <Variant title="With Subline">
            <p-button-pure stretch="true">Some label
                <p slot="subline">Some Subline</p>
            </p-button-pure>
        </Variant>
    </Story>
</template>

<docs lang="md">
# PDS Button Pure

Official documentation [here](https://designsystem.porsche.com/v2/components/button-pure/examples)
</docs>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 1rem;
    gap: 1rem;
}
</style>