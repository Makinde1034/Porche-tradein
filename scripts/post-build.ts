#!/usr/bin/env node

import { logInfo } from './utils';
import { createEntryManifest, writeEntryManifest } from './entry-manifest';

import { distDir } from './app.config';
import { EntryManifest } from '../src/types';

// app entry manifest for use in the Sitecore page skeleton
logInfo('\nAPP ENTRY');
createEntryManifest(distDir).then((entryManifest: EntryManifest) => {
  writeEntryManifest(distDir, entryManifest);
});
