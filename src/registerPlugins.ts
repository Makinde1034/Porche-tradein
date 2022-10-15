import { App } from 'vue';
import plugins from './plugins';

export const registerPlugins = (app: App) => {
  Object.entries(plugins).forEach(([name, plugin]) => {
    if (name !== 'VueSitecore') {
      app.use(plugin);
    }
  });
};
