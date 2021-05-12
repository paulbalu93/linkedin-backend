import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data');

export const getBooks = async () => await readJSON(join(dataFolderPath, 'books.json'));
export const writeBooks = async (content) => await writeJSON(join(dataFolderPath, 'books.json'), content);

export const getCurrentFolderPath = (currentFile) => dirname(fileURLToPath(currentFile));
