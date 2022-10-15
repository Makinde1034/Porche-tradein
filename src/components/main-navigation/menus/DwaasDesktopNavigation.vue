<script>
const props = {
  title: String,
  items: { type: Array, default: () => [] },
};
export default {
  name: 'DwaasDesktopNavigation',
  props,
  emits: ['toggleNavigation'],
};
</script>

<template>
  <div id="navDesktopWrapper" ref="navWrapper" class="main-navigation__wrapper">
    <ul ref="navContainer" class="main-navigation__container" role="menu">
      <dwaas-main-navigation-link
        v-for="(item, $index) in items"
        :key="$index"
        :href="item.href"
        :target="item.target"
        :has-sub-nav="item.hasSubNav"
        :items="item.subitems"
        :title="title"
        :text="item.text"
        :item="item"
        @close-mobile-navigation="emit('toggleNavigation')"
      >
        {{ item.text }}
      </dwaas-main-navigation-link>
    </ul>
    <slot name="navLinks"></slot>
  </div>
</template>
