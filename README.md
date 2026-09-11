# sensei

[![CI](https://github.com/soniccyclone/sensei/actions/workflows/ci.yml/badge.svg)](https://github.com/soniccyclone/sensei/actions/workflows/ci.yml)

Use LLMs for search, not work. As installable skills.

The agent works the problem through until it knows what you would need to understand, then hands
you a reading list and a set of katas instead of the answer. You do the real work afterwards,
knowing how.

1. A reading list: primary sources at the versions you have pinned, the exact sections to read,
   and direct quotes. Under a page of the agent's own prose.
2. Katas, one to three, in a harness you enter with one command. Every check is red until you make
   it pass.
3. A check: the harness is run on your attempt, and each failure is answered with the passage that
   covers it. Never with the fix.

An LLM speeds up search and slows down everything else, because everything else is learning, and
learning is the one thing you cannot outsource. This uses the agent for the part it is good at and
keeps it out of the part it is bad at.

## Install

```
npx github:soniccyclone/sensei init
```

Not on npm yet, so the GitHub form is the install. It always fetches the current `main`.

`init` detects which agents your repo uses, asks which to install for, and writes the skills. Rerun
it to update: it always writes the current skills, so there is no separate update command.

```
sensei init --agent claude --agent cursor   # skip the prompt
sensei init --global                        # install for every repo
```

## Requirements

- **Node 22 or newer**, for the installer. The skills themselves are text.
- An agent that can fetch web pages. The reading list is built from pages the agent has read and
  quoted, so an agent without a fetch tool cannot produce one.

Nothing else. sensei never installs anything on your behalf, including a REPL: the katas use
whatever runtime your project already has, and say so when it has none.

## Supported agents

| Agent | Skills land in |
| --- | --- |
| Claude Code | `.claude/skills/` |
| Cursor | `.cursor/skills/` |
| GitHub Copilot | `.github/skills/` |
| opencode | `.opencode/skills/` |

Each gets its own native path rather than being routed through another vendor's compatibility
directory.

## The skills

| Skill | What it does |
| --- | --- |
| `sensei` | runs the whole pipeline |
| `sensei-read` | task to reading list, researched privately first |
| `sensei-kata` | reading list to katas, with a harness and red tests |
| `sensei-check` | your attempt to the passage that covers the gap |

## Using it

Say what you want to learn. The skills are invoked, not ambient.

```
teach me this with sensei: I need to add cancellation to the upload worker
```

```
sensei: finite fields, enough to follow the Reed-Solomon paper
```

Then do the reading. Then enter the harness and do the katas. Then ask for the check. When
everything passes, the agent tells you how the real task differs from the last kata, and you go
and do it.

The one rule the agent holds to throughout: it solved the problem in order to know what to point
at, and it does not show the solution. If you ask for the answer it declines once and quotes the
passage. If you ask again it gives it, and writes down that the reading list failed you there.
That record is how the reading lists get better.

## What it writes

```
.sensei/2026-09-10-async-cancellation/
├── reading.md   # the curriculum: sources, sections, quotes, order
├── kata.md      # the exercises, each pointing back into reading.md
├── kata/        # the harness, runnable with one command
└── ledger.md    # what was searched, kept, dropped, and where transfer failed
```

Committed on purpose. The reading list is the answer to "how did you learn this" six months
later, and the ledger is the answer to "what did the agent miss".

`.sensei/` sits at the repo root so nothing in `kata/` joins your test suite. Standalone, outside
any repo, it is written in the current directory.

## The site

[soniccyclone.github.io/sensei](https://soniccyclone.github.io/sensei/) is built from `site/org/`
by Emacs and published on push. The skill pages are generated from the real `SKILL.md` files, so
they cannot drift from the installed skills.

```
sh site/build.sh          # build to site/www
npm run test:site         # build, then assert it holds together
```

Pages has to be switched on once by hand, under **Settings → Pages → Source: GitHub Actions**. A
workflow cannot do it: creating a Pages site needs repo-admin rights and the default `GITHUB_TOKEN`
does not have them.

## Development

```
npm ci
npm test          # unit tests
npm run test:pty  # drives the real binary through a pseudo-terminal
```

The package ships with zero runtime dependencies. node-pty is a dev dependency and never reaches
anyone installing it.

## Related

[necklace](https://soniccyclone.github.io/necklace/) is the same shape pointed the other way:
skills for when the agent should do the work, planned by running code first. sensei is for when
you should.

## License

Apache License 2.0. See [LICENSE](LICENSE).
