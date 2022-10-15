<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
    dealerId: '9671',
    localize: {
        detailsButton: 'Show Details',
        numberOfOwners: '{0} previous owners',
        availableNumber: '{0} Porsche are available',
        filter: 'Filter',
        condition: 'Condition',
        model: 'Model Series',
        allModels: 'All models',
        showResults: 'Show Results',
        previousCTA: 'Back to previous page',
    },
    emptyState: {
        title: 'Sorry. No cars are currently available.',
        text: 'Unfortunately we couldn’t find any cars that match the selected criteria. Please try another time.',
        previousCTA: 'Back to previous page'
    },
    errorState: {
        title: 'Sorry. Something failed.',
        text: 'Unfortunately we couldn’t load any cars. Please try refreshing the page or coming back another time if the error persists.',
        previousCTA: 'Back to previous page',
        refreshCTA: 'Refresh the page'
    }
})
</script>
<template>
    <Story title="v2/modules/car-finder/CarFinder" icon="simple-icons:porsche">
        <dwaas-car-finder v-bind="state">
            <template v-slot:headline>
                Car Finder
            </template>
        </dwaas-car-finder>
    </Story>
</template>