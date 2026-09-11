# sensei: the skills

No ticket. The origin note is `origin.org` in this directory, Nathan's first statement of the idea.

## The problem

An agent asked to do a task in an unfamiliar area does it, and the person who asked learns
nothing. The next task in the same area is just as slow, and the one after that. The origin note
puts it this way: LLMs are "always slower than experts" on anything past search, "since it removes
the pain of learning. Because it removes learning."

The part they are good at is the ramp-up: finding the one thing you need to read in a field you
do not know, instead of "drowning in a sea of SEO slop trying to just LEARN THE ONE THING YOU
NEED". That is the part nobody has packaged as a skill. Every existing skill in this space, ours
included, is built to have the agent do the work.

Evidence: necklace, the sibling project, exists because the agent doing the work needs provenance
to be trustworthy. sensei exists because sometimes the agent should not do the work at all.

## Actors

- Learner: someone with a task in a codebase, or a topic, who wants to be able to do it themselves
- Agent: the model running the skills
- Maintainer: Nathan, who wants the skills installable, the site true, and the method arguable

## Actor-outcome pairs

| Actor | Must be able to observe |
| --- | --- |
| Learner | A reading list short enough for one sitting, built from primary sources at the versions they have pinned, every entry quoted |
| Learner | That the reading list does not contain the answer, and that asking for it is declined once and quoted at |
| Learner | A harness they enter with one command, with every check red, that does not join their test suite |
| Learner | On a failed kata, the passage that covers the gap, and never the fix |
| Learner | On success, how the real task differs from the last kata, without the differences being resolved |
| Agent | Where its own research goes (the ledger) and what it may never write down (the solution) |
| Maintainer | The same install path, targets, tests, site, and CI as necklace, with no beads dependency |
| Maintainer | A record, per run, of where the transfer failed, so the method can be judged on data |

## Constraints

- necklace's installer, targets, prompt, tests, site build, and CI are known to work on three
  operating systems and two Node versions. Reuse them rather than re-deriving them. Measured: the
  copied suite passes unchanged apart from names and counts.
- No beads. sensei produces no work items; the learner is the one who does the work.
- No runtime installs. The kata harness uses what the project has, same as necklace's REPL rule.
  The origin note: "stub out a test if tests are what need to be used instead of REPLs in a
  degenerate language".
- The agent must be able to fetch pages. A reading list is built from quotes, and a quote needs a
  fetched page. This is a requirement on the host agent, stated in the README, not enforced by the
  installer.
- `.sensei/` at the repo root, for the same reason `.necklace/` is: scratch tests in a scoped
  directory are outside discovery-driven test runners.

## Approach

Three skills in sequence and one that runs them, mirroring necklace's shape so that anyone who
knows one knows the other.

The load-bearing rule, held by every skill: the agent solves the problem in order to know what to
point at, and then does not show the solution anywhere. The ledger holds provenance of the search,
never the conclusion. The kata harness holds computed expected values, never their derivation.

The reading list is held to an altitude test with the same two-question shape as necklace's: the
learner must be able to attempt the katas from the reading alone, and must not be able to infer
the solution from it.

Refusal has a floor. The agent declines the answer once; a second ask is the learner's decision,
and it is recorded as a failure of the reading list rather than of the learner. That record is
the measurement the origin note asks for: "It could still be complete junk because the AI misses
stuff so often."

## Open questions

| Question | Why it cannot be settled by reading or running |
| --- | --- |
| Should `sensei-check` ever run the learner's attempt against the real task, not just the katas? | Whether that is teaching or doing the work is a judgment about where the line sits. Left out for now; the skill ends with "the next step is theirs". |
| Is one sitting the right budget, or should the skill size the budget to the task? | Only use will tell. Two hours is the origin note's ramp-up phase as Nathan experiences it; other people's may differ. |

---

<!--
Altitude self-check:
  Two engineers could write these four SKILL.md files differently and both be right: yes.
  Two engineers could disagree about whether a run produced a quoted reading list, a red harness,
  and a check that pointed rather than fixed: no.
-->
