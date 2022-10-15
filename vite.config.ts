/// <reference types="histoire" />

import {
  defineConfig,
  loadEnv,
  UserConfig,
  splitVendorChunkPlugin,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'pathe';
import { visualizer } from 'rollup-plugin-visualizer';
import { dynamicBase } from 'vite-plugin-dynamic-base';

import manifestWatcher from './scripts/vite/plugins/manifestWatcher';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`
  Vite Setup
  ----------
  mode:      ${mode}
  base path: ${env.VITE_DWAAS_BASE_PATH}
  dist dir:  ${env.VITE_DWAAS_DIST_DIR}
  `);

  const config: UserConfig = {
    mode,
    base: command === 'serve' ? '/' : env.VITE_DWAAS_BASE_PATH,
    resolve: {
      extensions: ['.js', '.json', '.ts', '.vue', '.scss', '.css'],
      alias: {
        '/@': resolve(__dirname, './src'),
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            //  whitespace as in vue 3
            whitespace: 'condense',

            /**
             * define all porsche design system (PDS) elements
             * as custom elements, to make vue aware of the PDS elements.
             *
             * @param tagName the elements tag name
             * @returns tag name matches a custom element
             */
            isCustomElement(tagName: string) {
              // define all porsche design system (PDS) elements
              // as custom elements, to make vue aware of
              // the PDS elements.
              return tagName.startsWith('p-') || tagName.startsWith('phn-');
            },
          },
        },
      }),
      /**
       * vite is not splitting the vendors automatically since version 9
       * see: https://vitejs.dev/guide/build.html#chunking-strategy
       * In order to split the vendors, we need to implement a plugin for that.
       */
      splitVendorChunkPlugin(),
      manifestWatcher(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@porsche-design-system/utilities/scss';
          `,
        },
      },
    },
    build: {
      outDir: env.VITE_DWAAS_DIST_DIR || '/',
      minify: mode === 'development' ? false : 'terser',
      manifest: true,
      sourcemap: mode === 'development',
      emptyOutDir: mode === 'production',
    },
  };

  if (mode === 'production') {
    config.plugins.push(
      dynamicBase({
        publicPath: 'window.PAGEINFO.cdnUrl',
      })
    );
  }
  config.plugins.push(
    visualizer({
      filename: resolve(env.VITE_DWAAS_DIST_DIR || '/', 'stats.html'),
      gzipSize: true,
      brotliSize: true,
    })
  );

  return config;
});
