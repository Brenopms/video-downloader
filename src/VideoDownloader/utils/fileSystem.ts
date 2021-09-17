import { existsSync, mkdirSync } from 'fs';
import path from 'path/posix';

export const ensureDirectoryExistence = (filePath: string) => {
    const dirname = path.dirname(filePath)
    if (!existsSync(dirname)) {
        mkdirSync(dirname)
    }
}