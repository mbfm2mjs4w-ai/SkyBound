// Build script (esbuild). Usage:
//   node build.mjs            -> production build into dist/ (+ standalone single-file HTML)
//   node build.mjs --dev      -> dev server with live rebuild on http://localhost:5173
//   node build.mjs --preview  -> serve the already built dist/ on http://localhost:4173
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const args = new Set(process.argv.slice(2));
const dev = args.has('--dev');
const preview = args.has('--preview');
const out = 'dist';

const env = (k) => JSON.stringify(process.env[k] ?? '');
const define = {
  __SUPABASE_URL__: env('SUPABASE_URL'),
  __SUPABASE_ANON_KEY__: env('SUPABASE_ANON_KEY'),
  __DEV__: JSON.stringify(dev),
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.map': 'application/json',
  '.webmanifest': 'application/manifest+json',
};

function serve(root, port) {
  const server = createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = normalize(join(root, p));
    if (!file.startsWith(normalize(root)) || !existsSync(file)) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(readFileSync(file));
  });
  server.listen(port, () => console.log(`SKYBOUND available at http://localhost:${port}`));
}

function prepareDir() {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync('public', out, { recursive: true });
  const html = readFileSync('index.html', 'utf8');
  writeFileSync(join(out, 'index.html'), html);
}

const common = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  loader: { '.css': 'text' },
  define,
  logLevel: 'info',
};

if (preview) {
  serve(out, 4173);
} else if (dev) {
  prepareDir();
  const ctx = await esbuild.context({ ...common, outfile: join(out, 'game.js'), sourcemap: true });
  await ctx.watch();
  console.log('Watching for changes…');
  serve(out, 5173);
} else {
  prepareDir();
  const res = await esbuild.build({ ...common, outfile: join(out, 'game.js'), minify: true, sourcemap: false, metafile: true });
  // Standalone single-file build: works by double-clicking the file (no server needed)
  const js = readFileSync(join(out, 'game.js'), 'utf8').replace(/<\/script>/g, '<\\/script>');
  let html = readFileSync('index.html', 'utf8');
  html = html.replace(/<script[^>]*src="\.\/game\.js"[^>]*><\/script>/, () => `<script>${js}</script>`);
  writeFileSync(join(out, 'skybound-standalone.html'), html);
  const kb = (n) => (n / 1024).toFixed(0) + ' KB';
  console.log(`Built dist/game.js (${kb(js.length)}) and dist/skybound-standalone.html`);
}
