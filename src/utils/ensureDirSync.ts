import fs from 'fs';
import path from 'path';

// Make sure all directories in a path exist and create any that don't
export default function ensureDirSync(filePath: string): void {
  const dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname)) {
    ensureDirSync(dirname);
    fs.mkdirSync(dirname);
  }
}
