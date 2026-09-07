# Issue tracker: GitHub

Issues and specs live in GitHub Issues for `salads-source/personal-portfolio`. Use the `gh` CLI from the repository, or pass `--repo salads-source/personal-portfolio` explicitly.

## Prerequisites

GitHub operations require an installed `gh` CLI and an authenticated account with access to the repository. Check `gh auth status` before using it. If unavailable, report the missing prerequisite and prepare local drafts for requested writes.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>`.
- Read: `gh issue view <number> --comments`. Use `--json number,title,body,labels,comments` when structured output is useful.
- List: `gh issue list --state open --json number,title,body,labels,comments`, adding label filters as needed.
- Comment: `gh issue comment <number> --body-file <file>`.
- Edit the body: `gh issue edit <number> --body-file <file>`.
- Apply or remove labels: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close: `gh issue close <number>` after recording the resolution.

For multiline bodies and comments, prepare the exact Markdown in a temporary file and pass `--body-file` to preserve formatting and avoid shell interpolation.

When a skill says “publish to the issue tracker,” create a GitHub issue. When it says “fetch the relevant ticket,” read the issue and its comments.

## Pull requests as a triage surface

**PRs as a request surface: no.**

GitHub shares issue and pull request numbers. If a referenced number resolves to a pull request, inspect it as a pull request rather than assuming it is an issue.

## Wayfinding operations

When using the `wayfinder` skill:

- Use one issue labelled `wayfinder:map` for the map, containing Notes, Decisions-so-far, and Fog.
- Link child tickets as GitHub sub-issues. If unavailable, maintain a task list in the map and a `Part of #<map>` line in each child.
- Use `wayfinder:<type>` labels with `research`, `prototype`, `grilling`, or `task` as the type.
- Record blockers with native GitHub issue dependencies when available. Use the blocker's database ID, not its issue number, for API operations. Otherwise, put `Blocked by: #<n>` lines in child tickets.
- Select the first open, unassigned child in map order with no open blockers. Claim it with `gh issue edit <number> --add-assignee @me`.
- On resolution, record the result, close the ticket, and append a concise result and link to the map's Decisions-so-far.

Use `docs/agents/triage-labels.md` for triage states. Create missing labels only as part of an authorized tracker workflow.
