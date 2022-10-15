<script setup lang="ts">
import { reactive } from 'vue';
import teasersData from './__fixtures/teasers.json'

const state = reactive(teasersData)
</script>
<template>
    <Story title="v2/modules/FinderTeaser" icon="radix-icons:button">
        <dwaas-finder-teaser>
            <template v-slot:headline>{{ state.title }}</template>
            <template v-slot:tiles>
                <dwaas-finder-teaser-tile v-for="tile of state.tiles" v-bind="tile">
                </dwaas-finder-teaser-tile>
            </template>
        </dwaas-finder-teaser>
    </Story>
</template>