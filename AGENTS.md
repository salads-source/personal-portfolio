# Working in this repository

This is a personal portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. Read `README.md` for development and static hosting instructions and `package.json` for available commands.

## Engineering conventions

- Preserve static export compatibility. Features must work on static hosting; changes requiring a backend need an explicit hosting decision.
- Keep shared portfolio content in `lib/content.ts` and section UI in `components/`. Update factual claims, dates, and résumé details only from information supplied by the user.
- Follow existing component and styling conventions. Preserve responsive layouts, keyboard access, visible focus states, and both themes. Respect reduced-motion preferences when adding animation.
- Keep changes focused on the requested task and preserve unrelated work. Explain any new dependencies or changes to build and deployment configuration.
- Validate changes in proportion to their impact. For code changes, run the production build and relevant available checks. For UI changes, inspect affected layouts at narrow and wide widths in both themes when browser access is available. Report any checks that could not run.
- Add tests for meaningful behavior when warranted; use the installed `tdd` skill when test-first work is requested. Documentation-only changes need content and link checks.

## Agent skills

### Issue tracker

Track issues and specs in GitHub Issues for `salads-source/personal-portfolio`. Before reading, publishing, or updating tickets, read `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. Before triaging or changing issue state, read `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout: root `CONTEXT.md` and `docs/adr/`. Before exploring project terminology or design decisions, read `docs/agents/domain.md`.
