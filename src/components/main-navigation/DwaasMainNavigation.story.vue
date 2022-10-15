<script lang="ts" setup>
import { reactive } from 'vue';
import navigationData from './__fixtures/navigation.json'

const state = reactive(navigationData)
</script>

<template>
    <Story title="v2/modules/MainNavigation" icon="gg:toolbar-top">
        <dwaas-main-navigation :title="state.title" :icon="state.icon" :items="state.items" :location="state.location" :dealer="state.dealer">
            <template v-slot:navigation-logo>
                <dwaas-main-navigation-logo :href="'/dwaasdev/en'"
                    src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Testing-data/porschemarquetrademarkmedium3x.svg?rev=83c9d6d2a6b54fa8877747464da24346"
                    :arialabel="'Home'" alt="logo" />
            </template>
        </dwaas-main-navigation>
    </Story>
</template>