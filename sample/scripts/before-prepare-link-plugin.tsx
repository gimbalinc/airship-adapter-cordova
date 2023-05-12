import * as path from 'path';
import {
  existsSync, lstatSync, mkdirSync, symlinkSync,
} from 'fs';

export default (context) => {
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
