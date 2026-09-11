---
name: sensei-kata
description: Set up a runnable harness and write one to three exercises that isolate what a sensei reading list taught, with tests red until the user makes them pass. Stage 2 of the sensei pipeline. Use after reading.md exists, or when asked for exercises, practice problems, or a REPL harness to learn something in. Consumes reading.md; produces kata.md and kata/.
---

# sensei-kata

Build the place the user practices, and set the exercises. You set them up; you do not do them.

**Consumes:** `.sensei/<date>-<slug>/reading.md`.
**Produces:** `kata.md` and `kata/` in the same directory.

If `reading.md` does not exist, stop and run `sensei-read` first.

## One to three katas

Each kata isolates one idea from the reading list. The last one has the shape of the real task
without being the real task: same kind of input, same kind of constraint, different data, smaller.

One kata when the reading was one idea. Three at most. A fourth means the reading list is too
long, and the fix is there, not here.

Order them so that each depends only on the ones before it and on the reading it names.

## The harness

The user must be able to sit down, run one command, and be inside the problem.

### Where the runtime can load and redefine code, the harness is a REPL

Python, Ruby, Elixir, Clojure, Node, Haskell, Scala, Common Lisp, Scheme. Load the project the
way the project loads: `rails console`, `iex -S mix`, `python` with the package importable,
`node --require`. Not a bare interpreter, and not a mock. Write a script that loads the context
and drops the user at a prompt with the fixtures already bound.

### Where it cannot, the test runner is the harness

Go, Rust, C, C++, C#, Java, Zig. Write a scratch test per kata with the assertion complete and
the body left for the user. A test in a language without a REPL is the exercise statement.
`go test ./...`, `cargo test`, `dotnet test`: whatever the project already runs.

### Standalone, without a codebase

Pick the smallest runtime that can check the answer. For mathematics that is usually a script
with the expected values in it and a place for the user to write the function, or, when nothing
can check it, a written exercise with the property the answer must have stated so the user can
check it themselves.

**Do not install a runtime to make a harness.** Use what the project uses. If there is nothing,
say so and write the exercises as text.

## Tests are red when created

Every kata has a check, and the check fails until the user does the work. Write the assertion,
run it, watch it fail, and leave it failing.

**The expected values are computed, not derived in the file.** If a check needs the right answer
to compare against, compute it privately and write only the literal. The derivation is the
exercise. A test that shows how the expected value was produced is a solution with extra steps.

**Fixtures are real shapes.** From the codebase when there is one: the actual struct, the actual
row, the actual message. A kata against a toy shape teaches the toy.

## The harness lives in `kata/`

```
.sensei/<date>-<slug>/
├── kata.md
└── kata/
    ├── run            # or run.sh, Makefile, whatever the ecosystem expects. One command.
    ├── <kata files>
    └── <fixtures>
```

**Nothing in `kata/` may be discovered by the host repo's test runner.** `.sensei/` at the repo
root is outside every project directory, which is enough for manifest-driven build tools. For
discovery-driven ones, check: `pytest --collect-only` must not list it, a root `go.mod` must not
claim it, a root `tsconfig.json` must exclude it. Run the project's test command and confirm
nothing from `.sensei/` appears. If it does, propose the exclusion and stop until it is accepted.

Prefer the ecosystem's single-file script mechanism so no manifest lands in the repo: PEP 723
with `uv run`, JBang `//DEPS`, `#:package` in .NET. Where the kata needs the project's own
dependencies, load them from the project's environment rather than resolving a second one.

## kata.md

Use `kata.md` in this skill directory as the template.

Each kata has: the goal in one sentence, the reading entries it depends on by number, the command
that enters it, and what done looks like as something the user can observe. A test going green.
A REPL expression printing a value. A property holding.

**Hints point back into the reading.** A hint is a reference to an entry and a section, never a
line of code, never a name of the function to call, never "consider using". If the user needs
something the reading does not cover, that is a defect in `reading.md`: fix it there, note it in
the ledger, and then point at it.

## No solution anywhere

Not in `kata/`, not in a hidden file, not in a comment, not in the ledger. You solved it in
`sensei-read` to know what to set. That is the last time it is written.

## Commit as you go. Never push.

Commit the planning directory once the harness runs and the tests are red.

## Done when

The harness runs with one command, every check is red, and the user has been invited to start.
Say what the command is. Then say that `sensei-check` is what to run when they think they have
it.
