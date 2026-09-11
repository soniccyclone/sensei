---
name: sensei-read
description: Research a task or topic to the point of knowing what the user must understand, then hand over a reading list of primary sources with exact sections and direct quotes instead of an answer. Stage 1 of the sensei pipeline. Use when asked to teach a task in a codebase, a library, a concept, or a piece of mathematics, or to build a curriculum for a problem at hand. Produces reading.md and ledger.md.
---

# sensei-read

Work the task through until you know what the user must understand. Then hand over where to read
it, not what you concluded.

**Produces:** `.sensei/<YYYY-MM-DD>-<slug>/reading.md` and `ledger.md`.

**Most of your effort goes into the research, and almost none of it reaches the page.** The
reading list is short because you did the long part.

## The planning directory

```
.sensei/<YYYY-MM-DD>-<slug>/
├── reading.md
└── ledger.md
```

**Root is `.sensei/`** at the repo root when attached to a codebase, or in the current directory
when standalone. Never inside `src/`, `docs/`, or a directory another tool owns.

**Date** is the day the work started. **Slug** is the problem as the user brought it, two to four
words: `2026-09-10-async-cancellation`, `2026-09-10-galois-fields`. Describe the problem, never
the solution, and never rename the directory.

Open `ledger.md` first and append as you go.

## Step 1: frame the problem at hand

State, in one line, what the user is trying to do and what they will need to understand to do it.
If the request is a task in a codebase, that line names the subsystem and the operation. If it is
a topic, it names the concept and what the user wants to do with it.

If the framing is ambiguous in a way that changes the reading list, ask now. One question. Do
not ask what you can find out.

## Step 2: read the codebase, when there is one

Find what is actually in play, from the repo rather than from memory.

- **Versions from lockfiles and manifests**, never from the latest release. The docs you cite
  must be for the version the repo pins. A reading list for the wrong major version is worse than
  none.
- **The subsystem the task touches.** Read the entry point and follow it down far enough to know
  which libraries, protocols, and patterns the user will meet.
- **The dependency source on disk.** `node_modules/`, `.venv/`, `~/.cargo/registry`,
  `~/go/pkg/mod`. The source of the library the user is about to use is the primary source, and
  it is already installed.

Record what you found in the ledger: languages, pinned versions, the files you read.

## Step 3: solve it privately

Work the problem through. Run things. Read the library source. Read the spec. Get to the point
where you could do the task, and where you know which three or four ideas made that possible.

**Write none of the solution down.** Not in the ledger, not in a scratch file, not in a comment.
The ledger records what you consulted and why it was kept or dropped. It does not record what
you concluded. If you need to keep a fact for the harness later, keep the fact, never the
derivation.

The point of this step is to find out what the user needs to know. You cannot select readings for
a problem you have not understood, and the usual failure is a list of everything that looked
relevant, which is a search result rather than a curriculum.

## Step 4: find the primary sources

For each idea the user needs, find where it is stated by whoever is responsible for it. In order
of preference:

1. **The source code**, on disk, at the pinned version. Cite `path:line`.
2. **The reference documentation for the pinned version.** Not the latest. Deep-link to the
   section, with the anchor.
3. **The specification, RFC, standard, or paper.** Section number.
4. **The author's own writing.** A maintainer's blog post, a design document, a mailing-list
   thread, a textbook by the person who developed the idea.
5. **A textbook or course** by someone who teaches the thing for a living, when the topic is
   mathematics or theory and there is no single author.

Not on the list: SEO tutorials, content-farm posts, aggregator sites, anything whose headline is
a question, anything that paraphrases the docs with ads beside it, Stack Overflow unless the
answer is by a maintainer. The user came here to escape those.

**Fetch every page you cite and quote it.** A citation you have not read is a guess with a link
on it. If a page cannot be fetched, do not cite it.

**If you cannot quote it, do not cite it.** Every entry carries at least one verbatim passage,
short enough to be fair use and long enough to say the thing. The quote is what tells the user
they are on the right page.

**Undocumented is a finding.** When the fact the user needs is not stated anywhere you can cite,
say so in the reading list and point at the source code where it lives. That is a more honest
entry than a tutorial that made it up.

## Step 5: write reading.md

Use `reading.md` in this skill directory as the template.

**Your own prose: under a page in total.** One paragraph on the shape of the problem and why the
readings come in this order. One sentence per entry on what to look for. Everything else is
quotation and citation.

**Each entry** has: the link or path, exactly what to read (section, heading, line range), why in
one sentence, the quote, and how long it takes. Not the whole page. Tell them where to stop.

**Order** is the order to read in. Concept before mechanism, mechanism before API.

**Budget: one sitting.** Two hours of reading at the outside. A list that takes a day is you
declining to choose. Ten links is a search result; three is a curriculum. If the problem needs
more than a sitting, split it, and say that the second sitting waits on the first.

**No solution.** Not an outline of one, not a "you will notice that", not a hint dressed as
context. The reading list is where to look, and the katas are where the user finds out whether
they saw it.

### Altitude test

Both answers must come out right before you show the document.

- **Could the user, having done this reading and nothing else, attempt the katas?** Must be
  **yes**. A no means a source is missing.
- **Does the document say, or let the reader infer, how you would do the task?** Must be
  **no**. A yes means you have written a tutorial with citations, and the transfer has been
  skipped.

## Commit as you go. Never push.

Commit the planning directory whenever the list changes. Pushing is the user's call.

## Done when

The user has the reading list and has not been told the answer. Then say the next step is
`sensei-kata`.
