import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { TARGET_IDS } from './targets.js';

export const VERSION = JSON.parse(
  readFileSync(path.join(import.meta.dirname, '..', 'package.json'), 'utf8'),
).version;

export const USAGE = `sensei init [--global] [--agent <name>]

  --agent <name>        install for one target; repeat for several.
                        ${TARGET_IDS.join(', ')}
  --global              install to the user directory instead of this repo

With no --agent, sensei detects what this repo uses and asks.
Rerunning is also the update path: it always writes the current skills.`;

export function parse(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      agent: { type: 'string', multiple: true },
      global: { type: 'boolean', short: 'g' },
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
    },
  });

  const targets = values.agent ?? [];
  const unknown = targets.filter((t) => !TARGET_IDS.includes(t));
  if (unknown.length) {
    throw new Error(`unknown target: ${unknown.join(', ')}. Known: ${TARGET_IDS.join(', ')}`);
  }

  return {
    command: positionals[0] ?? 'init',
    targets,
    interactive: targets.length === 0,
    global: values.global === true,
    help: values.help === true,
    version: values.version === true,
  };
}
