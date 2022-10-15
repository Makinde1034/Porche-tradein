import { type Plugin } from 'vite';
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const exec = require('child_process').exec;

export default function manifestWatcher(): Plugin {
  return {
    name: 'dwaas-post-build',
    async buildStart() {
      console.log('[DwaaS] - Build Start ⚡️');
    },
    async writeBundle() {
      console.log('[DwaaS] - Generating manifest ⚙️');

      exec('npm run postbuild', function (err, stdout) {
        if (err) {
          // handle error
          console.error(
            '[DwaaS] - There was an error running the postbuild script'
          );
        }
        console.log(stdout);
      });
    },
  };
}
