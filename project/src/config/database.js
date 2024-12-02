import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const dbConfig = {
  path: join(__dirname, '../../items.db'),
  options: {
    verbose: console.log,
    fileMustExist: false
  }
};