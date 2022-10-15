<script setup lang="ts">
import navigationData from '/@/components/main-navigation/__fixtures/navigation.json'
import stageHeaderData from '/@/components/stage-header/__fixtures/stage-header.json'
import teasersData from '/@/components/finder-teaser/__fixtures/teasers.json'

</script>

<template>
    <Story title="v2/pages/TradeIn" icon="ri:home-5-line">
        <!-- <dwaas-main-navigation :title="navigationData.title" :icon="navigationData.icon" :items="navigationData.items"
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
        </dwaas-action-bar> -->
        <p-content-wrapper ref="el" width="basic" class="car-finder">
            <div class="section">
                <p-select-wrapper filter="true" label="Year">
                    <select name="year" required>
                        <option disabled>Please select Year</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper filter="true" label="Make">
                    <select name="make" required>
                        <option disabled>Please select a Make</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper filter="true" label="Model">
                    <select name="model" required>
                        <option disabled>Please select a Model</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper filter="true" label="Trim">
                    <select name="trim" required>
                        <option disabled>Please select a Trim</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                    </select>
                </p-select-wrapper>
                <p-select-wrapper filter="true" label="Vehicle Color" state="success"
                    message="Some success validation message.">
                    <select name="color" required aria-invalid="false">
                        <option disabled>Please select a Color</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                    </select>
                </p-select-wrapper>
                <p-text-field-wrapper label="Mileage" hide-label="false">
                    <input type="text" placeholder="Please enter the current mileage" name="mileage" required />
                </p-text-field-wrapper>
                <p-text-field-wrapper label="Zip Code" hide-label="false">
                    <input type="text" placeholder="Please enter your zip code" name="zip" required />
                </p-text-field-wrapper>
                <p-button class="submit" variant="primary" disabled>Next</p-button>
            </div>
        </p-content-wrapper>
    </Story>
</template>

<style scoped lang="scss" src="./TradeIn.scss">

</style>
