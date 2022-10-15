<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({

})
</script>
<template>
    <Story title="v2/modules/ActionBar" icon="radix-icons:button">
        <Variant title="Default">
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
        </Variant>
    </Story>
</template>