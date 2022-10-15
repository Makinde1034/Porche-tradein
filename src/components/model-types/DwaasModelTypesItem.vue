<script>
export default {
  name: 'DwaasModelTypesItem',
};
</script>

<template>
  <p-grid direction="{ base: 'column', m: 'row' }" wrap="wrap">
    <slot name="divider" />
    <p-grid-item
      class="model-types__name"
      offset="{ base: 0, m: 1 }"
      size="{ base: 12, m: 2 }"
    >
      <p-headline theme="dark" variant="headline-3">
        <slot name="name" />
      </p-headline>
    </p-grid-item>
    <p-grid-item class="model-types__description" size="{ base: 12, m: 8 }">
      <p-text theme="dark">
        <slot name="description" />
      </p-text>
    </p-grid-item>
  </p-grid>
</template>
