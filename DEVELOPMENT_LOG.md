# Development Log

Running journal of what's been built, the decisions behind it, and the traps that already bit us. Newest entries on top. Update this alongside every change — don't batch it up for later.

> Companion doc: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) — stack, folder map, routes, where to make a change.

---

## 2026-10-08 — Initial scaffold: tech stack + Home page only

**Goal:** stand up the project on the stack documented in PROJECT_STRUCTURE.md, but build out only the Home page. Remaining pages (Work, About, Skills, Path, Contact, login/admin) come later.

**What was done**
- Scaffolded `client/` by hand (not `npm create vite`) so the exact pinned versions and `.js`-with-JSX convention from the spec could be guaranteed from the first commit.
- Installed the full stack table from PROJECT_STRUCTURE.md §1, including the three packages marked "login/admin scaffold only" (`@tanstack/react-query`, `axios`, `antd`) and the two marked "unused but still installed" (`gsap`, `@ant-design/icons`) — they're installed now so `package.json` matches the spec, even though nothing imports them yet.
- `vite.config.js`: `@` alias to `src/`, `esbuild.loader: 'jsx'` scoped to `src/**/*.js` (plus a matching `optimizeDeps.esbuildOptions` override — without it, dep pre-bundling doesn't get the same loader and the alias-based imports fail to resolve during dev), `/api` proxy wired from `VITE_API_PROXY_TARGET` (currently unset, so proxy is `undefined` until a backend exists).
- Built only the slice of the folder map Home actually needs: `styles/` (tokens + variables + mixins), `content/{profile,stats,nav}.js`, `components/{Button,Counter,PageSection}`, `features/home/{Hero,StatGrid}`, `layouts/{MainLayout,Navbar,Footer}`, `pages/HomePage.js`, `store/appStore.js` (theme, persisted), `hooks/{useTheme,useDocumentMeta}`.
- `App.js` has exactly one route (`/`). No catch-all `*` yet — there's nothing to catch.
- `main.js` wires `QueryClientProvider → BrowserRouter → App`. Left a comment marking where `AntdThemeProvider` wraps in once the login/admin scaffold is built — don't forget it when that lands.

**Deliberately deferred** (not missed — out of scope for this pass)
- All other routes/pages, and `nav.js` only lists Home. Add a nav entry and a route together whenever a page ships — a nav entry pointing at a route that doesn't exist is a dead link with no catch-all to soften it.
- `public/` raster icon set (`favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `manifest.webmanifest`) and the resume PDF. Only `favicon.svg` exists. `index.html` doesn't link a manifest or apple-touch-icon yet — add those links at the same time the files are added, not before.
- `auth/`, `config/`, `utils/api.js`, `locales/` — all login/admin or i18n scaffolding, not needed until those features are built.

**Decisions**
- Hero's primary CTA uses `mailto:${PROFILE.email}` instead of linking to `/contact`, because `/contact` doesn't exist yet and there's no catch-all route to redirect a dead link gracefully. Swap it to `to="/contact"` once that page and route exist.
- `NAV` (in `content/nav.js`) intentionally contains only `{ label: 'Home', path: '/' }` right now, with a comment warning future-me (or whoever) to keep it in lockstep with `App.js` routes.

**Gotchas hit while setting this up**
- `@eslint/js` latest (10.x) requires `eslint@^10`, but we're on `eslint@9.39.5` — installing `@eslint/js` without a version pin pulled in a peer conflict. Pinned to `@eslint/js@^9` instead.
- `vite.config.js` and `eslint.config.js` run under Node, not the browser — the flat ESLint config needs a separate block with `globals.node` for those two files (`process`, `__dirname`), or `no-undef` fires on them. Everything under `src/**` stays on `globals.browser`.
- After `npm install`, VSCode's Source Control panel briefly showed ~10,000 changes including files under `client/node_modules/...`. This was **not** a real gitignore problem — `git check-ignore -v`, `git ls-files`, and a dry-run `git add client/` all confirmed node_modules was correctly excluded (36 files staged, 0 under node_modules). VSCode's git extension just hadn't re-applied `.gitignore` to its cached file list after npm dumped 10k+ files at once. Fixed by refreshing the Source Control panel; no repo action needed. Worth remembering so it doesn't get mistaken for a real issue next time a big `npm install` happens.
- Placeholder content initially used "Nikhil Goud Palamakula" (carried over verbatim from the wording already in PROJECT_STRUCTURE.md's intro line). Corrected to **Priyanka Cherupally** across `src/content/profile.js` (name, email, site domain, resume filename, SEO description), `index.html` (title, meta description, canonical), and PROJECT_STRUCTURE.md (intro line, resume filename references). Site domain and email are still placeholders (`priyankacherupally.dev` / `hello@priyankacherupally.dev`) — swap for the real ones whenever they're available.

**Verification**
- `npm run dev` — clean start, no console errors (checked via headless Chrome: `console --errors` equivalent showed only Vite HMR connect messages and the standard React DevTools notice).
- `npm run lint` — clean after the ESLint config fix above.
- `npm run build` — succeeds; `dist/assets/index-*.js` ~297 kB (94.7 kB gzip).
- Took a headless screenshot of `/` to confirm Hero, StatGrid (count-up mid-animation, as expected at capture time), Navbar (with theme toggle), and Footer all render as intended.

---

## Template for new entries

```
## YYYY-MM-DD — <short title>

**Goal:** <what this change is for>

**What was done**
- ...

**Decisions**
- <non-obvious choice> — why.

**Gotchas hit**
- <surprise> — how it was found, how it was fixed.

**Verification**
- <lint/build/dev/screenshot — whatever was actually checked>
```
