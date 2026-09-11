import { mkdtemp, rm, mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

export const PKG_ROOT = path.resolve(import.meta.dirname, '..');

/** A throwaway directory standing in for someone's repo. */
export async function tempRepo(setup) {
  const dir = await mkdtemp(path.join(tmpdir(), 'sensei-test-'));
  if (setup) await setup(dir);
  return dir;
}

export async function cleanup(dir) {
  await rm(dir, { recursive: true, force: true });
}

export async function listSkills(dir) {
  try {
    return (await readdir(dir)).sort();
  } catch {
    return [];
  }
}

export async function read(file) {
  return readFile(file, 'utf8');
}

export { path, mkdir, writeFile, readFile, readdir, rm };
