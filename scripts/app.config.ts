/**
 * BASE Application Config
 * this config properties will be used for the build setup.
 *
 * please do not change this file. If you need to use
 * different values, please use environment variables to change the values.

 * EXAMPLE
 * if you want to use a different path for the local build,
 * please adjust the `.env.local` file in the root folder.
 *
 * Your .env.local might look like:
 * ```
 * VITE_DWAAS_DIST_DIR=VITE_DWAAS_DIST_DIR=S:\\inetpub\\wwwroot\\dev.porsche.local\\public\\dwaas
 * VITE_DWAAS_BASE_PATH=/public/dwaas/
 * ```
 */
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const DEFAULT_DIST_DIR = 'dist';
const DEFAULT_BASE_PATH = '/';

// override local configuration if needed
const localPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(localPath)) {
  dotenv.config({ path: localPath });

  console.log(
    `Using .env.local for distDir: ${process.env.VITE_DWAAS_DIST_DIR}`
  );
  console.log(
    `Using .env.local for basePath: ${process.env.VITE_DWAAS_BASE_PATH}`
  );
}

// the target directory for the build output
const distDir = process.env.VITE_DWAAS_DIST_DIR || DEFAULT_DIST_DIR;
// the base path on the server where the build files are located
const basePath = process.env.VITE_DWAAS_BASE_PATH || DEFAULT_BASE_PATH;

export { distDir, basePath };
