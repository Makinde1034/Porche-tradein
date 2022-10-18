import { createPinia } from 'pinia';
import { createApp } from 'vue';
// import { pinia } from './store';
import { VueSitecore, VueMasonryCSS } from './plugins';
import FloatingVue from 'floating-vue';
import './styles/_global.scss';
import { registerComponents } from './registerComponents';
import { registerPlugins } from './registerPlugins';
import './lazysizes';

const app = createApp({});
// app.use(pinia);

const pinia = createPinia();

registerPlugins(app);

app.use(pinia);

app.use(VueSitecore, { components: [] });

app.use(VueMasonryCSS);

app.use(FloatingVue);

// Hack for XE and Vue3
const preKeys = Array.from(
  document.querySelectorAll('code[type="text/sitecore"]')
).map((el: Element) => el?.attributes.getNamedItem('key')?.value);

// Hack for all the scripts that Sitecore injects into the DOM
const sitecoreScripts = Array.from(
  document.querySelectorAll('#wrapper script')
).map((el: Element) => el?.parentElement?.removeChild(el));

registerComponents(app);

app.config.performance = true;

app.mount('#wrapper');

const placeholders = document.querySelectorAll('code[type="text/sitecore"]');

placeholders.forEach((el, index) => {
  el.setAttribute('v-pre', '');
  if (preKeys[index]) {
    el.setAttribute('key', preKeys[index] as string);
  }
});

sitecoreScripts.forEach((el) => {
  document.body.appendChild(el as Node);
});
