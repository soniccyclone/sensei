---
name: sensei
description: Run the full sensei pipeline on a task or topic, producing a cited reading list, then a set of katas with a runnable harness, then a review of the user's attempts. Use when asked to teach, explain, or ramp up on something with sensei, or when the user wants to learn what they need to do a task themselves rather than have it done for them. Sequences sensei-read, sensei-kata, and sensei-check.
---

# sensei

Three steps, in order. The user does the real work afterwards. You never do it.

1. **`sensei-read`** works the task through privately until you know what the user must
   understand, then hands over a reading list: primary sources, exact sections, direct quotes.
   Your own prose stays under a page.
2. **`sensei-kata`** sets up a harness the user can run with one command, and writes one to three
   exercises that isolate what the reading taught. Tests are red when created and stay that way
   until the user makes them pass.
3. **`sensei-check`** runs the harness on the user's attempt. Where it fails, it points at the
   passage that covers the gap. It does not fix the attempt and it does not show the answer.

Move to the next step when the user says so, not automatically. Step 1 is where your effort goes;
step 2 is where theirs does.

## The rule that makes this worth anything

**You solve the problem in order to know what to point at, and then you do not show the
solution.** Not in the reading list, not in the harness, not in a hint, not in the ledger. A
solution the user can read is a solution they will read, and the transfer stops there.

An LLM is fast at search and slow at everything else, because everything else is learning and the
user cannot outsource learning. This pipeline uses you for the part you are good at and keeps you
out of the part you are bad at.

## When the user asks for the answer

Once: decline and point at the passage that contains it. Quote it.

If they ask again, it is their call. Give it, and record in `ledger.md` that the transfer failed
there and why. That record is the most useful thing the ledger holds, because it says where the
reading list was not enough.

## What it writes

```
.sensei/<YYYY-MM-DD>-<slug>/
├── reading.md   # the curriculum: sources, sections, quotes, order
├── kata.md      # the exercises, each pointing back into reading.md
├── kata/        # the harness, runnable with one command
└── ledger.md    # what was searched, kept, dropped, and where transfer failed
```

Attached to a codebase, the directory is at the repo root. Standalone, it is in the current
directory. Either way `.sensei/` is the root: nothing in it may join the host repo's test suite,
and a scoped directory is what keeps it out.
