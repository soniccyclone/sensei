#!/usr/bin/env node
import { homedir } from 'node:os';
import { parse, USAGE, VERSION } from '../src/cli.js';
import { TARGETS, detect, rank } from '../src/targets.js';
import { install, skillNames } from '../src/install.js';
import { multiSelect } from '../src/prompt.js';

function die(message, code = 1) {
  console.error(message);
  process.exit(code);
}

let opts;
try {
  opts = parse(process.argv.slice(2));
} catch (e) {
  die(`${e.message}\n\n${USAGE}`);
}

if (opts.version) {
  console.log(VERSION);
  process.exit(0);
}

if (opts.help) {
  console.log(`sensei ${VERSION}\n\n${USAGE}`);
  process.exit(0);
}

if (opts.command !== 'init') {
  die(`unknown command: ${opts.command}\n\n${USAGE}`);
}

const cwd = opts.global ? homedir() : process.cwd();

let targets = opts.targets;
if (opts.interactive) {
  const found = new Set(detect(cwd));
  if (found.size) {
    console.log(`detected: ${[...found].map((id) => TARGETS[id].name).join(', ')}\n`);
  } else {
    console.log('no agent directories detected here; all targets are listed.\n');
  }
  try {
    targets = await multiSelect({
      message: 'Install sensei skills for:',
      choices: rank(cwd).map((id) => ({
        value: id,
        label: TARGETS[id].name,
        hint: found.has(id) ? 'detected' : undefined,
        selected: found.has(id),
      })),
    });
  } catch {
    die('cancelled.', 130);
  }
}

const names = await skillNames();
const written = await install({ cwd, targets, global: opts.global });

console.log(`installed ${names.length} skills to ${targets.length} target(s):\n`);
for (const p of written) console.log(`  ${p}`);

console.log(`
Rerun this command to update. It always writes the current skills.
Start with: "teach me this with sensei" and the task or topic.`);
