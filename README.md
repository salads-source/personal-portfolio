# Ron Quah Portfolio

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and next-themes. The content is sourced from `public/Ron_Quah_Tech_Resume.pdf`.

## Local Development

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

## Production Build

```bash
corepack pnpm build
```

The app uses `output: "export"` in `next.config.mjs`, so production output is written to `out/` as static files. It avoids Vercel-specific APIs and server-only features.

## Cloudflare Pages

- Framework preset: `Next.js` or `None`
- Build command: `corepack pnpm install && corepack pnpm build`
- Output directory: `out`
- Node version: `22`

## AWS Amplify

Use static hosting with this build shape:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - corepack enable
        - corepack pnpm install
    build:
      commands:
        - corepack pnpm build
  artifacts:
    baseDirectory: out
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```
