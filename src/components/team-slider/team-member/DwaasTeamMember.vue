<script>
import { TEAM_MEMBER_SOURCES } from '../consts';

const props = {
  media: {
    type: Object,
  },
  alt: {
    type: String,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  email: {
    type: Object,
  },
  phone: {
    type: Object,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: 'DwaasTeamMember',
  props,
  setup() {
    return {
      TEAM_MEMBER_SOURCES,
    };
  },
};
</script>
<template>
  <div ref="el" class="team-member" :aria-hidden="!isActive">
    <dwaas-media-image
      v-if="media"
      class="team-member__img"
      :src="media.src"
      :alt="media.alt"
      aspect-ratio="4/5"
      :sources="TEAM_MEMBER_SOURCES"
      :full-width-on-max="true"
    />
    <div class="team-member__content">
      <p-text size="medium" weight="thin" tag="h3" class="team-member__title">
        {{ title }}
      </p-text>
      <div class="team-member__subtitle">
        <p-text> {{ subtitle }} &#8203; </p-text>
      </div>
      <p-link-pure
        v-if="email && email.url"
        class="team-member__link"
        icon="email"
        stretch="true"
        :tabindex="isVisible ? undefined : -1"
        :href="email.url"
        :target="email.target"
      >
        {{ email.label }}
      </p-link-pure>
      <p-link-pure
        v-if="phone && phone.url"
        class="team-member__link"
        icon="phone"
        stretch="true"
        :tabindex="isVisible ? undefined : -1"
        :href="phone.url"
        :target="phone.target"
      >
        {{ phone.label }}
      </p-link-pure>
    </div>
  </div>
</template>

<style lang="scss" src="./DwaasTeamMember.scss"></style>
