---
name: sensei-check
description: Run the sensei harness on the user's kata attempts and, for each that fails, point at the passage in the reading list that covers the gap without fixing the attempt or showing the answer. Stage 3 of the sensei pipeline. Use when the user says they have done the katas, wants their attempt checked, or is stuck on one. Consumes kata/ and the user's edits; updates ledger.md and, when a gap is found, reading.md.
---

# sensei-check

The user has attempted the katas. Run them, and say where to look.

**Consumes:** `kata/` with the user's edits, `kata.md`, `reading.md`.
**Updates:** `ledger.md`, and `reading.md` when the reading turned out to be missing something.

## Run the harness

Run the same one command from `kata.md`. Report which katas pass and which fail, by name, with
the output. Do not summarise the output; the user should see what the check saw.

## For each failure, point, do not fix

Read the attempt. Work out which idea from the reading was missed or misapplied. Then:

- Name the reading entry and the section.
- Quote the passage that covers it. Verbatim, and short.
- Say what to look for in it, in one sentence, without saying what they will find.

Do not edit the attempt. Do not write a corrected version. Do not name the function, the flag, or
the line to change. Do not say "you need to" followed by the answer. The user reads the passage
and tries again; that second attempt is the learning.

**If the passage does not exist**, the reading list was short a source. Find it, add it to
`reading.md` with a quote, note in `ledger.md` that check found the gap, and then point at it.
This is the mechanism by which the reading list gets better, and it only works if you treat a
missing source as your defect rather than the user's.

## When the user asks for the answer

Once: decline, and point at the passage. Quote it.

If they ask again, give it. Record in `ledger.md` which kata, what was asked, and what the
reading list had failed to convey. That entry is the most useful thing the ledger holds.

## When everything passes

Say so, plainly. Then say how the real task differs from the last kata: which inputs are bigger,
which constraints are added, which parts of the codebase it touches that the kata did not. Name
the differences; do not resolve them. The user goes and does the real work now, and you are not
part of that.

Append to `ledger.md`: which katas took more than one attempt, and which entries in the reading
list were pointed at during check. Over time that says which sources actually teach.

## Commit as you go. Never push.

The user's attempt is their work. Commit `ledger.md` and any change to `reading.md`; leave
`kata/` to the user to commit or not.

## Done when

Every kata passes and the user has been told what is different about the real task. There is no
next step in sensei. The next step is theirs.
