<script>
const props = {
  name: String,
  label: String,
};
export default {
  name: 'DwaasIconNavigationLink',
  props,
};
</script>
<template>
  <p-link-social
    v-bind="$attrs"
    class="icon-nav__icon"
    :icon="name"
    hide-label="true"
    :theme="`light`"
  >
    {{ label }}
  </p-link-social>
</template>

<style lang="scss" src="./DwaasIconNavigation.scss"></style>
