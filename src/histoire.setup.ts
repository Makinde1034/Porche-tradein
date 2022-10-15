import FloatingVue from 'floating-vue';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import './lazysizes';
import { VueGDL } from './plugins';
import { VueCookieConsent } from './plugins/vue-cookies';
import VuePDS from './plugins/vue-porsche-design';
import { registerComponents } from './registerComponents';

export const setupVue3 = defineSetupVue3(({ app }) => {
  registerComponents(app);
  app.use(VueGDL);
  app.use(VuePDS);
  app.use(VueCookieConsent);
  app.use(FloatingVue);
});
