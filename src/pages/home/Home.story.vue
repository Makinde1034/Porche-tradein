<script setup lang="ts">
import navigationData from '/@/components/main-navigation/__fixtures/navigation.json'
import stageHeaderData from '/@/components/stage-header/__fixtures/stage-header.json'
import teasersData from '/@/components/finder-teaser/__fixtures/teasers.json'

</script>
<template>
    <Story title="v2/pages/Home" icon="ri:home-5-line">
        <dwaas-main-navigation :title="navigationData.title" :icon="navigationData.icon" :items="navigationData.items"
            :location="navigationData.location">
            <template v-slot:navigation-logo>
                <dwaas-main-navigation-logo :href="'/dwaasdev/en'"
                    src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Testing-data/porschemarquetrademarkmedium3x.svg?rev=83c9d6d2a6b54fa8877747464da24346"
                    :arialabel="'Home'" alt="logo" />
            </template>
        </dwaas-main-navigation>
        <dwaas-stage-header :variant="stageHeaderData.variant" :slides="stageHeaderData.slides">
        </dwaas-stage-header>
        <dwaas-action-bar>
            <div class="action-bar__button-container">
                <dwaas-action-button icon="email" href="mailto:info@porsche.de" target="_blank">
                    <template v-slot:label>
                        info@porsche.de
                    </template>
                </dwaas-action-button>
                <div>
                    <p-divider orientation="vertical" class="action-bar__divider-vertical"></p-divider>
                </div>
                <dwaas-action-button icon="phone" href="tel:+49071191122 911" target="">
                    <template v-slot:label>
                        Call us
                    </template>
                </dwaas-action-button>
                <div>
                    <p-divider orientation="vertical" class="action-bar__divider-vertical"></p-divider>
                </div>
                <dwaas-action-button icon="steering-wheel" href="https://contact.porsche.com/uk/testdrive/"
                    target="_blank">
                    <template v-slot:label>
                        Request a Test Drive
                    </template>
                </dwaas-action-button>
                <div>
                    <p-divider orientation="vertical" class="action-bar__divider-vertical"></p-divider>
                </div>
                <dwaas-action-button icon="logo-whatsapp" href="https://wa.me/3712000000" target="_blank">
                    <template v-slot:label>
                        Whatsapp
                    </template>
                </dwaas-action-button>
            </div>
        </dwaas-action-bar>
        <div class="section">
            <dwaas-finder-teaser>
                <template v-slot:headline>{{ teasersData.title }}</template>
                <template v-slot:tiles>
                    <dwaas-finder-teaser-tile v-for="tile of teasersData.tiles" v-bind="tile">
                    </dwaas-finder-teaser-tile>
                </template>
            </dwaas-finder-teaser>
        </div>

    </Story>
</template>

<style>
.section {
    margin: 4.5rem 0;
}
</style>