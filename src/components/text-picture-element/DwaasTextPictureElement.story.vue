<script lang="ts" setup>
import { hstEvent } from 'histoire/client'

</script>

<template>
  <Story title="v2/modules/TextPictureElement" icon="mdi:image-text">
    <Variant title="Full">

      <dwaas-text-picture-element
        src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Models_AR/4-3/718-boxster-gts-1-3840x2880.jpg?rev=fcfebc4820a84710b8eb312f337ef9c9"
        mobile-src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Models_AR/4-3/718-boxster-gts-1-3840x2880.jpg?rev=fcfebc4820a84710b8eb312f337ef9c9"
        alt="'contains &quot;'" width="3840" height="2880">
        <template v-slot:headline>
          Performance, electrified.
        </template>
        <template v-slot:text>
          Performance, G-Kr&#228;fte, Adrenalinsch&#252;be. Daf&#252;r stehen wir aus Tradition. Doch woran denken wir
          bei Porsche heute, wenn wir an morgen denken? An den Sportwagen der Zukunft nat&#252;rlich. Kompromisslos auf
          ganzer Linie. Mit einem Gesamtkonzept, das maximalen Fahrspa&#223;, eine durchdachte Ladeinfrastruktur und
          zukunftsweisende Konnektivit&#228;t vereint. Und Ihnen die Hauptrolle gibt: als Fahrer Ihres Sportwagens.
        </template>
        <template v-slot:button>
          <p-link class="text-picture-element__button"
            href="https://www.porsche.com/germany/aboutporsche/e-performance/" target="" variant="tertiary"
            @click="hstEvent('Button Click', $event)">
            E - performance
          </p-link>
        </template>
      </dwaas-text-picture-element>
    </Variant>
    <Variant title="No Text">

      <dwaas-text-picture-element
        src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Models_AR/4-3/718-boxster-gts-1-3840x2880.jpg?rev=fcfebc4820a84710b8eb312f337ef9c9"
        mobile-src="https://dev.porsche.local/dwaasdev/-/media/Project/DealerWebsites/DevelopmentSite/Models_AR/4-3/718-boxster-gts-1-3840x2880.jpg?rev=fcfebc4820a84710b8eb312f337ef9c9"
        alt="'contains &quot;'" width="3840" height="2880">
        <template v-slot:headline>
          Performance, electrified.
        </template>
        <template v-slot:button>
          <p-link class="text-picture-element__button"
            href="https://www.porsche.com/germany/aboutporsche/e-performance/" target="" variant="tertiary"
            @click="hstEvent('Button Click', $event)">
            E - performance
          </p-link>
        </template>
      </dwaas-text-picture-element>
    </Variant>
  </Story>
</template>