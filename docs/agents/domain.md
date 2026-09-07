# Domain docs

This repository uses a single-context layout:

- `CONTEXT.md` at the repository root: shared terminology and domain concepts.
- `docs/adr/`: architecture decision records, numbered sequentially with descriptive filenames.

## Before exploring

Read root `CONTEXT.md` and any ADRs relevant to the area of work.

If these files do not exist, proceed silently. The `domain-modeling` skill, used directly or through `grill-with-docs` and `improve-codebase-architecture`, creates them as terminology and decisions are resolved. Empty placeholder documents are unnecessary.

## Use shared terminology

Use the glossary's terms in issue titles, proposals, code, and tests. If a needed concept is missing, reconsider the terminology or note the gap for `domain-modeling`.

## Surface decision conflicts

If a proposal contradicts an ADR, identify the record and explain why the decision should be reconsidered before implementing the conflicting design.
