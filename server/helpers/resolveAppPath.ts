import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());

export default (relativePath: string): string => {
  return path.resolve(appDirectory, relativePath);
};
