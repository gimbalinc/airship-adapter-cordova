/* eslint-disable func-names */
/**
 * This hook creates the symlink to the adapter plugin to eliminate the need to call
 * `cordova plugin add [path] --link` on a fresh install.
 */
const path = require('node:path');
const {
  existsSync, lstatSync, mkdirSync, symlinkSync,
} = require('node:fs');

module.exports = function (context) {
  const pluginsDir = path.join(context.opts.projectRoot, 'plugins');
  const gimbalPluginDir = path.join(pluginsDir, 'cordova-plugin-gimbal-airship-adapter');

  if (!existsSync(pluginsDir)) {
    mkdirSync(pluginsDir);
    console.log('Created plugins dir');
  }

  const gimbalStats = lstatSync(gimbalPluginDir, { throwIfNoEntry: false });
  if (gimbalStats === undefined) {
    symlinkSync(
      path.join(context.opts.projectRoot, '..'),
      gimbalPluginDir,
    );
    console.log('Created symlink for cordova-plugin-gimbal-airship-adapter');
  } else if (!gimbalStats.isSymbolicLink()) {
    console.log('(warning) cordova-plugin-gimbal-airship-adapter is not symlink');
  }
};
