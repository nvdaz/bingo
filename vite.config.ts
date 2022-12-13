import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import mdx from '@mdx-js/rollup';
import { execSync } from 'child_process';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import pkg from './package.json';
import manifest from './manifest.json';

const version = pkg.version;
const revision = execSync('git describe --long --always --dirty=-dirty')
  .toString()
  .trim();

process.env.VITE_VERSION = `v${version}.${revision}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate', manifest }),
    svgr(),
    mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
  ],
});
