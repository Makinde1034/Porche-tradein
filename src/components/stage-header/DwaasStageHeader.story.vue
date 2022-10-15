<script setup lang="ts">
import { reactive } from 'vue';
import stageHeaderData from './__fixtures/stage-header.json'
const state = reactive(stageHeaderData)
</script>
<template>
    <Story title="v2/modules/StageHeader" icon="icon-park-twotone:multi-picture-carousel">
        <Variant title="Default">
            <dwaas-stage-header :variant="state.variant" :slides="state.slides">
            </dwaas-stage-header>
        </Variant>
    </Story>
</template>