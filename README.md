# Ron Quah Portfolio

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and next-themes. The content is sourced from `public/Ron_Quah_Tech_Resume.pdf`.

## Local Development

```bash
corepack pnpm install
corepack pnpm dev
```

Open http://localhost:3000. `corepack enable` is unnecessary when using `corepack pnpm` directly.

## Black-hole design preview

The homepage uses a lazy-loaded React Three Fiber scene in `components/effect-scene.tsx` and the Efecto ASCII shader in `components/ascii-effect.tsx`. The source scene is a procedural black hole with an accretion disk; no external models or textures are required. Graphics dependencies are managed with the existing pnpm lockfile, including Three.js, React Three Fiber, Drei, and postprocessing.

The export's wrapper was adapted for strict TypeScript, independent effect instances, uniform updates, and cleanup. Its standard character set was updated from the export's simplified 4×4 patterns to the live app's 5×7 glyphs. The remaining embedded preprocessing controls retain the export's limitations; the hero uses the separate reference postprocessing stack instead.

The source in `components/black-hole-shader.ts` reconstructs the Abyss lensing, perspective, noise bands, and radial falloff from the [user's Efecto reference](https://efecto.app/fx?v=1&in=shader&shader=hole&sbg=000000&ac=10&gbs=0.2&gdp=0.49&gsp=0.6&pp=pa%3A1%3Anes%2C000000-b53120-6b6b6b-fcfcfc%2C0.7%7Csl%3A1%3A0.3%2C300%7Ccu%3A1%3A0.5%7Cvi%3A1%3A0.4%2C0.7%7Cbc%3A1%3A0.1%2C1.2%2C0%2C1&share=1), rather than approximating its silhouette with rings. Credit for the reference visual and shader design belongs to Efecto. Framing fits the portfolio by width, and ASCII cell sizing follows the screenshot's approximate 205-column grid across responsive canvas sizes. Animation phase and viewport framing mean this is not a pixel-identical screenshot reproduction.

`components/reference-postfx.tsx` applies the shared URL's ordered stack: a black/red/gray/white gradient at 0.7 strength, scanlines at 0.3 / 300, curvature at 0.5, vignette at 0.4 / 0.7, then brightness +0.1 and contrast 1.2. Curvature is a separate render pass so it warps the rendered characters. The source scene and this stack were absent from the pasted export.

The four project diagrams have distinct CSS animations and a shared pause/play button; they stop when off-screen, when the tab is hidden, or when reduced motion is requested.

Playwright is installed as a development dependency for browser verification. Install its browser with `corepack pnpm exec playwright install chromium` if needed.

Use the hero's pause control to stop the animation. Reduced-motion preferences, off-screen visibility, and hidden tabs stop continuous rendering. Devices without WebGL2 receive a static CSS black-hole fallback. Light mode uses an inverted scene. Both themes keep the portfolio content readable outside the canvas.

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
