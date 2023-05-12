import * as path from 'path';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

function renameOutputFolder(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    fs.rename(buildFolderPath, outputFolderPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Successfully built!');
      }
    });
  });
}

function execPostReactBuild(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(buildFolderPath)) {
      if (fs.existsSync(outputFolderPath)) {
        rimraf.rimraf(outputFolderPath, {}).then(() => {
          renameOutputFolder(buildFolderPath, outputFolderPath)
            .then((val) => resolve(val))
            .catch((e) => reject(e));
        }).catch((err) => {
          if (err) {
            reject(err);
          }
        });
      } else {
        renameOutputFolder(buildFolderPath, outputFolderPath)
          .then((val) => resolve(val))
          .catch((e) => reject(e));
      }
    } else {
      reject(new Error('build folder does not exist'));
    }
  });
}

export default () => {
  const projectPath = path.resolve(process.cwd(), './node_modules/.bin/react-scripts');
  return new Promise((resolve, reject) => {
    exec(
      `${projectPath} build`,
      (error) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        execPostReactBuild(path.resolve(__dirname, '../build/'), path.join(__dirname, '../www/'))
          .then((s) => {
            console.log(s);
            resolve(s);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      },
    );
  });
};
