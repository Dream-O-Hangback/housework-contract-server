import * as fs from 'fs';
import { promisify } from 'util';

const access = (path: string) => promisify(fs.access)(path);

const doesExist = async (path: string) => {
    try {
        await promisify(fs.access)(path);
        return true;
    }
    catch (err) {
        return false;
    }
}

const mkdir = async (path: string) => {
    try {
        await promisify(fs.mkdir)(path, { recursive: true });
    }
    catch (err) {
        if (err && err.code === 'EEXIST') return null;
        throw err;
    }
}

export default {
    access,
    doesExist,
    mkdir,
}
