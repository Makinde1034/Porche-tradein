// <reference types="histoire" />

import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
    theme: {
      title: 'DwaaS',
      logo: {
        light: '/dwaas.svg',
/*         dark: '/dark-banner.png', */
      },
      colors: {
        primary: {
            50: '#FFBCC4',
            100: '#FFA2AE',
            200: '#FF6F82',
            300: '#FF3C56',
            400: '#FF0929',
            500: '#D5001C',
            600: '#A20015',
            700: '#6F000F',
            800: '#3C0008',
            900: '#090001',
          },
      },
    },
    setupFile: '/src/histoire.setup.ts',
    plugins: [
        HstVue(),
    ],
  /*   vite: {
      server: {
        proxy: {
          '/api': {
            target: 'https://dev.porsche.local/api',
            changeOrigin: true,
          }
        }
      }
    } */
  })