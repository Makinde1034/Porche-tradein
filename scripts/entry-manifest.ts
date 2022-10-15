import * as pdsPartials from '@porsche-design-system/components-js/partials';
import fs from 'fs';
import { resolve } from 'pathe';
import { logInfo } from './utils';

import browserNotification from '@porsche-design-system/browser-notification';
import { Manifest } from 'vite';
import { EntryManifest } from '../src/types';
/**
 * creates the manifest that is used to implement the js and css
 * into the page skeleton in Sitecore. Also it add the partials of
 * the pds and the browser notification scripts as string.
 *
 * @param {String} distDir absolute path to the distribution directory
 * @returns {Object} the final app entry as js object
 */
export async function createEntryManifest(
  distDir: string
): Promise<EntryManifest> {
  const manifestPath = resolve(distDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      'Build manifest file does not exists. Make sure, the build runs with manifest set to true'
    );
  }

  logInfo(`[APP ENTRY]: create entry manifest from ${manifestPath}`);

  const manifest: Manifest = await import(manifestPath);

  const entries = Object.values(manifest).filter((value) => value.isEntry);

  /*   const legacyEntry = entries.find((entry) => entry.src.includes('index-legacy.html'));
  const legacyPolyfills = entries.find((entry) => entry.src.includes('legacy-polyfills'));
  const legacyPreload = legacyEntry.imports.map((entry) => `/${manifest[entry].file}`); */

  const mainEntry = entries.find((entry) => entry.src?.includes('index.html'));
  const mainCSSFiles = mainEntry?.css?.map((file) => `/${file}`);
  const mainPreload = (mainEntry?.imports || []).map(
    (entry) => `/${manifest[entry].file}`
  );

  return {
    /*     legacy: {
      entry: `/${legacyEntry.file}`,
      polyfill: `/${legacyPolyfills.file}`,
      preload: legacyPreload,
    }, */
    main: {
      entry: `/${mainEntry?.file}`,
      css: mainCSSFiles,
      preload: mainPreload,
    },
    pds: {
      meta: pdsPartials.getMetaTagsAndIconLinks({ appTitle: 'DwaaS' }),
      loader: pdsPartials.getLoaderScript(),
      styles: pdsPartials.getInitialStyles(),
      fonts: pdsPartials.getFontFaceStylesheet({ withoutTags: true }),
      chunks: pdsPartials.getComponentChunkLinks({
        components: [
          'content-wrapper',
          'button',
          'text',
          'headline',
          'button-pure',
        ],
      }),
    },
    browser: {
      banner: browserNotification.includeBanner(),
      overlay: browserNotification.includeOverlay(),
    },
  };
}

/**
 * Writes the entry manifest to the app-entry.json
 * into the a given distribution directory.
 * @param {String} distDir absolute path of the distribution directory
 * @param {Object} entryManifest the full manifest as js object
 */
export function writeEntryManifest(
  distDir: string,
  entryManifest: EntryManifest
): void {
  const entryPath = resolve(distDir, 'app-entry.json');
  fs.writeFileSync(entryPath, JSON.stringify(entryManifest, null, 2));
  logInfo(`[APP ENTRY]: write app entry to ${entryPath}`);
}
