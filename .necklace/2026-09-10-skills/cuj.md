# CUJ document: sensei skills

Derived from `spec.md` in this directory. One CUJ per actor-outcome pair that the package can
test. The learner-facing outcomes are held by the skill text and can only be tested by a run.

---

## CUJ-01: Maintainer installs sensei for any supported agent

**Actor:** maintainer, or anyone running `init`
**Trigger:** `npx github:soniccyclone/sensei init`
**Journey:**
1. Installer detects agent directories, offers all four, preselects what it found
2. Skills are copied to each selected target's native path

**Tests to create:**

| Test | Input | Assertion | Informed by |
| --- | --- | --- | --- |
| `writes every skill to the target path` | a bare repo, target claude | four skill dirs each with SKILL.md | |
| `--agent installs without ever showing the prompt` | `--agent claude --agent cursor` in a pty | no prompt text; four skills in each | |
| `does not remove files it did not write` | another tool's skill already present | it survives the install | |

**Done when:** the tests above pass. Inherited from necklace; they were green on copy, which is
allowed here because they test copied code.

**Beads:** none - done directly in the first commit on `skills`

---

## CUJ-02: Maintainer sees the site cannot drift from the skills

**Actor:** maintainer
**Trigger:** push to main touching `skills/` or `site/`
**Journey:**
1. Pages workflow converts each SKILL.md to org with pandoc and publishes
2. The docs index lists every skill; the splash carries the README's install line

**Tests to create:**

| Test | Input | Assertion | Informed by |
| --- | --- | --- | --- |
| `skill content comes from the real file` | a sentinel appended to sensei-check's SKILL.md | it appears in the built page | |
| `splash says what sensei withholds` | built index.html | mentions the reading list and katas | |
| `the reduced mark is the favicon` | built mark.svg | stroke width at least 6 | the enso gap closes at 16px below that |

**Done when:** the tests above pass.

**Beads:** none - done directly in the first commit on `skills`

---

<!--
The learner outcomes (quoted reading list, no answer, red harness, point-not-fix) have no test in
this package. They are properties of a run, and the ledger is where runs get recorded.
-->
