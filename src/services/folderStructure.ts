import * as fs from 'fs';
import * as path from 'path';

interface DirectoryStructure {
  [key: string]: DirectoryStructure | null;
}

export function getDirectoryStructure(dirPath: string): DirectoryStructure {
  const dirStructure: DirectoryStructure = {};

  function traverseDirectory(currentPath: string) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      // Skip hidden folders (starting with a dot)
      if (file.startsWith('.')) return;

      if (stats.isDirectory()) {
        dirStructure[file] = {};
        traverseDirectory(filePath);
      }
    });
  }

  traverseDirectory(dirPath);
  return dirStructure;
}