<script>
import { useBootstrapper } from '/@/composables';

const props = {
  headers: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  caption: {
    type: String,
    default: '',
  },
};

export default {
  name: 'DwaasTable',
  props,
  setup() {
    const { el } = useBootstrapper();

    return {
      el,
    };
  },
};
</script>
<template>
  <p-content-wrapper ref="el" class="table" width="basic">
    <p-table :caption="caption" class="table__data">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell v-for="header in headers" :key="header">{{
            header
          }}</p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
      <p-table-body>
        <p-table-row v-for="row in data" :key="row">
          <p-table-cell v-for="cell in row" :key="cell" multiline="true">{{
            cell
          }}</p-table-cell>
        </p-table-row>
      </p-table-body>
    </p-table>
  </p-content-wrapper>
</template>
<style lang="scss" src="./DwaasTable.scss" />
