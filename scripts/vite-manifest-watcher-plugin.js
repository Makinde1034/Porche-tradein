/* eslint @typescript-eslint/no-var-requires: "off" */
var exec = require('child_process').exec;

export default function manifestWatcher() {
  return {
    name: 'post-build',
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
