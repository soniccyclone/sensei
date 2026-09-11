# Ledger: sensei skills

## 2026-09-10

Opened. Origin is Nathan's README.org, moved here as `origin.org` so the package README can be
the install page.

**Shape decision: mirror necklace.** Nathan asked for "a similar way to this other skill I built".
Read necklace in full: installer (`src/`), four targets, stdlib multi-select prompt, skills as
`skills/<name>/SKILL.md` with frontmatter, tests in node:test with a pty suite, site in org built
by Emacs with pandoc converting the real SKILL.md files, CI on three OSes. All of it is reused
byte-for-byte except names, skill counts, and the beads gate, which is deleted.

**Rejected: a beads dependency.** necklace produces work items because the agent does the work.
sensei produces reading and exercises; the work is the learner's and it is not tracked.

**Rejected: a `sensei-lint` skill.** necklace-lint exists because planning directories carry
scratch code that test runners discover. The same risk exists for `kata/`, but it is one check at
one moment, so it is folded into `sensei-kata` ("run the project's test command and confirm
nothing from `.sensei/` appears") rather than being its own skill. Revisit if it turns out to
need the full table.

**Rejected: writing the solution to a hidden file for the check to compare against.** The check
compares outputs, not code. Expected values are computed privately and only the literal is
written. Anything more is a solution with extra steps, and the learner will find it.

**Naming.** `sensei-read` / `sensei-kata` / `sensei-check`. Considered `sensei-scout` and
`sensei-curriculum` for stage 1; `read` is what the learner does with it. `kata` over `exercise`
because it is one word and matches the name. `check` over `review` and `grade`: it runs a check,
and "grade" implies a mark, which the skill does not give.

**Name collision.** The skill directory is `skills/sensei-read/` and its template is
`reading.md`; kata's template is `kata.md` and its harness is `kata/`. Same convention as
necklace-spec's `spec.md`.

**The refusal floor.** Decline once, then give it and log it. Considered never giving it; rejected
because a learner who is stuck and being stonewalled by a tool will stop using the tool, and the
log entry is the measurement Nathan actually wants (origin: "it could still be complete junk").

**Site.** The mark is an enso, one open brush stroke. The favicon variant is a single heavier
stroke so the gap survives 16px, and the site test asserts the stroke weight rather than counting
circles. Skin is necklace's sepia, unchanged, so the two sites read as siblings.

**Toolchain.** pandoc and htmlize were not installed locally. Installed pandoc 3.11 to
`~/.local/opt` with a symlink in `~/.local/bin`, and htmlize from MELPA into the user's Emacs
packages. No sudo.

**Not done.** Not run against a real task yet. The skills are untested as skills; only the
installer and the site are tested. First real run is the next thing.
