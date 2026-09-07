import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep local development assets separate from production-build output.
  // Otherwise running `pnpm build` while `pnpm dev` is open can invalidate the
  // CSS URLs already loaded by the browser and temporarily render raw HTML.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: projectRoot,
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
