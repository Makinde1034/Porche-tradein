<script>
import { reactive, watch, onMounted, computed } from 'vue';
import { useFinderAPI } from '/@/composables';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { AnalyticsEvents, MODULE_PREFIX } from '../consts';

const props = {
  localize: {
    type: Object,
    default: () => ({
      condition: '',
      allModels: 'All Models',
      showResults: '',
      preowned: 'Preowned',
      newLabel: 'New',
    }),
  },
  defaultFilters: {
    type: Object,
    default: () => ({
      model: null,
      condition: [],
    }),
  },
};

export default {
  name: 'DwaasCarFinderFilters',
  props,
  emits: ['change'],
  setup(props, { emit }) {
    // Feature: filters
    const filters = reactive(props.defaultFilters);

    const { fetchFilters, conditions, models, updateQueryParams } =
    useFinderAPI();

    onMounted(async () => {
      await fetchFilters();
    });

    const modelOptions = computed(() => [
      {
        value: 'null',
        localize: props.localize.allModels,
      },
      ...models.value,
    ]);

    // Feature: analytics
    const {
      pushCustomGdlEvent,
      componentClickEvent,
      componentNavigationEvent,
    } = useGDL();

    function onModelChange($event) {
      const filterModel = $event.target.value;

      const model = modelOptions.value.find(
        (model) => model.value === filterModel
      );
      filters.model = filterModel === 'null' ? null : filterModel;

      pushCustomGdlEvent(AnalyticsEvents.CARFINDER_FILTER_MODEL_CLICK, {
        componentClick: componentClickEvent($event, {
          clickElementName: model?.localize,
        }),
        componentNavigation: componentNavigationEvent($event, {
          componentPrefix: MODULE_PREFIX,
          itemName: model?.localize,
        }),
      });
    }

    function onConditionCheck($event, condition) {
      filters.condition = filters.condition.some((el) => el === condition)
        ? filters.condition.filter((el) => el !== condition)
        : [...filters.condition, condition];

      pushCustomGdlEvent(AnalyticsEvents.CARFINDER_FILTER_CONDITION_CLICK, {
        componentClick: componentClickEvent($event, {
          clickElementName: filters.condition.join(','),
        }),
        componentNavigation: componentNavigationEvent($event, {
          componentPrefix: MODULE_PREFIX,
          itemName: filters.condition.join(','),
        }),
      });
    }

    function isOptionSelected(prop, value) {
      return (
        (Array.isArray(filters[prop]) &&
          filters[prop].length &&
          filters[prop].find((propValue) => propValue === value)) ||
        value === filters[prop]
      );
    }

    watch(filters, (value) => {
      emit('change', value);
      updateQueryParams(value);
    });

    return {
      filters,
      conditions,
      modelOptions,
      onModelChange,
      onConditionCheck,
      isOptionSelected,
    };
  },
};
</script>
<template>
  <div class="car-finder-filters">
    <form class="car-finder-filters__form" action="">
      <p-fieldset-wrapper class="car-finder-filters__fieldset">
        <label slot="label" class="car-finder-filters__label" for="condition">
          <p-text weight="bold">{{ localize.condition }}</p-text>
        </label>
        <p-checkbox-wrapper
          v-for="option in conditions"
          :key="option.value"
          :label="option.localize"
          hide-label="false"
          class="car-finder-filters__checkbox"
        >
          <input
            type="checkbox"
            :name="option.value"
            :checked="isOptionSelected('condition', option.value)"
            @change="onConditionCheck($event, option.value)"
          />
        </p-checkbox-wrapper>
      </p-fieldset-wrapper>
      <p-divider />
      <p-fieldset-wrapper class="car-finder-filters__fieldset">
        <label
          slot="label"
          class="car-finder-filters__label"
          for="model-series"
        >
          <p-text weight="bold">{{ localize.model }}</p-text>
        </label>
        <p-select-wrapper class="car-finder-filters__dropdown">
          <select name="model-series" @change="onModelChange">
            <option
              v-for="model in modelOptions"
              :key="model.value"
              :value="model.value"
              :selected="isOptionSelected('model', model.value)"
            >
              {{ model.localize }}
            </option>
          </select>
        </p-select-wrapper>
      </p-fieldset-wrapper>
    </form>
  </div>
</template>

<style lang="scss" src="./DwaasCarFinderFilters.scss"></style>
