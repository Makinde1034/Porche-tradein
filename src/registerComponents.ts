import { App, Component } from 'vue';
import { DwaasComponent } from './types';


const modules = import.meta.globEager('./components/**/!(*.spec|*.test|*.story).vue');

const dashFormat = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

const components = Object.entries(modules).map(
  ([key, component]: [string, Component]): [string, Component] => {
    const filename: string | undefined = key.split('/').pop();
    const name = dashFormat((filename as string).split('.')[0]);

    return [name, component];
  }
);

export const registerComponents = (
  app: App,
  list: [string, Component][] = components
) => {
  list.forEach(([name, component]) => {
    app.component(name, (component as DwaasComponent).default);
  });
};
