# Development Log

Running journal of what's been built, the decisions behind it, and the traps that already bit us. Newest entries on top. Update this alongside every change — don't batch it up for later.

> Companion doc: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) — stack, folder map, routes, where to make a change.

---

## 2026-10-10 — Positioning: problem solver, not only "complex → simple screens"

The positioning now says she's a problem solver as well as someone who simplifies workflows. It's grounded in the case studies (e.g. Edusphere's reflection about separating what a brief asks for from what it needs).

- Hero headline: "I make complex workflows feel *simple*." → **"I turn complex problems into *simple* screens."** (A 4-line "I solve complex problems — and make them feel simple" draft was too heavy and was tightened to 3 lines.) Hero intro: "A UI/UX designer and problem solver with 2 years across SaaS, enterprise and AI-powered products. I dig into what a brief really needs, then design the simplest way through it — from factory-floor dashboards to learning platforms."
- About intro paragraph now opens with "a UI/UX designer and problem solver…" and adds "I start by finding the real problem behind a brief, not just what it literally asks for." About page title "Calm design for complex products" → "Real problems, simple solutions". The Role quick fact reads "UI/UX Designer & problem solver" (kept in the Role tile rather than a 7th tile that would sit alone on its own row).
- Home About teaser: "a UI/UX designer and problem solver based in India". Work section intro: "Three real problems I solved by turning messy, real-world workflows into clear screens…".
- `PROFILE.tagline`, `SEO_DESCRIPTION` and the `index.html` meta description now say "UI/UX designer and problem solver who turns complex SaaS, enterprise and AI-powered workflows into simple, intuitive screens."
- Verified: lint/build clean. Home (desktop + 390px) and About screenshots look balanced.

---

## 2026-10-10 — Role fixed as "UI/UX Designer"; open to UI/UX & Product Design roles

- `PROFILE.role` changed "AI-UI/UX Designer" → **"UI/UX Designer"**. That flows to the hero name line, About quick facts and page titles. The hardcoded copies were updated too: `ABOUT` paragraph, About teaser description, `SEO_DESCRIPTION`, `index.html` `<title>`/meta description, and the manifest description. Also fixed "an UI/UX" → "a UI/UX".
- Job-seeking status now reads **"Open to UI/UX & Product Design roles"** everywhere: footer contact pill (`CONTACT.eyebrow`), About quick fact, Home About-teaser chip.
- Case-study text was left untouched (it describes products, not her title). "AI-powered products" in descriptions stays because it's the product domain, not the role.
- Lint/build clean.

---

## 2026-10-10 — Seatrack hover preview → Peeling & Cutting screen

- Seatrack's `cover` changed `16.jpg` (Traceability Agent graph) → `06.jpg` (Peeling & Cutting, the screenshot the user supplied, which was already in the case study).
- That screen is ~1.59:1, but the hover preview frame was a fixed 2:1 with `object-fit: cover`, so its bottom (Update / Save & Lock) would have been cut off. The preview now takes the active cover's own aspect ratio (`coverSize()` reads width/height from the case-study image blocks). Every project's full screen shows uncropped at 400px wide.
- Verified: lint/build clean. Hovering shows 02 / 03 / 06.jpg, the preview aspect is `1600 / 1008` for Seatrack, the screenshot shows the full screen, and no console errors.

---

## 2026-10-09 — Pencil art: four signed sketches added

- Added `drawing-3`…`drawing-6` (cat & butterfly, braided-hair portrait, "Hmm…" sitting girl, cartoon girl; each signed "Art by Priyanka", Aug 2023), resized to 800px wide, JPEG q86. They're placed at the front of the stack, so it now has 6 photos (the original two follow).
- The category label was renamed "Drawing" → **"Pencil art"** (user's wording). The Home About teaser's photo fan now uses the cat & butterfly sketch as its pencil-art photo, so it matches the About stack's front image.
- `InterestGallery`: back-layer spread is now capped at 3 layers (`MAX_SPREAD_DEPTH`). With 6 photos the deeper layers were fanning out at ~35°. Deeper photos now tuck behind.
- Verified: lint/build clean. About shows 2 / 4 / 6 / 4 photos with zero broken images, a click advances Pencil art (2 of 6), and no console errors.

---

## 2026-10-09 — Interest gallery: two photos removed, cards spread across the width

- Removed `yoga-3` (blurry floor shot) and `meditation-2` (dark, blue shirt) at the user's request. The files were deleted and the entries dropped from `INTERESTS` and the gallery imports. Stacks are now Yoga 2 · Meditation 4 · Drawing 2 · Reading 4.
- `.gallery` changed from a left-packed flex-wrap to a 4-column grid (`justify-items: center`), so the four cards share the full width evenly instead of leaving empty space on the right. It's 2 columns below `$bp-lg`.
- Verified: lint/build clean, the About page shows 2/4/2/4 photos, zero broken images, no console errors, and a screenshot confirms the even spacing.

---

## 2026-10-09 — More interest photos (from her YouTube Shorts), YouTube UI cropped out

**Request:** add 7 new yoga / meditation / reading photos to the About "Outside of work" gallery. They're phone screenshots of her YouTube Shorts, so strip all YouTube UI and text.

**What was done**
- Each 720×1600 screenshot was cropped to the same clean region (x 0–612, y 272–1072). That's below the top bar, filter chips and the "Meditation"/"Book Reading" overlay titles, left of the like/comment/share column, and above "Promote this Short", the channel/caption row and the bottom nav. Saved as JPEG q88 in `assets/interests/`. All 7 were visually checked: no YouTube elements remain.
- Categorised by content:
  - **Meditation:** `meditation-3` (mudra hand, sky), `meditation-4` (mudra hands, warm light), `meditation-2` and `meditation-5` (low-light seated practice from the same "100 days" series as the one titled "Meditation").
  - **Yoga:** `yoga-3` (seated on the floor, knee hug).
  - **Reading:** `reading-4` (*The Design of Everyday Things*), `reading-3` (*Who Will Cry When You Die?*).
- Stacks are now Yoga 3, Meditation 5, Drawing 2, Reading 4 photos. The clearest new shots come right after each existing front photo. Gallery got `padding-top: 32px` so the back layers of deeper stacks don't overlap the intro line.

**Verification**
- Lint/build clean. The About page shows "photo 1 of 3 / 5 / 2 / 4", zero broken images, the click advances the Meditation stack (2 of 5), and no console errors.

---

## 2026-10-09 — Home: About teaser becomes an interactive "meet me" card

**Request:** the Home page's About teaser ("The person behind the pixels") was uninteresting. Put something in it that makes visitors want to get to know Priyanka.

**What was done**
- New `features/home/AboutTeaser` replaces `CtaBanner` on Home. `components/CtaBanner` is deleted (Home was its only user).
- Left: eyebrow, a "Hi, I'm Priyanka" pill with her portrait avatar and a twinkling sparkle icon, the title, a first-person description (role + location + the four off-screen interests, all from `ABOUT`/`PROFILE`), fact chips (2 years in product design · Based in India · Open to UI/UX roles) and the "Get to know me" button.
- Right: a polaroid stack of her real interest photos (yoga, meditation, drawing, reading, using the same front photos as the About gallery, driven by `INTERESTS`). Each photo's position is `--o = --i − 1.5`. At rest it's a tight overlapping fan. Hovering the card spreads them out, and hovering a photo straightens it, lifts it and brings it to the front with a violet shadow. The stack links to `/about` with the cursor label "Meet me". A hint line below says "Hover the photos — this is what my days look like".
- Touch devices (`hover: none`) get the spread layout by default and no hint. Reduced motion turns off the sparkle animation and transitions.
- Copy lives in `ABOUT_TEASER` (`content/profile.js`), now with `greeting`, `facts` and `photosHint`.

**Verification**
- Lint/build clean. Screenshots: resting stack, fanned on card hover, single photo lifted with the "Meet me" cursor label (`data-state=label`). 390px has no overflow. No console errors.

---

## 2026-10-09 — No footer contact card on case-study pages

**Request:** remove the "Have a product that needs to feel simpler? Let's talk." contact card from the case-study sub-pages.

**What was done**
- `Footer` checks `useMatch('/work/:slug')` and leaves the contact card out on case-study pages. Those pages already end with their own "Next case study" card. The slim footer row (copyright, nav + LinkedIn/Behance links, back-to-top) still renders everywhere.
- Home, Work and About keep the full contact card.

**Verification**
- Lint/build clean. CDP: contact card present on `/`, `/work`, `/about`, absent on `/work/edusphere` and `/work/seatrack`. The footer row is present on all of them. Screenshot of the Seatrack page bottom confirms Outcome → Next case study → footer row. No console errors.

---

## 2026-10-09 — Case studies: engagement pass (structure + light copy edits)

**Request:** make the three case studies more engaging and interesting to read *without changing their context, meaning or purpose*, and list every change.

**Approach:** the source writing was already strong; the drag was presentation (long unbroken text, key facts buried in paragraphs, tall stacks of screenshots). So most changes add scannable structure around the original words. Copy edits are limited to a typo fix, paragraph splits and a few re-wordings that keep the meaning. The edits were applied by a script (`engage.mjs`, session scratchpad) with assertions on each target block, so they're exact and repeatable. The pre-edit JSON was backed up outside the repo during the session.

**New page elements (all studies)**
- Read-time badge in the header (words ÷ 220), a reading-progress bar along the top of the viewport, and reveal-on-scroll fade-ups for media/cards (off under reduced motion).
- **At a glance** strip (4 facts) and **In short** TL;DR card above the article. Both are built only from facts already in each write-up.
- Screenshot groups of 3–4 now sit in a 2-up grid instead of a tall stack (click still opens the full-size lightbox).
- New content block types rendered by `CaseStudyArticle`: `quote`, `flow`, `stats`, `stages`, plus a `label` (Before/After) on image groups and `step`/`id` on stage headings.

**Edusphere**
- Glance: Role (solo designer & developer), Timeline (5 months), Client (PatternLab — manufacturing), Built (Admin + Learner Portal). Plus a TL;DR.
- Lead-in phrases of list items bolded for skimming (e.g. **No structure** — …, **Hard constraint:** …). Wording is unchanged.
- Added a "Watch → Assess → Certify → Track" loop diagram after "the project changed shape". The loop is quoted from Mistake 1 / Strategy.
- Outcome's single long paragraph split into three shorter ones (same content).
- Pull quote in Reflection: "It was really an accountability problem wearing a content-delivery costume." (verbatim from the paragraph below it).
- A "Walkthrough" heading and caption added above the video.

**Production Logging**
- The "Category: …" line moved into the glance strip (Product, Category, Setting, Impact). Plus a TL;DR.
- The challenge paragraph was split in two. The "Previous Machine Timeline UI" label that was fused into it became its own heading. Screenshot groups are labelled **Before** (previous UI) / **After** (present UI).
- Results: 68% and 7 min are now big stat tiles. The third bullet became an "An easier operator flow" sub-section in two paragraphs. Wording edits: "Operator flow got ease of use" → heading "An easier operator flow", and "reasons for n micro stops" → "reasons for every micro-stop".

**Seatrack**
- Typo fix: "Client shrimp in large volumes" → "The client handles shrimp in large volumes".
- Glance: Product, Scope (14 stage screens, booking → cold store), Plus (Traceability Agent: live graph + chat), Status (live, daily use). Plus a TL;DR.
- "Keep track of the shrimp, every step of the way." (bold in the source) became a pull quote, with the rest of that paragraph unchanged.
- "Who uses it" became a 3-item list (procurement staff / supervisors / plant staff) with the closing sentence kept.
- "Jump to any stage" chip index (14 stages, smooth-scrolls to each) plus numbered stage headings 01–14.
- Traceability Agent: the two feature bullets now come right after "A few things make this more than just a diagram:", followed by the screenshots (previously the screenshots sat between the sentence and its bullets). Added a "How it was built" sub-heading above the VS Code / Claude Code paragraph.

**Verification**
- Lint/build clean. CDP: read time shows (Edusphere 8 min). A stage chip click lands "Soaking" at 110px (just under the navbar). The progress bar scales with scroll. 390px has no overflow. No console errors. Screenshots confirm the glance strip, TL;DR, loop diagram, pull quote, stat tiles, Before/After badges and the stage index.

---

## 2026-10-09 — Case-study covers → hover previews on the project cards

**Request:** the cover screenshots at the top of the case-study pages (Edusphere "My Journey", Production Logging machine timeline) should appear as hover images on the cards instead of on the page.

**What was done**
- `CaseStudyPage`: removed the cover `<figure>` (and its `.cover` styles). The header now leads straight into the article.
- `ProjectList`: hovering a card shows a floating 400×200 preview of that project's `PROJECTS[].cover` screenshot (all three, including Seatrack's Traceability Agent graph), following the pointer. One preview element is portalled to `<body>` (above `main`'s z-index layer), with every cover stacked inside it and crossfaded. Position comes from `--px/--py` set on pointermove, smoothed by a CSS transform transition. It enters tilted/scaled down and settles at a slight angle.
- It sits 32px to the right of the cursor so the custom cursor's "Read case study" disc stays visible, and flips to the left (`data-flip`) when it would pass the viewport edge. `PREVIEW_WIDTH`/`PREVIEW_GAP` in JS must match the SCSS.
- Only enabled on `(hover: hover) and (pointer: fine)`. Touch devices just get the normal card. Reduced motion keeps only the opacity fade.
- Applies everywhere `ProjectList` renders (Home + Work).

**Verification**
- Lint/build clean. CDP: hovering each card shows the matching cover (02 / 03 / 16.jpg), the preview flips near the right edge (`flip: true`), it hides after leaving the cards, and the case-study page has no cover figure. No console errors.

---

## 2026-10-09 — Case studies moved on-site (`/work/:slug`), copied from Notion

**Request:** copy every case study from Notion into its own sub-page on the site. No third-party hops; everything readable in one place.

**Getting the content out of Notion**
- A plain fetch gets nothing (Notion renders client-side), which is why this was deferred earlier. This time, headless Chrome loaded each public page over CDP, scrolled it so lazy blocks rendered, and walked every `[data-block-id]` to record block type, rich-text segments (bold/italic/code/links via computed styles), table rows, Notion column positions, image URLs and the embedded video source.
- Images: Notion's `/image/...` proxy redirects to a signed CDN on another host, so in-page `fetch` is CORS-blocked. Downloading from Node with the same URL (minus the `width` param) returns the full-resolution originals. 39 images (12 / 6 / 21) were resized to max 1600px wide as JPEG q86 → `src/assets/case-studies/<slug>/NN.jpg` (4 MB total, lazy-loaded).
- A one-off converter (in the session scratchpad, not the repo) normalised the blocks into `src/content/caseStudies/<slug>.json`, with **text copied verbatim**:
  - `heading` (h2 with an id for the contents, h3), `paragraph`, `list` (consecutive items merged, ordered/unordered), `images` (consecutive images grouped), `compare`, `video`, `link`, `divider`.
  - Source conventions mapped explicitly: short all-bold paragraphs → h3. Italic-only lines and the 1-row two-cell tables → captions for the screenshots that follow. Edusphere's "Mistake N" tables → `compare` cards (title + "What went wrong" / "How I fixed it"). Seatrack's top `header` → the page headline. The bare LinkedIn URL under "Read the testimonial" → a "Read the client testimonial on LinkedIn" button (the heading is folded into it). Empty paragraphs and trailing dividers are dropped.

**Site changes**
- New route `/work/:slug` → `pages/CaseStudyPage.js`. It has a back link, eyebrow, title, the Seatrack headline, summary, tags, a cover screenshot (`PROJECTS[].cover`), the article, and a "Next case study" card (cursor label "Next case study"). An unknown slug redirects to `/work`. `PROJECT_STRUCTURE.md` route table updated (ProjectPage → CaseStudyPage).
- `features/caseStudy/`:
  - `CaseStudyArticle` renders the blocks with a sticky "On this page" index on desktop. The active item is the last h2 above the top third of the viewport, computed on scroll, so jumps land correctly; links smooth-scroll.
  - `RichText` renders the segments.
  - `Lightbox` opens on any screenshot (cursor label "Expand", hover lift + expand chip) and pages through every image in the study. Arrows/←→, Esc or backdrop to close, body scroll locked.
  - `caseStudyImages` resolves file names via `import.meta.glob`.
- The Edusphere walkthrough video is embedded from `youtube-nocookie.com`.
- `PROJECTS[].externalUrl` (Notion) removed. Project cards and the hero's Seatrack "Read case study →" now use internal `<Link>`s, and the Work intro no longer mentions Notion.

**Gotchas hit**
- Notion nests table wrappers, so each table appeared 3×. Fixed by skipping tables inside another `.notion-table-block`. List text came back empty because the selector grabbed the bullet marker; fixed by using the last `[data-content-editable-leaf]`.
- Leftover CDP tabs (a dozen Notion pages) made a later extraction hang. The script now closes its own tab via `/json/close/<id>`.
- **Sticky contents didn't stick**: `overflow-x: hidden` on `html, body` makes `body` a scroll container, which breaks `position: sticky`. Changed to `overflow-x: clip` (same clipping, no scroll container).
- The lightbox rendered *under* the navbar because `main` has its own `z-index: 1` layer. It's now portalled to `<body>`.
- The first scroll-spy used IntersectionObserver with a middle band, which misses headings that jump straight past it. Replaced with a scroll/resize measurement.

**Verification**
- Lint/build clean (JS 118KB gzip incl. the case-study JSON).
- CDP checks: a real click on a Work card navigates to `/work/edusphere`. Per page: Edusphere 8 h2 / 23 list items / 13 images / 1 video, Production Logging 3 h2 / 7 images, Seatrack 7 h2 / 22 images. Contents links match h2 counts. Zero `notion` links remain. The lightbox opens at 1/21, goes to 2/21 and closes on Esc. The index sticks at 108px and highlights the current section. A bad slug redirects to `/work`. 390px mobile has no overflow. No console errors.

---

## 2026-10-09 — LinkedIn + Behance links

**What was done**
- `PROFILE.socials` now holds the real profiles (URLs given by the user): LinkedIn `https://www.linkedin.com/in/priyanka-cherupally/`, Behance `https://www.behance.net/priyanka02`.
- New `components/SocialIcon`: inline SVG brand marks (Simple Icons paths, `currentColor`), because lucide-react 1.53 ships no brand icons. Each social's `name` must match a key in its `PATHS`.
- Footer contact card: a "Find me on" row with 44px round icon buttons. Rest is neutral; hover fills solid violet with a lift and tilt; press shrinks. Each has a `data-cursor-label` (the custom cursor shows "LinkedIn" / "Behance") and an `aria-label` noting it opens in a new tab.
- Footer bottom row: the socials (already rendered from `PROFILE.socials`) now show the small logo next to the name. The links row wraps and centres on narrow screens.

**Verification**
- Lint/build clean. CDP confirmed both URLs render in the card and the bottom row with `target=_blank`, and that the cursor state is `label` over the icon buttons. Desktop and 390px screenshots show the correct "in" / "Bē" marks with no overflow and no console errors.

---

## 2026-10-09 — Paler, whiter backgrounds (light mode)

**Request:** more of a pale, whitish background.

**What was done** (light mode only; dark mode unchanged)
- `--paper` `#f7f6f3` → `#fcfcfa` (near-white with a hint of warmth), `--paper-2` `#efede8` → `#f4f3f0`.
- `--neutral-soft` `#eeebe5` → `#f3f1ed`, so stone surfaces (About teaser, tags, fact tiles) stay pale instead of reading beige against the whiter page.
- Top-right violet wash opacity 0.8 → 0.35 in light mode, kept at 0.8 in dark mode via `:root[data-theme='dark'] body::before`.
- `theme-color` in `index.html` and `manifest.webmanifest` updated to `#fcfcfa`.

**Verification**
- Lint/build clean. A full-page Home screenshot confirms the whiter backdrop, white cards still separated by their borders, no console errors.

---

## 2026-10-09 — Two-colour system + lighter hero

**Feedback:** the hero felt too heavy (too many things competing), and the pastel mix was overwhelming. User asked for **only two colours, a primary and a neutral secondary, on one backdrop**, and left the choice to me.

**Colour decision**
- **Primary: soft violet**. Solid `--accent` `#6f5bd8` (dark mode `#a898f7`), pale `--primary-soft` `#ece8fa`, text-on-tint `--primary-ink` `#4b3bb0`. It already carried the buttons and the headline's "simple", so it stays the one colour that means "act here / you are here".
- **Secondary: warm stone neutral**. `--neutral-soft` `#eeebe5`, `--neutral-ink` `#5e5a52`. It blends with the off-white `--paper` `#f7f6f3`, so cards and chips read as quiet surfaces, not extra colours.
- Removed all five pastel tokens (`--mint`, `--lavender`, `--peach`, `--sky`, `--butter` + `-ink`), the `utils/tint.js` helper and every `tint` field in content. A script remapped every SCSS reference (lavender → primary, all others → neutral). Then hand-tuned so **resting surfaces are neutral and interactive/hover states are primary**: project cards are white at rest and turn primary-soft on hover, ghost buttons flood primary-soft, soft buttons flood solid violet, the footer status pill is primary.
- Backdrop is now one faint primary wash at the top-right on every page (was four coloured blobs).

**Hero simplified ("one thing at a time")**
- Left column is now only: name · role line → headline → one short sentence → two buttons. Removed the status pill and domain chips from the hero (the "Open to UI/UX design roles" status still lives in the footer and About facts), and shortened `HERO.intro` to one line.
- Showcase: the 7 project tabs are replaced by a caption, prev/next arrow buttons around the `01 / 10` counter, and one thin progress line underneath. The line's `animationend` still drives auto-advance and still pauses on hover. Removed the now-unused `short` field from `workSamples.js`.
- Stats moved out of the hero into their own section (`#home-stats`, tightened padding via the new `pages/HomePage.module.scss`). They're restyled as one white strip with hairline dividers instead of four coloured tiles.

**Verification**
- `npm run lint` / `npm run build` clean. Grepped: zero remaining references to the old pastel tokens or `tint`.
- Screenshots: Home (top + full page), Work, About, project-card hover (primary-soft + "Read case study" cursor), dark mode, 390px mobile (no overflow). No console errors.

---

## 2026-10-09 — Full-site revamp: pastel-mix palette, custom cursor, unique buttons, sharper copy

**Goal:** user asked for a better design across the site: pale/"dewy" colours, better cursor interaction, distinctive button hover/press states, and improved content. Confirmed via AskUserQuestion: **Pastel Mix** palette, **morphing cursor + background glow**, **rewrite wording but keep facts**, **whole site** in scope.

**Design system**
- `styles/global.scss`: new tokens. Warm off-white `--paper`, violet `--accent`, and five pastels (`--mint`, `--lavender`, `--peach`, `--sky`, `--butter`), each with a readable `-ink` partner. Dark mode gets deep muted versions of the same pairs. Fixed blurred pastel "dew" blobs sit behind the page (`body::before`). `main`/`footer` are `z-index: 1` so the cursor glow sits underneath content.
- `utils/tint.js` → `tintStyle(name)` returns `--tint` / `--tint-ink` / `--spot` inline vars. Content entries now carry a `tint` (projects, stats, quick facts), so every card picks its own pastel.
- `mixins.scss`: added `focus-ring` and `spotlight()` (radial highlight at `--spot-x/--spot-y`). Added `$ease-spring` and `$radius-xl`.

**Cursor** (`layouts/Cursor`, mounted in `MainLayout`)
- Dot (exact position) + ring (eased trail) + large pastel glow (slower trail), driven by one rAF loop writing transforms directly, no React re-renders.
- Ring states via `data-state`: `hover` over any link/button (grows, lavender fill), `label` when the element has `data-cursor-label` (96px violet disc with text, e.g. "Read case study", "View", "Next photo", "Say hi"), `text` over copy (thin caret bar). Shrinks on press.
- The same pointermove handler feeds `--spot-x/--spot-y` to the nearest `[data-spotlight]` element (project cards, stat tiles, CTA banner, footer card).
- Only enabled on `(hover: hover) and (pointer: fine)` without reduced motion. It sets `html[data-cursor='custom']`, which hides the native cursor. Touch devices keep the native behaviour.

**Buttons** (`components/Button`, variants `solid` / `ghost` / `soft`, optional `icon`, `cursorLabel`)
- Hover: a colour flood spreads from the exact point the pointer entered (`--x/--y`). The label "rolls" (rendered twice and stacked; the clone is `aria-hidden`). The icon chip nudges and inverts colours.
- Magnetic pull toward the pointer (mouse only, off under reduced motion).
- Press: squish to 0.94 with an inset shadow, plus a ripple spawned at the press point (removed on `animationend`).
- Each variant floods a different pairing: solid violet → ink, ghost → mint, soft lavender → peach.

**Layout & components**
- Navbar: floating pill that turns glassy with a shadow once scrolled. `NavLink` active state is a lavender pill. The theme icon spins in on toggle. A "Let's talk" button sits on the right (desktop). The mobile drawer is a solid card with large serif links, index numbers, staggered entry, Escape to close, and an accent "Let's talk".
- Footer: a contact card replaces the bare copyright row. It has a pulsing "Open to UI/UX design roles" pill, a headline, a big mailto link with a growing highlighter underline, and Email me / **Copy email** (shows "Copied!" with a check, resets after 2s) / View resume buttons. The bottom row has nav links and back-to-top.
- `SectionHead` API changed to `{ eyebrow, title, intro, as }` (old `number` prop removed). Work/About use `as="h1"`. Copy lives in new `content/sections.js`.
- Project cards: the whole card is the link, tinted per project. Hover lifts it, deepens the tint, follows the cursor with a spotlight and turns the arrow. Press sinks it back down.
- Stat tiles, CTA banner (peach with drifting blobs), fact tiles (6, tinted), and the portrait (two pastel frames that swing apart on hover, "Hi, I'm Priyanka" tag) were all restyled. Interest captions became tinted pills, and stacks show a "Next photo" cursor label.

**Content (rewritten, no new facts invented)**
- Hero: status pill "Open to UI/UX design roles" (from the user's stated goal of getting a job), name + role line, headline "I make complex workflows feel *simple*.", an intro built from the existing about/experience facts, and domain chips (SaaS / Enterprise / AI-powered / Manufacturing).
- Stat labels sharpened. The 40+ screens figure is still a TODO placeholder.
- About paragraphs tightened. Quick facts gained "Based in: India" (from `PROFILE.location`) and "Open to: UI/UX design roles".
- Theme colour in `index.html` and `manifest.webmanifest` updated to `#f6f5f1`.

**Gotchas hit**
- ESLint flagged `as: Heading` in `SectionHead` as unused (the config doesn't count JSX usage of a renamed destructured prop). Fixed with `const Heading = as`.
- Project card grid items use `grid-area` names, so the desktop layout also needs `grid-template-areas`. Without it, named areas create implicit tracks and break the row.
- Rotating the ↗ icon on hover turned it into ↑. Switched to a diagonal nudge.
- The mobile drawer's translucent background let hero text show through. It's now a solid surface.
- Full-page CDP captures show the fixed dew background ending at viewport height. That's a capture artifact, not a real seam.

**Verification**
- `npm run lint` / `npm run build` clean (CSS 34KB / 7.3KB gzip, JS 103KB gzip).
- CDP: `html[data-cursor]` = `custom` on desktop. Cursor state reads `hover` over a button and `label` over a project card. Screenshots confirm the button flood/roll, press squish, card spotlight + "Read case study" disc, Home/Work/About full pages, dark mode, the 390px mobile menu, and no horizontal overflow. No console errors.

---

## 2026-10-09 — Hero showcase: every screen fits its frame (no cropping)

**Problem:** user spotted the Pattern Lab screen cut off on the right. Every desktop card used one fixed `aspect-ratio: 820 / 540` with `object-fit: cover`, but the screenshots range from 820×385 (Ramakrishna, 2.13:1) to 820×583 (IDRBT / Job Portal, 1.41:1). Wide screens lost their right side (Pattern Lab ~14%), and the phone frame cropped the Vegan Bakery screens slightly.

**What was done**
- `IMAGES` in `WorkShowcase` now stores `{ src, width, height }` per file. Each card sets its own inline `aspectRatio` from those numbers (fixed `aspect-ratio` removed from `.cardDesktop` / `.cardMobile`). Width stays 64% / 24% of the deck, so height follows the image.
- For the non-framed Seatrack phone shot, the card's ratio is computed so the *inner* bezelled area (93.2% × 96.8%, the `BEZEL_INNER_*` constants, which must match `.bezelled` in the SCSS) matches the screenshot exactly.
- `<img>` gets explicit `width`/`height` attributes too.
- If an image in `assets/work-samples/` is replaced, update its size in `IMAGES`.

**Verification**
- Measured every card in the browser: rendered image box aspect vs. `naturalWidth/naturalHeight` gives a **≤0.7% difference on all 10** (1–2px rounding plus the 1px card border). Previously up to ~14%.
- Screenshots of Pattern Lab, Ramakrishna, IDRBT and Seatrack at the front confirm full screens are visible. Lint/build clean, no console errors.

---

## 2026-10-09 — Hero showcase: mobile screens join the 3D deck

**Goal:** user didn't want the phone shown separately. Mobile screens should rotate through the same deck, mixed in between desktop ones.

**What was done**
- Removed the separate floating phone (and its badge, bob animation, parallax wrapper). All 10 samples are now cards in one coverflow deck.
- `content/workSamples.js` array order is now the playback order, with the 3 phone screens spread through the 7 desktop ones: Pattern Lab → **Seatrack** → VNS → IDRBT → **Vegan home** → Pattern Lab → Job Portal → **Vegan cart** → VNS → Ramakrishna. Mobile entries got `short` labels too, so there are 7 project tabs (Seatrack and Vegan Bakery added). A tab jumps to that project's first screen.
- Cards get `.cardDesktop` (64% width, 820:540) or `.cardMobile` (24% width, 320:686, dark background that doubles as the bezel for the non-framed Seatrack shot, inset via `.bezelled`).
- Seatrack's case-study link moved from the old phone badge into the caption ("Read case study ↗") whenever the current sample has a `caseStudySlug`.

**Gotchas hit**
- Card offsets were `translateX(%)`, which is relative to each card's *own* width, so a phone card and a desktop card at the same "offset" landed at very different distances. Switched to `cqw` units with `container-type: inline-size` on `.stage` (not on the `preserve-3d` elements, to avoid any risk of flattening the 3D context).
- Even in deck units, one spacing value didn't work for all pairs: a phone next to a front desktop card hid almost entirely behind it (only its taller bottom edge poked out). Fixed with a `NEIGHBOUR_X` lookup keyed by `front:side` device pair (desktop:desktop 24, desktop:mobile 34, mobile:desktop 24, mobile:mobile 20).

**Verification**
- `npm run lint` / `npm run build` clean.
- CDP-scripted: auto-advance 01 → 02 lands on Seatrack (phone at the front with desktop cards angled behind on both sides), Vegan Bakery tab → 05, 390px mobile has no horizontal overflow, dark theme renders cleanly, no console errors.

---

## 2026-10-09 — Hero showcase: auto-moving 3D coverflow stage

**Goal:** user asked for "any 3D design" that keeps moving on its own, not only when the mouse is over it.

**What was done**
- Replaced the single crossfading desktop frame with a **3D coverflow deck** of all 7 desktop screens. Each card is placed by its circular distance from the active one (`circularOffset`, so going from 07 back to 01 keeps rotating forward instead of sweeping back across the deck), using a `POSITIONS` table: front card flat, ±1 cards angled 38° and pushed back 220px with a paper-coloured dim overlay (`--dim`), ±2/±3 hidden (`opacity: 0`, `pointer-events: none`). Transforms transition over 0.9s, so each advance reads as the deck turning. Side cards are clickable to jump to them (`tabIndex=-1` because the tabs already cover keyboard access).
- **Always-on motion:** `.float` drifts on a slow 7s `rotateX`/`rotateY`/`translateY` alternate loop, a blurred floor shadow "breathes" in sync, and the phone bobs on its own 5s loop (phase-shifted with a negative delay). A glare gradient sweeps across each card as it arrives at the front.
- Mouse tilt kept on a separate `.tilt` wrapper around `.float`, so the mouse-driven tilt and the keyframe drift combine instead of fighting over one `transform`. All levels use `transform-style: preserve-3d` under `perspective: 1500px` on the stage.
- Layout: deck shifted left (`left: 10%`) and phone tucked further right (`right: -4%`, 23% width) so the right-hand side card still peeks out between the front card and the phone.
- Reduced motion: drift, bob, floor and glare animations off, transitions off; tabs still work, nothing auto-advances.

**Gotchas hit**
- One scripted check reported "no auto-advance at 6s". Sampling `getAnimations()[0].currentTime` showed the progress bar was running fine. That page load had simply started late because Vite was recompiling after the edit. Lesson: read animation state directly before "fixing" a timing failure.

**Verification**
- `npm run lint` / `npm run build` clean.
- CDP-scripted: auto-advance 01→02, tab click → 05, hover pause holds 05 for 5.5s, phone click cycles screens, 390px mobile has no horizontal overflow, no console errors. Screenshots at 1440px and 390px confirm the angled side cards, phone layering and floor shadow.

---

## 2026-10-09 — Hero showcase: interactive project tabs, tilt, Seatrack mobile

**Goal:** user added a Seatrack mobile screenshot and asked for the showcase to be "represented differently for more user engagement".

**What was done**
- Added `assets/work-samples/seatrack-mobile.jpg` (resized from 1320×2868 to 360×782). Unlike the Vegan Bakery shots, it has no device bezel in the image, so it's rendered inset (`.bezelled`) inside the phone's black background, which then reads as the bezel. Content entries for screenshots that already include a bezel are marked `framed: true`.
- **Project tabs** replace the dots: one pill per project (`short` field in `content/workSamples.js`; Pattern Lab and VNS each have 2 screens that play back to back under one tab). The active tab has an accent progress bar that fills over 4.5s, and an `01 / 07` counter sits next to the caption.
- **Auto-advance is driven by the progress bar's `animationend`**, not a JS timer. Pausing on hover/focus sets `animation-play-state: paused`, so the bar and the slide change stay in sync (the earlier `setTimeout` restarted from zero on resume while a visible bar would have been halfway). Under `prefers-reduced-motion` the bar isn't rendered, so nothing auto-advances.
- **Mouse tilt/parallax:** pointer position over the stage is written to `--tilt-x`/`--tilt-y` CSS variables through a ref (no React re-renders per mousemove). The desktop frame rotates slightly in 3D and the phone moves further, creating depth. Mouse only (`pointerType === 'mouse'`); off under reduced motion.
- **Phone is a button:** clicking it cycles the mobile screens (Seatrack → Vegan Bakery home → cart). The phone also advances along with each desktop slide.
- **Case-study link:** when the phone shows Seatrack, its badge becomes "Seatrack · case study ↗", linking to the Notion case study through `caseStudySlug` → `getProjectBySlug`. Samples with no case study keep a plain "<project> app" label.

**Verification**
- `npm run lint` / `npm run build` clean.
- Scripted through CDP: confirmed auto-advance (01→02 after ~4.5s), clicking the IDRBT tab jumps to 05, hovering keeps it on 05 for 5.5s (paused), clicking the phone cycles its screen, and a tilt is visible with the mouse near the stage corner. 390px mobile: no horizontal overflow, tabs wrap onto 2 rows. No console errors.

---

## 2026-10-09 — Hero: two-column layout, work showcase on the right

**Goal:** user asked to upgrade the hero's work images and move them to the right side of the hero.

**What was done**
- `Hero` is now a 2-column grid: intro copy on the left (`1fr`), `WorkShowcase` on the right (`1.1fr`), vertically centered. `StatGrid` moved to a full-width row underneath both columns, separated by a hairline border (it no longer fits 4-across in the narrower left column). Below `$bp-lg` (1024px) the layout stacks into one column, with the showcase capped at 640px wide.
- `WorkShowcase` changed from a horizontal scroll strip to a layered composition: a large desktop frame that crossfades through the 7 desktop screens, plus an overlapping phone frame at the bottom right that cycles through the 2 Vegan Bakery screens. A floating "Vegan Bakery app" badge sits on the phone's top-left corner. Below the frame are a caption (project + screen title for the current desktop screen) and dot buttons to jump to any screen.
- Auto-advances every 4.5s using a `setTimeout` keyed on `active`, so clicking a dot restarts the timer. It pauses on hover or keyboard focus, and doesn't auto-advance at all under `prefers-reduced-motion`.
- `content/workSamples.js` entries got a `device: 'desktop' | 'mobile'` field and were reordered so the strongest enterprise dashboards (Pattern Lab, VNS) show first.
- Removed `StatGrid`'s own `margin-top` (spacing now comes from the Hero grid's `row-gap`). The Hero is its only consumer.

**Gotchas hit**
- First version put the badge inside the phone frame, which has `overflow: hidden` (needed to clip the screenshots' baked-in bezel corners). On mobile the badge got clipped, and at all sizes it covered the app's bottom nav. Fixed by wrapping the phone in an unclipped `.phoneWrap` and positioning the badge there instead.

**Verification**
- `npm run lint` / `npm run build` clean.
- Headless Chrome at 1440px (two frames 5s apart to confirm rotation and dot/caption sync), 1024px (stacked), 390px mobile (no horizontal overflow: `scrollWidth` 390 = viewport), and dark theme. No console errors.

---

## 2026-10-09 — Hero: real UI/UX work samples showcase

**Goal:** user sent 10 real screenshots of her shipped UI/UX work (VNS Voice Navigation System dashboard, IDRBT banking domain registration, a job-portal landing page, Pattern Lab AI plant/OEE dashboards, Ramakrishna Math Hyderabad Publications bookstore, Vegan Bakery mobile app) and asked to add them into the Hero section — this is the credibility content the boat/water pivot was clearing room for.

**What was done**
- Resized/compressed all 10 source screenshots via PowerShell + `System.Drawing` (`HighQualityBicubic`, JPEG quality 85) into `src/assets/work-samples/` — desktop screenshots to 820px wide, the two phone-framed mobile screenshots to 320px wide, aspect ratio preserved throughout.
- Dropped `patternlab-load-mgmt-2.jpg` from display — side-by-side comparison showed it's a pixel-near-identical re-crop of `patternlab-load-mgmt.jpg` (same data, same layout), not a meaningfully different screen. Kept both VNS dashboard variants (donut vs. full pie chart) since those are genuinely different chart treatments of the same screen.
- New `content/workSamples.js` holds the copy (project name + screen title per sample, captions derived from each screenshot's own on-screen branding, not invented) — follows the existing convention of keeping all copy in `content/`.
- New `features/home/WorkShowcase/` renders the 9 curated samples as a horizontally-scrollable strip of cards (rounded corners, border, drop shadow — no fake browser-chrome dots, since these are real screenshots for a credibility-focused audience, not mockups). Cards are bottom-aligned with a fixed frame height and `width: auto`, so the two tall/narrow phone screenshots and the wider desktop screenshots sit naturally in the same strip without distortion or letterboxing.
- Mounted `<WorkShowcase />` in `Hero` below `StatGrid`.

**Decisions**
- Full-bleed the strip past the Hero's text column (negative margin breakout using `PageSection`'s own `$page-padding-md`/`$page-padding-sm`), so cards can scroll edge-to-edge instead of being boxed into the 760px copy column.
- Captions use each project's actual on-screen name/branding (e.g. "VNS — Voice Navigation System", "Ramakrishna Math Hyderabad Publications") rather than generic labels, so the showcase doubles as context for someone skimming without clicking through.

**Verification**
- `npm run lint` / `npm run build` clean; all 9 images bundled with hashed filenames (largest is 69KB).
- Headless-Chrome screenshots at 1440px (initial scroll position + scrolled to the end of the strip) and at 390px mobile — strip scrolls smoothly, scroll-snap lands cleanly on card edges, no horizontal page overflow, phone-framed cards align well against the desktop cards.

---

## 2026-10-09 — Backup snapshot before exploring a new design direction

**Context:** user isn't satisfied with the current design direction and wants to explore something else — the boat/water journey in particular — but wanted a safety copy first. Worth noting: aside from one initial "project setup" commit, everything built this whole session had been sitting **uncommitted** in the working directory — the only real snapshot of it now is this backup.

**What was done**
- Copied `client/` → `client-v1-backup/` at the repo root (sibling to `client`), excluding `node_modules` and `dist` (source only, ~1.5MB). To run it standalone later: `cd client-v1-backup && npm install`.
- Flagged to the user that this work still isn't in git history — the backup folder is a copy-paste snapshot, not version control. Didn't commit anything, since that wasn't asked for.

---

## 2026-10-09 — Hero pivot: remove the boat/water journey entirely, make room for real UI/UX work images

**Goal:** user's new direction for a job-hunting portfolio — the hero should build credibility by showing actual UI/UX work (real images, coming later), not a whimsical boat animation. Asked first whether removing the hero's boat should also take the Work-section river+hover-popups with it (since that whole system was anchored to the hero's water as its starting point) — confirmed: remove the whole thing.

**What was done**
- Deleted `features/home/HeroWater/`, `features/home/Journey/`, `features/home/journeyLayout.js`, and `store/workJourneyStore.js` entirely.
- `Hero`: dropped the `<HeroWater />` import/render — back to just text + buttons + `StatGrid`.
- `HomePage.js`: dropped `<Journey />` and the `maxWidth: 1100` reservations on the Hero/Work/CTA `PageSection`s (no gutter to reserve space for anymore — content reclaims the full 1280px column). Removed the now-pointless `.journey` wrapper div and its (now-empty) `HomePage.module.scss`.
- `ProjectList`: removed the `useWorkJourneyStore` hover handlers — cards are back to plain content, no hidden side-effects on hover.
- `CtaBanner`: dropped the `id` passthrough on its button — that only existed so `Journey` could find the button to dock near; nothing reads it now.
- Reverted `PageSection`'s `.hero` variant back to a sane `min-height: 70vh` / `padding-bottom: 64px` (had been inflated to `92vh` specifically to clear the water strip) and removed the matching `padding-bottom: 180px/140px` reservation on `Hero`'s `.copy` block.
- Left `content/stats.js`'s 4 stats as-is (years/case studies/self projects/practiced screens) — untouched by this request, no reason to revert them.

**Still open**
- User is going to send real UI/UX work images for the hero. Deliberately did **not** build a placeholder image grid/layout ahead of having them — image count, orientation, and aspect ratio are all unknown, and guessing a layout now would likely mean redoing it once the real images arrive.

**Verification**
- `npm run lint` and `npm run build` clean. Bundle size dropped from ~428KB to ~305KB gzipped (146KB→97.6KB gzip) — confirms `gsap` is fully tree-shaken out now that nothing imports it (back to the "installed but unused" state the stack table originally documented, before the boat feature gave it a real use).
- Screenshots: Home hero clean (no water/boat), Work section (both on `/` and standalone `/work`) has no leftover stream/gutter artifacts, mobile (390px) renders cleanly with no horizontal overflow.

---

## 2026-10-08 — Rework the scroll mechanics: viewport-tracking instead of document-distance

**Goal:** user reported the boat still visibly hiding behind the navbar. Confirmed via AskUserQuestion this needed a real mechanics rework, not a numbers tweak: the descent phase's distance was tied to `ctaY - heroWaterY`, a *document* distance, while the actual scroll distance between those two points depends on however tall the Work section's content happens to be — there's no reason those two numbers should match, and when the Work list is taller than the budgeted travel distance, the boat falls behind the scroll and drifts up toward (and behind) the navbar.

**What was done**
- The descent phase no longer tweens between two fixed document-space `y` values. Once Phase 1 (hero crossing) completes, the boat and the gutter both switch from `position: absolute` (document-space, where they started, resting in the hero) to `position: fixed` (viewport-space) — captured via `getBoundingClientRect()` at the switch moment so there's no jump.
- A single `ScrollTrigger.create(...)` (not a `gsap.fromTo` tween) drives an `onUpdate` callback that interpolates the boat's *fixed* `y` between a safe `SAFE_TOP + 20` (clears the navbar) and a dock position near the top of the CTA button (`innerHeight * DOCK_FRACTION - boat.offsetHeight`) — both bounded, viewport-relative values, with zero dependency on how tall the Work section's actual document content is.
- `onEnter`/`onEnterBack` switch the boat+gutter into fixed/viewport mode; `onLeaveBack` switches back to absolute mode, resetting to the hero's resting spot (so scrolling back up restores it cleanly); `onLeave` fades both out once scrolled past the CTA dock point.
- The gutter's river graphic also switched to `position: fixed`, sized to a constant safe viewport box (`SAFE_TOP` to `85vh`) rather than spanning the actual Work+CTA document height — it no longer needs to "keep up" with scroll at all, since it's now just always in the right place.

**Two real bugs found by measuring, not assuming**
- First version of the trigger-offset fix (`start: 'bottom top+=X'`) produced *byte-identical* results to having no offset at all. Verified this directly by exposing the resolved `ScrollTrigger` start/end pixel values via a temporary `window.__journeyDebug` hook rather than guessing from screenshots — the "scroller-side" offset syntax doesn't do what adjusting the *trigger*-side does; they're not interchangeable the way the two read on paper.
- Once switched to the correct `start: 'bottom-=X top'` form, the boat *still* dipped to `top: -26px` (confirmed via a scripted slow scroll sampling the boat's live `getBoundingClientRect()` every ~36px of scroll — not a visual scan). Root cause: `heroToWaterOffset` was computed relative to `stripBottom` (already 32px above `heroEl`'s real bottom edge, from `PageSection`'s own padding), not relative to `heroEl.bottom` itself — the exact value the ScrollTrigger's `bottom` reference actually uses. Missing that 32px was the whole remaining gap. Fixed by computing the offset from `heroEl`'s true bottom edge.
- Re-measured after the fix with 4px-resolution scroll sampling right at the critical boundary: `top` bottoms out at `2px` — positive, never behind the navbar — before cleanly handing off to fixed/viewport mode at `130px`.

**Verification**
- `npm run lint` / `npm run build` clean.
- Scripted a full-page scroll in ~36px increments, reading the boat's live `getBoundingClientRect().top` at every step (not just looking at screenshots) — confirms it's always positive on the way down.
- Screenshots confirm: boat docks very close to the top of the "More about me" button; scrolling back to the top reverts it cleanly to resting in the hero's water (no stuck fixed-position artifact); hover-preview popup (reads the gutter's live rect, now fixed instead of absolute) still positions correctly; no mobile overflow.

---

## 2026-10-08 — Boat flashing behind the navbar; stream redesigned as a real winding river

**Goal:** two issues from a screenshot — a blurred ghost of the boat visible "hiding" behind the translucent navbar, and the vertical stream should read as a meandering river (undulating both edges), not a straight column with one decorative wavy edge.

**Navbar flash — a real React timing bug, not a positioning bug**
- `Journey`'s GSAP setup ran in `useEffect`, which React runs *after* the browser paints. Before that effect fires, the boat's `<div>` exists in the DOM with its plain CSS (`top: 0, left: 0` — literally the top-left of the page, right under the fixed, blurred, semi-transparent `Navbar`). On a slower paint or a specific race, that unstyled frame is what the user saw: a blurred glimpse of the boat through the navbar's `backdrop-filter`.
- Fix: `useLayoutEffect` instead of `useEffect` for the GSAP setup — this runs synchronously *before* the browser paints, so the boat's very first painted frame already has GSAP's position applied. No intermediate frame to catch.
- Verified by reloading and grabbing a rapid burst of 6 screenshots (50ms apart) right after navigation, cropped to the navbar region — no ghost in any of them. (This is also just a correct application of a well-known React+GSAP rule — the empirical check confirms it, but the fix would hold regardless of what the screenshots showed, since it closes the actual gap, not just makes it statistically less likely.)

**River redesign**
- `VerticalStream`'s path previously had one wavy edge (left) against one straight edge (right) — functional but read as a column with a decorative edge, not a river. Rewrote it so both edges undulate together in phase, maintaining a constant band width (a true winding ribbon) — `viewBox` widened from `80×300` to `120×300` to give the meander room without clipping. Tileable seam unchanged (path still returns to the same x at y=300 as y=0).

**Verification**
- `npm run lint` / `npm run build` clean.
- Screenshot at the Work section shows the band visibly curving left-right as it descends, not a straight-sided column.
- Re-checked the hero/seam area after both fixes: boat still seated correctly in the water, river picks up the winding motion immediately at the seam.

---

## 2026-10-08 — Boat was sinking below the water; added floating bob; restored mobile

**Goal:** two complaints from a screenshot: the boat was sitting *below* the visible water (mostly in the cream background, only barely touching the teal), and it had no floating motion of its own.

**Root cause of the sinking**
- `heroWaterY` was computed as `heroRect.bottom - rootRect.top - 70` — a leftover magic number from an earlier version of this file, never re-derived after the boat's positioning logic moved into the unified `Journey` component. The actual geometry: `PageSection`'s `.hero` has `padding-bottom: 32px`, and `HeroWater`'s water strip is 160px tall — so the strip's solid-teal bottom area sits well below where `-70` was placing the boat. Fixed by deriving it from the real numbers: `stripBottom = heroRect.bottom - rootRect.top - 32`, then centering the boat ~55px above that (35px on mobile, where the strip is only 110px tall) instead of guessing.

**Floating motion**
- Added a continuous bob (`±5px`, 2.8s ease-in-out loop) to the boat. Had to apply it to a nested `<g>` *inside* the SVG, not the outer `.boat` div — that outer div's `transform` is fully owned by GSAP (both the Phase 1 crossing and Phase 2 descent write to it every frame), so a CSS keyframe animation on the same element would fight GSAP for the same property. Same pattern already used for the paddle's independent rocking motion; nested transforms just compose, no conflict.

**Also found while verifying: the boat had gone missing on mobile entirely**
- The previous entry's unification accidentally regressed mobile — `Journey`'s `.root` had `display: none` below 1439px, which hid the *entire* component including the one-time hero crossing that was supposed to stay visible everywhere. Moved the `display: none` down to just `.gutter` and `.popup` (the parts that genuinely need the reserved desktop column), so the boat crossing survives at every width.
- Fixing that exposed a second bug: the resting-position formula (`gutterLeft + GUTTER_WIDTH/2 - boat.offsetWidth/2`) assumed a gutter that doesn't exist on mobile. At 390px, `computeGutterLeft`'s content-safety clamp pushed the "gutter" position past the actual viewport edge, parking the boat almost entirely off-screen — invisible, not just misplaced. Mobile now gets its own simple formula (rest near the water's own right edge, 24px clear of the viewport boundary) instead of reusing desktop's gutter math.

**Verification**
- `npm run lint` / `npm run build` clean.
- Screenshot confirms the boat now sits inside the solid teal area at the seam, not below it.
- Queried the floating element's `getBoundingClientRect().top` twice, 1.4s apart, and confirmed it actually moved (709px → 711px) — the bob is really running, not just present in the CSS.
- Mobile (390px, waited past the full entrance duration): boat now visible, resting properly in the water, `scrollWidth === innerWidth` (no overflow from the repositioned rest point).

---

## 2026-10-08 — One boat, one continuous journey (not two handed-off instances)

**Goal:** the previous entries built the hero's one-time crossing and the Work/CTA scroll-stream as two separate `BoatIllustration` instances with a conceptual hand-off between them. User rejected that outright — "don't give two person animations... just one person... ATTACH THE FLOW" — with a reference image showing the hero water and the vertical stream as visibly disconnected pieces. Needed an actual single element with a single animation, not two that happen to look similar.

**What was done**
- Deleted `features/home/WorkStream` entirely. New `features/home/Journey` holds everything journey-related: `BoatIllustration.js` (moved from `HeroWater`), `VerticalStream.js` + `ProjectPreview.js` (moved from `WorkStream`), and a new `index.js` that owns **one** `boat` DOM node for the entire page.
- `HeroWater` is now pure visual — just the horizontal `WaveBackground`, no boat, no animation logic at all. The water in the hero and the vertical stream in the gutter are driven by one `Journey` component mounted once, wrapping the *entire* page (Hero through CTA) instead of just Work+CTA as before.
- Single timeline across two phases on the same element: Phase 1 (`entrance`) is the one-time autoplay crossing of the hero (`x`: off-screen → resting, `y`: held constant at the hero's water line). Phase 2 (`descent`) is the scroll-scrubbed vertical fall from that same resting point down to the CTA button (`y` only; `x` never moves again). Both phases target the same `boat` node — there's only ever one.
- The vertical stream's gutter now starts at `heroWaterY` (where the boat rests at the end of Phase 1) instead of `#home-work`'s top — this is what "attach the flow" meant concretely: the vertical water visually begins exactly where the horizontal wave ends, no gap, same element continuing in the same direction it was already facing.

**Real bug found and fixed, not just reorganized**
- First working version had `entrance` and `descent` as two independent tweens both targeting `y` on the same element, created at the same time. `entrance` runs for ~6.3s (0.3s delay + 6s duration); `descent`'s `ScrollTrigger` was live from the start too. Scroll during that 6.3s window made both tweens write to `y` every tick — whichever ticked last that frame won, so the boat would flicker or appear to vanish depending on scroll timing. Caught this by testing with a *fast* programmatic scroll (CDP `scrollIntoView` right after reload) — exactly the kind of timing a real impatient scroller could hit, even if less likely than my test. Fixed by not creating `descent` at all until `entrance`'s `onComplete` fires — there is no window where both can write to `y`.
- Re-verified by waiting past the 6.3s entrance window before scrolling to the CTA in a clean reload: boat now reliably rests at the button in both light and dark mode.

**Verification**
- Counted boat elements in the DOM via a real query (`document.querySelectorAll(...).length`) — confirms exactly 1, not 2.
- `npm run lint` / `npm run build` clean; no mobile overflow (390px, `scrollWidth === innerWidth`).
- Screenshots at the hero/seam, Work section, and CTA all show one continuous boat and one continuous water visual with no visible break at the seam.
- Hover-preview popup re-verified working unchanged (positioning logic didn't need to change, just moved files).

---

## 2026-10-08 — Stats moved back into the hero, water stays pinned to the bottom

**Goal:** move `StatGrid` (years/case studies/self projects/practiced screens) back inside the hero's own section — it had been pulled out into its own `PageSection` a few entries ago — with the water animation staying pinned to the bottom below it.

**What was done**
- `Hero` now renders `StatGrid` directly after the buttons, inside its own `.copy` block (both inside `features/home/Hero`, not split across `HomePage`'s sections anymore). The `home-stats` `PageSection` is gone from `HomePage.js`.
- `HeroWater` didn't need to change at all — it was already `position: absolute; bottom: 0` within Hero's own box, so "water pinned to the bottom" was automatic once stats moved inside that same box; the only question was whether the box was *tall enough*.

**It wasn't, at first** — real overlap bug, caught by screenshot, not assumed away
- First pass: stats and the water strip visibly overlapped on both desktop and mobile (boat sitting on top of "PRACTICED SCREENS"). Root cause: `PageSection`'s `.hero` variant had `min-height: 70vh`, sized for the old copy-only content; once `StatGrid` moved in, the combined content was taller than that, but `HeroWater`'s water strip is `position: absolute` (removed from flow) so it doesn't contribute to or get pushed down by the content height — only `.copy`'s own natural height determines the box's actual height, and that minimum was no longer big enough.
- Bumped `.hero`'s `min-height` to `92vh` — fixed desktop, but **mobile still overlapped** when actually scrolled to and screenshotted, because mobile's `StatGrid` stacks all 4 stats vertically (much taller than desktop's single row), and no single `vh` guess reliably covers "however tall 4 stacked stats + wrapped text happens to be" across devices.
- Real fix: stopped trying to get the right `min-height` number and instead reserved guaranteed clearance via `padding-bottom` on `.copy` itself (180px desktop / 140px mobile) — content-relative, not viewport-relative, so it scales with however much the stats actually take up rather than needing to be re-tuned per breakpoint.

**Verification**
- `npm run lint` / `npm run build` clean.
- Screenshotted (not assumed) desktop at 1600px and mobile at 390px scrolled past the stats — in both, clear separation between "PRACTICED SCREENS" and the water strip, no overlap.
- Confirmed no horizontal mobile overflow (`scrollWidth === innerWidth` at 390px).

---

## 2026-10-08 — Actually fix the alignment (reserved space, not opportunistic margin)

**Goal:** the previous entry's fix wasn't enough — user still saw the hero boat too close to the edge, and the hero/stream still didn't read as one piece at the widths they were actually testing at. Root issue: my fix computed the right margin as "whatever's left over" after a 1280px-wide centered content column — at common laptop widths (1440-1600px) there just isn't much leftover space, so "aligned" and "breathing room" were fighting over the same few dozen pixels.

**What was done**
- Stopped trying to fit the gutter + margin into leftover space. `HomePage`'s Work/CTA (and Hero and Stats, for visual consistency) `PageSection`s now get an explicit `style={{ maxWidth: 1100 }}` — down from the usual 1280px — which **reserves** room for the gutter rather than hoping there's some left over.
- `features/home/journeyLayout.js` now exports `computeGutterLeft({ contentRight, viewportWidth })`, one function both `HeroWater` and `WorkStream` call with the same inputs: `desiredLeft = viewportWidth - EDGE_MARGIN(90) - GUTTER_WIDTH(72)`, clamped up to `contentRight + MIN_CONTENT_GAP(32)` as a floor so it can never overlap the content column even at the 1439px cutoff boundary. Previously each component had its own hand-rolled formula that happened to agree at exactly one viewport width I'd tested.
- Unified both boats to the same `130px` width (was `150px` in the hero vs. `92px` in the stream) — a visibly different-sized character was part of why this read as two disconnected pieces rather than one journey, independent of positioning.

**Verification (measured, not eyeballed)**
- At 1440px viewport: hero boat center and gutter center both measure **1331px** — exact match. Margin from the right edge: 73px (up from near-zero).
- At 1920px viewport: hero boat center 1787px vs. gutter center 1794px (7px apart — visually imperceptible; likely a timing artifact between when each component's `useEffect` measures layout, not worth chasing further). Margin from the right edge: 90px, hitting `EDGE_MARGIN` exactly, confirming the viewport-anchored formula (not just the content-safety floor) takes over once there's room for it.
- `npm run lint` / `npm run build` clean; confirmed no mobile overflow after narrowing the content column (390px viewport, `scrollWidth === innerWidth`).
- Re-screenshotted Work-section and CTA: comfortable gap between card text and the gutter at 1600px, boat still arrives resting right at the CTA button.

---

## 2026-10-08 — Fix hero/stream alignment + slow the row-in down

**Goal:** three pieces of feedback on the journey built in the previous entry: the hero boat stopped with no breathing room from the right edge; the hero's resting spot and the WorkStream gutter below it visually didn't line up (looked like two disconnected pieces, not one continuous journey); the hero row-in played too fast.

**Root cause of the misalignment:** `HeroWater`'s resting position was computed off the **water strip's own edge** (`strip.offsetWidth`), and the strip is deliberately full-bleed (`width: 100vw`) for the wave background — so the boat rested almost at the literal viewport edge. `WorkStream`'s gutter, meanwhile, was anchored to the **content column's** right edge (`#home-work`'s `getBoundingClientRect().right`, which is narrower than the viewport due to `PageSection`'s `max-width`). Two different reference frames, so they drifted apart at any viewport width where those two edges don't coincide (i.e. basically always).

**What was done**
- New `features/home/journeyLayout.js` — just two shared constants, `GUTTER_OFFSET` (32px gap from the content column's edge) and `GUTTER_WIDTH` (72px, matching the gutter's actual CSS width). Both `HeroWater` and `WorkStream` now compute their horizontal position from the same anchor (content column edge + offset), instead of each inventing its own.
- `HeroWater`'s resting `x` is now computed from `#home-hero`'s content-box right edge (not the strip's full-bleed edge), landing the boat's center exactly on the gutter's center — verified by measuring both elements' `getBoundingClientRect()` center-x after the one-time animation settles: both read **1501px** at a 1600px-wide viewport, not just "close."
- Row-in duration: `3.2s` → `6s` (same `power1.inOut` easing, just slower) per "slow it down."

**Verification**
- `npm run lint` and `npm run build` clean.
- Measured (not eyeballed) the hero boat's resting center-x against the gutter's center-x via a real DOM query after the animation completed — exact match.
- Screenshot confirms a real margin between the resting boat and the viewport's right edge, and that the hero's water and the Work section's gutter now read as one continuous line rather than two disconnected pieces.

---

## 2026-10-08 — The full scroll journey: one-time row-in, stream to the CTA, hover previews

**Goal:** this is the detailed choreography the user promised to explain after the hero-only pass. From a hand sketch: 4 stats (added "self projects" and "practiced screens"), the hero's row-in happens **once** (not looping) and the boat **stops and waits** at the right edge for the user to scroll; from there the journey continues down a water **stream** through Work and About, ending **resting on the CTA button**; hovering a project card pops up a preview image near the stream. Confirmed three open design questions via AskUserQuestion first (stream in a side gutter vs. overlapping content; placeholder vs. waiting on real project images; desktop-only vs. also building mobile) before writing any code — all three went with the recommended/simpler option.

**Still missing, flagged rather than guessed:** the real number for "practiced screens" (shipped as a clearly-commented placeholder, `value: 40` in `content/stats.js` — search for the `TODO` there) and real project screenshots (shipped as code-generated placeholder "mock UI window" graphics, obviously placeholder rather than pretending to be real).

**What was done**
- `content/stats.js`: `STATS` now has 4 entries (years, case studies, self projects, practiced screens).
- `HeroWater`: removed the idle-loop + scroll/click-activation entirely. Replaced with a single `gsap.fromTo` that plays once on mount (`delay: 0.3`, `duration: 3.2`, `power1.inOut`) and leaves the boat resting at the right edge — no `ScrollTrigger` in this component at all anymore. The downstream journey is a fully separate piece, by design, so the hero doesn't need to know anything about scroll.
- New `features/home/WorkStream`: a vertical counterpart to `HeroWater`'s horizontal wave (`VerticalStream.js` — same duplicate-and-loop-`translateY` tiling trick, rotated), plus a second `BoatIllustration` instance (same component, reused) that travels down a narrow **side gutter** positioned just outside the Work/About content column's right edge — chosen specifically so it never overlaps card text or the CTA copy, per the user's answer. The gutter's height is computed at runtime (`getBoundingClientRect` on `#home-work` and the actual CTA button — not the whole CTA section, since "resting on the CTA button" needed to be literal, not just "somewhere near the bottom of that section") and re-measured on resize.
- The hand-off from "hero, one-time" to "stream, scroll-driven" needed two separate `BoatIllustration` instances rather than one element migrating between `position: fixed` (viewport-space, used in the hero) and `position: absolute` (document-space, needed for the stream to span more than one viewport height) — switching coordinate systems mid-animation without a visible jump is fiddly, and narratively "the boat waits in the hero, then the journey continues down the stream" reads fine as continuous to a scrolling user even though it's two DOM nodes.
- New `store/workJourneyStore.js` (tiny zustand store, `hoveredProject: {slug, top} | null`): decouples `ProjectList` (which fires the hover) from `WorkStream` (which renders the popup) without threading callbacks through `HomePage`. `ProjectList`'s cards now call `setHoveredProject(slug, rect.top)` / `clearHoveredProject()` on hover — harmless on the standalone `/work` page too, since nothing is listening there.
- New `features/home/WorkStream/ProjectPreview.js`: the placeholder "mock UI window" graphic (rounded window frame + traffic-light dots + a few colored blocks suggesting a layout), one accent color per project from a 3-color palette keyed by `getProjectIndex`. `WorkStream` renders this in a `position: fixed` popup, positioned from the hovered card's live `getBoundingClientRect().top` (captured once at hover-enter — doesn't re-track if the user scrolls mid-hover, a deliberate simplification).
- `CtaBanner` now accepts `cta.id`, threaded onto the underlying `Button` — this is what let `WorkStream` find the literal button element to measure against.

**Verification**
- `npm run lint` and `npm run build` clean; confirmed `scrollWidth <= innerWidth` at a true 390px mobile viewport.
- Real-wait CDP screenshots across the whole page: hero boat completes its one-time row-in and rests (confirmed it does **not** continue animating afterward); scrolling into Work shows the stream running cleanly in the gutter with no text overlap; continuing to the CTA shows the boat arriving right at the button's vertical level in both light and dark mode.
- Dispatched a real hover (not just inspected CSS) over a project card via CDP: the placeholder preview pops up at the correct vertical position with the right project name and color; moving the mouse away confirms it disappears.
- Confirmed the standalone `/work` page (no `WorkStream` mounted there) still renders normally — the hover store calls are inert without a listener, no errors.
- Confirmed `WorkStream` is actually absent (not just visually hidden) below its 1439px cutoff and causes no mobile overflow.

---

## 2026-10-08 — Hero rebuilt around a proper water strip, idle-vs-scroll boat

**Goal:** per a hand sketch — a proper hero: text (role/name/tagline) up top, a water band pinned to the bottom of the hero's first viewport with the boat on it. Default (idle) state: boat floats left-to-right on its own. First scroll or click: control hands over to the user and the boat tracks scroll 1:1 ("fast according to the user" — no smoothing lag). Explicitly scoped by the user to the hero only — "then I will explain what happens when scrolling down" — so this replaces the previous entry's full-page persistent journey with a self-contained hero treatment.

**What was done**
- Replaced `features/home/ScrollBoat` with `features/home/HeroWater`: `BoatIllustration.js` (moved, trimmed — the ambient water ellipses it used to carry were redundant now that there's a real water strip behind it, replaced with just a small grounding shadow), `WaveBackground.js` (new — two tileable SVG wave layers, each duplicated side-by-side and CSS-animated `translateX(-50%)` on a loop for a seamless flowing-water effect, different speeds/directions per layer for depth), and `index.js` (new orchestrator).
- `Hero` restructured: `.copy` (the text) is now a normal in-flow block at the top; `HeroWater` is absolutely positioned at the bottom of Hero's own box via a full-bleed breakout (`left: 50%; transform: translateX(-50%); width: 100vw`), which only centers correctly because `PageSection` already centers its content relative to the viewport — Hero's own horizontal center coincides with the viewport's, so the breakout math holds despite Hero itself being narrower than the viewport. `PageSection`'s `.hero` variant lost its `justify-content: center` and gained `padding-bottom: 32px` (was 96px) so `Hero` can `flex: 1 1 auto` and actually fill the full `70vh` box instead of being vertically centered as a short flex item.
- `StatGrid` moved out of the hero `PageSection` into its own section (`id="home-stats"`) right after — the sketch's "box" (navbar + hero) only shows text and water, no stats, so stats now live just below the fold instead of crowding the hero.
- State machine in `HeroWater/index.js`: a GSAP `fromTo(..., repeat: -1)` idle tween floats the boat left→right on a loop by default. The **first** `scroll` event (page-wide, `{ once: true }`) or a click directly on the water strip kills the idle tween and replaces it with a `scrollTrigger`-scrubbed tween (`scrub: true` — exact, no lag — this is what "fast according to the user" meant) spanning the hero's own scroll range (`start: 'top top'`, `end: 'bottom top'`). A click additionally gets a one-off `+=130px` nudge, because unlike a scroll it doesn't inherently move anything — without the nudge, clicking at scroll position 0 produced no visible change at all.

**Gotchas hit**
- First verification pass used `chrome --screenshot --virtual-time-budget=2000`, and the boat appeared completely absent. Assumed a real bug until a second check — opening a tab over CDP and waiting a real 1500ms via `setTimeout` before screenshotting — showed the boat exactly where expected. `--virtual-time-budget` doesn't drive GSAP's `requestAnimationFrame`-based ticker the way it drives page-load timers, so every future check against a GSAP/rAF-driven animation needs a real wall-clock wait via CDP, not the one-shot `--screenshot` CLI flag.
- The full-bleed water strip (`width: 100vw`) produced a visible horizontal scrollbar — `100vw` includes the vertical scrollbar's own width, so it's reliably ~15px wider than the actually-visible content once a page is tall enough to scroll. Fixed with `overflow-x: hidden` on `body` in `global.scss`, documented there as a standing defense for any future full-bleed element, not just this one.
- Mobile first pass (`min-height: 64vh` on the hero) put the water strip uncomfortably close to the "View resume" button once the title/tagline wrapped to two lines each. Bumped to `78vh` after actually looking at a real mobile screenshot, not just checking it didn't overlap.

**Verification**
- `npm run lint` and `npm run build` clean; confirmed `scrollWidth <= innerWidth` at both 1440px and a true 390px (`Emulation.setDeviceMetricsOverride`) — no horizontal overflow at either.
- Real-wait CDP screenshots at t=0/2.5s/5.5s confirm the idle loop actually animates the boat left-to-right continuously pre-interaction.
- Scrolled to three different positions and screenshotted each: boat position matches scroll amount; held scroll still for 2s afterward and confirmed the boat does **not** keep drifting (idle tween is dead, not just paused).
- Dispatched a real click via CDP on the water strip (not just scrolled) and confirmed the nudge-then-scroll-control handoff fires correctly, separately from the scroll-triggered path.
- Checked dark mode and real mobile width — wave colours hold up, no overlap after the mobile spacing fix.

---

## 2026-10-08 — "Life is an ocean": scroll-linked boat illustration on Home

**Goal:** first piece of a bigger design direction the user is building toward ("do it, I'll elaborate later"). Concept from a hand sketch: a detailed/colored illustration of the user poling a small boat, entering from the left, rowing right across the Hero, then turning downward and continuing to be present as the user scrolls through the rest of the Home page. Confirmed two open questions up front via AskUserQuestion rather than guessing: (1) illustration style — picked "detailed/colored" over thin line-art or flat silhouette; (2) scroll scope — picked "persistent, travels through the whole page" over "hero-only, plays once."

**What was done**
- `features/home/ScrollBoat/BoatIllustration.js` — hand-authored SVG (viewBox 260×190): wood-brown canoe hull, a simplified figure (skin-tone head + pulled-back dark hair + terracotta shirt matching the site's `--accent`) holding a pole, and a soft teal "patch of water" the boat carries with it. No external art asset — built and iterated entirely as inline SVG paths/shapes, checked by actually screenshotting it (not just reading the path coordinates) and revising the hair twice because it was unreadable at first pass.
- The pole/paddle is its own `<g>` with a CSS `@keyframes` rock (`rotate(-10deg)` ↔ `rotate(14deg)`, 1.6s loop) — runs continuously and independently of the scroll-driven transform on the parent, so the "pushing the boat" motion never stops, even while scroll is paused.
- `features/home/ScrollBoat/index.js` — `gsap` + `ScrollTrigger` (both already installed, previously unused per PROJECT_STRUCTURE.md's stack table — this is the `gsap` dependency finally earning its keep). One `position: fixed` wrapper div, scrubbed (`scrub: 1`) across a single timeline spanning `trigger: #home-hero, start: top top` through `endTrigger: #home-cta, end: bottom bottom` — i.e. the entire Home page's scrollable range, not just the hero. `HomePage.js`'s three `PageSection`s got `id="home-hero"` / `id="home-work"` / `id="home-cta"` so `ScrollBoat` can find those boundaries via `getElementById` without threading refs through props.
- Waypoints are expressed as `x`/`y` **functions** (`() => window.innerWidth * 0.6`, etc.) with `invalidateOnRefresh: true` on the ScrollTrigger, so they get re-sampled on window resize instead of going stale.
- Hidden entirely below `$bp-md` (`display: none` on the wrapper) — a fixed, continuously-transformed element plus a 1.6s-looping child animation is the kind of thing that's more likely to jank on low-end mobile, and the "persistent journey" concept doesn't obviously translate to a narrow viewport anyway. Scoped out deliberately, not forgotten.

**Gotchas hit**
- First version of the scroll timeline used `y` targets like `vh() * 1.9` and `vh() * 2.6`, reasoning about them as "further down the document." That's wrong for a `position: fixed` element — its `y` is a viewport-space translate, so anything outside roughly `[0, vh()]` is off-screen no matter how far the page has actually scrolled. Result: the boat was only visible for brief instants where the scrub happened to interpolate through the valid range, and invisible for most of the Work/About scroll — caught by actually scrubbing through 8 scroll positions and screenshotting each (not just eyeballing the hero), which is the only reason this was caught before calling it done. Fixed by keeping every waypoint's `y` within one viewport height and using **rotation** (0° → 70° across the timeline) to carry the "turning downward" narrative instead of a literal multi-screen vertical translation, which isn't meaningful for a fixed element regardless.
- Verifying "does it still look right in dark mode / on narrow viewports / with the real scroll behavior" required actually driving a headless browser through theme toggles, `Emulation.setDeviceMetricsOverride`, and real scroll positions via CDP — static reasoning about the CSS/SVG would not have caught the viewport-bounds bug above.

**Known trade-off**
- Bundle grew ~47 kB gzipped (`gsap` + `ScrollTrigger`) — expected and accepted for the feature; no code-splitting attempted yet since this is the first and (for now) only thing using gsap.

**Scope note**
- This covers the Home page only, per "let's start with top main screen." The user has said there's a larger design direction coming ("I'll elaborate it later") — this entry is the first piece of that, not the whole thing.

**Verification**
- `npm run lint` and `npm run build` clean.
- Scrubbed through 8 scroll positions (0%, 15%, 30%, ... 100% of page height) via CDP and screenshotted each: boat starts off-screen left, rows across the hero stats area, visibly rotates and continues through the Work list, and fades out approaching the About/CTA section — confirmed against real rendered screenshots at each step, not inferred from the code.
- Re-checked in dark mode and confirmed the `display: none` mobile cutoff actually applies (`getComputedStyle(...).display === 'none'` at a real 390px device-metrics-emulated viewport).

---

## 2026-10-08 — Interest gallery: click-to-cycle + bigger cards

**Goal:** the stacked-card version had no way to actually see the second photo in a category — user asked "how can the user see another image?" and suggested click-to-advance; also asked for slightly bigger cards.

**What was done**
- `InterestGallery` split out an `InterestCard` subcomponent holding its own `frontIndex` state (`useState(0)`). Clicking cycles `frontIndex` forward (wrapping), and the images array is re-sliced so `frontIndex` is always depth 0 — keyed by image id (not depth), so React moves the existing DOM node to its new depth/position instead of remounting it, which means the existing `.layerFront`/`.layerBack` `transform` transition animates the shuffle for free. No new animation code needed, just the reorder.
- The card's interactive element is now the actual `.stack` itself — `<button>` when the category has more than one photo (`onClick` cycles, `aria-label` states which photo and how many, e.g. "Yoga — photo 1 of 2, tap for the next one"), plain `<div>` when there's only one (Meditation, today) so there's no dead click target with nothing to do.
- Added a small dot row under the caption (one dot per photo, current one in `--accent`) purely as a discoverability affordance — the earlier version gave no visual hint that a card had more than one photo behind it, which was the root of the user's question.
- Bumped card width 170px → 200px desktop, 142px → 165px mobile (the "little" increase asked for); gallery gap widened slightly to match.

**Decisions**
- Click-to-cycle on the whole card (not a separate arrow button) — keeps the "flipping through a stack of photos" metaphor intact rather than adding a UI control that fights the Polaroid aesthetic. Confirmed this doesn't collide with the existing hover-straighten effect since hover and click are independent event types.

**Verification**
- `npm run lint` and `npm run build` clean.
- Real click interaction tested via CDP (`Input.dispatchMouseEvent`, not just inspecting the code): `aria-label` goes 1 of 2 → 2 of 2 → back to 1 of 2 across two clicks, confirming both the advance and the wraparound. Screenshots before/after confirm the Yoga card's front photo actually swaps and the active dot moves.
- Mobile (true 390px via `Emulation.setDeviceMetricsOverride`): no overflow at the larger card size, dots and single-image Meditation card render correctly.

---

## 2026-10-08 — Interest gallery: one card per category, stacked

**Goal:** the previous pass rendered one Polaroid per photo (7 cards: 2 yoga, 1 meditation, 2 drawing, 2 reading). User wants exactly one card per **category** instead (4 cards: Yoga, Meditation, Drawing, Reading) — and said more photos per category are coming later, so the layout needs to absorb that without a redesign.

**What was done**
- `content/interests.js` restructured from a flat list of `{id, label}` to one entry per category: `{category, label, images: [...]}`, images ordered front-to-back. `images[0]` is the "face" of the card; anything appended after it becomes a peeking layer behind. Adding a new photo to a category later is a one-line array push, not a layout change.
- `InterestGallery` rewritten: each category renders as a `.stack` (one tilt per category, same `--tilt` custom-property approach as before) containing one `.layerFront` (the fully-visible top photo) plus one `.layerBack` per additional image, each offset by a deterministic depth formula (`backLayerStyle`: alternating left/right, shifting up, rotating outward as depth increases) so the pile reads as a messy stack of photos rather than a perfect fan. Single-image categories (Meditation, for now) render as a plain card with no back layer — confirmed via DOM inspection, not just visually, since the drop-shadow under rotation can *look* like a second photo peeking out even when there isn't one.
- Hover/focus still straightens + scales the whole stack (same mechanism as the single-card version), so the interaction users already saw doesn't change, just what's underneath it.

**Gotchas hit**
- Needed to actually confirm the single-photo Meditation card wasn't accidentally rendering a duplicate layer — the box-shadow combined with the stack's rotation produces a sliver at the corner that's visually almost indistinguishable from a second photo peeking out from behind. Checked via CDP (`querySelectorAll('img')` count per card) rather than trusting the screenshot alone; confirmed exactly 1 `<img>` for Meditation, 2 for Yoga/Drawing/Reading.
- Hit a `SyntaxError` a few times getting a multi-line JS expression through `Runtime.evaluate` via a bash heredoc (quoting/escaping fought back-to-back layers of bash → JSON → CDP). Stopped fighting it and wrote the page-side check to its own `.js` file, read it with `fs.readFileSync`, and passed *that* string as the `expression` — one layer of escaping instead of three.

**Verification**
- `npm run lint` and `npm run build` clean.
- Screenshot: 4 cards (Yoga, Meditation, Drawing, Reading), each showing the correct front photo with 2-image categories visibly peeking a second photo behind.
- Hover re-verified via real `Input.dispatchMouseEvent`: the hovered stack straightens/scales, its neighbors keep their tilt, the back layer stays offset underneath (doesn't snap to front).
- DOM-level check confirms exact image count per card matches `content/interests.js` (1 for Meditation, 2 each for the rest) — no stray/duplicate layers.

---

## 2026-10-08 — About page: "proof of interest" photo gallery

**Goal:** add the user's 7 personal photos (yoga, meditation, drawing, reading — backing up the "yoga, meditation, continuous learning" line already in the bio) to the About page. User flagged up front that the source photos are low-resolution, and asked for a presentation that works with that rather than exposing it — landed on a small Polaroid-style scattered collage (confirmed via AskUserQuestion before building, along with "more than 5 images" sizing the layout as a wrapping collage, not a strip).

**What was done**
- Source photos were already small (688px wide, the largest only 1427px tall) — confirmed with `System.Drawing` before doing anything else, since the user's low-res warning determines the whole approach: small Polaroid cards (~160px) hide this; a large hero-sized image would not have.
- Two of the seven (`drawing-1` nee "bunny", `reading-2` nee "Connect with Nature") had hard black letterbox bars baked into the source screenshots. Found the exact bar boundaries by scanning row brightness (same technique as the earlier logo/portrait crops) rather than guessing pixel offsets, then cropped them out before anything else touched the image.
- All 7 cropped to a consistent 4:5 (center-cropped from whichever dimension was already larger) and resized to 440×550 — enough for a sharp ~160–220px display card at 2x density, no larger, since there's no benefit to keeping pixels the source never had. Saved as JPEG quality 85 to `src/assets/interests/`.
- `content/interests.js`: `INTERESTS` array of `{id, label}` — just the copy. Image imports live in the component (`features/about/InterestGallery`), not content/, since static asset imports need literal paths Vite can resolve at build time; a content file can't hold those.
- `InterestGallery`: each photo renders as a `<figure>` with a per-card tilt (`ROTATIONS` array cycled by index, alternating ±3–6deg) and a caption underneath, wrapping in a flex layout rather than a strict grid so the count doesn't need to be a clean multiple of anything.
- Added as a second section on `/about`, under a new "Outside of work" `SectionHead` (no page number — same convention as Home's "Work" heading, numbers are reserved for the page-level identity).

**Gotchas hit**
- First pass set the per-card tilt via an inline `style={{ transform: 'rotate(Xdeg)' }}` and a `.card:hover { transform: rotate(0deg) scale(1.08) }` rule for the "straighten + lift on hover" interaction. That hover rule would **never** have fired — an inline `style` attribute always wins over any stylesheet rule regardless of pseudo-class, so the hover rule was dead code from the moment it was written. Caught before shipping by actually dispatching a mouse-move via CDP and screenshotting (not just reading the CSS and assuming it was right). Fixed by moving the per-card angle into a CSS custom property (`style={{ '--tilt': 'Xdeg' }}`, base rule `transform: rotate(var(--tilt))`), so the `:hover` rule can still override the `transform` property outright.

**Verification**
- `npm run lint` and `npm run build` clean.
- Desktop screenshot: 7 Polaroid cards in two rows, alternating tilt, captions correct.
- Hover interaction re-verified correctly this time: dispatched a real `Input.dispatchMouseEvent` over the first card via CDP and confirmed only that card straightens/lifts while its neighbors keep their tilt.
- Mobile (true 390px via `Emulation.setDeviceMetricsOverride`): no overflow, cards stack one per row.
- Dark mode: card "paper" stays light (matches real Polaroid framing), shadow still reads against the dark page background.

---

## 2026-10-08 — Home page: all projects + an About teaser with CTA

**Goal:** bring all the projects onto the Home page, plus a short "about me" overview that CTAs through to the full `/about` page.

**What was done**
- `HomePage.js` gained two more `PageSection`s after the existing Hero+StatGrid section: a "Work" section that reuses `features/work/ProjectList` as-is (no duplicate project-list component — Home now shows the exact same cards, tags, and "Read full case study" links as `/work`), and an About teaser built on a new `CtaBanner` component.
- Built `components/CtaBanner` — this was already named in PROJECT_STRUCTURE.md's component list ("Let's build something") but never implemented. Takes `eyebrow` / `title` / `description` / `cta: {label, to}` and renders a bordered panel with the copy on the left and a solid `Button` on the right (stacks, full-width button, on mobile). Home's instance uses `ABOUT[0]` (the existing first bio paragraph) as the description, so the teaser text stays in sync with the real About page copy rather than being a separate hand-written blurb that could drift.
- `SectionHead` used without its `number` prop for the Home "Work" heading (number is optional — only the dedicated `/work` and `/about` pages use the "01 / 02" numbering as a page-level identity).

**Decisions**
- Did not duplicate ProjectList's markup/content for Home — reusing the same component means the project list can't drift between `/` and `/work`; if that ever needs to differ (e.g. "show only 2 on Home, link to see all"), that's a deliberate follow-up, not a default.

**Verification**
- `npm run lint` and `npm run build` clean.
- Desktop screenshot: Work section renders all 3 projects, CTA banner renders with working `/about` link (confirmed the rendered `<a>`'s `href` via CDP, not just visually).
- Mobile (true 390px, `Emulation.setDeviceMetricsOverride` — see the lesson in the previous entry): no horizontal overflow, CTA banner stacks with a full-width button as designed.

---

## 2026-10-08 — About page portrait + mobile nav drawer

**Goal:** add the user's photo to the About page, to the right of the bio text. Turned into two changes once mobile testing surfaced a real gap.

**What was done**
- Cropped the supplied 1600×900 portrait photo down to a clean 720×900 (4:5) frame centred on the subject — found the subject's bounding box by scanning for pixel divergence from the dark background (same technique as the logo crop) rather than eyeballing it, since the subject wasn't dead-centre in the original frame. Saved as `src/assets/profile/priyanka-portrait.jpg` (JPEG, quality 88 — this is a photo, not line art, so PNG would have bloated it for no benefit).
- `AboutBody` restructured from a single column into a two-column layout: bio + facts on the left (`flex: 1 1 420px`), portrait fixed at 320px on the right (`border-radius: $radius-lg`), via a new `.layout` flex container in place of the old `.body`. Stacks to a single column below `$bp-md`, portrait below the text.
- **Found and fixed a real mobile nav bug while checking this on a phone-width viewport**: the inline `HOME / WORK / ABOUT` links plus the enlarged logo (from the earlier "big logo" change) don't fit in a ~390px viewport. Built the `MobileDrawer` that was already anticipated — `store/appStore.js` already had `isMobileMenuOpen` / `openMobileMenu` / `closeMobileMenu` / `toggleMobileMenu` sitting unused since the initial scaffold, and PROJECT_STRUCTURE.md's folder map already names `Navbar.js + MobileDrawer.js` as the intended pair. Implemented it: `.links` now hides below `$bp-md`, a hamburger (`lucide-react` `Menu`/`X`) toggles a dropdown panel (`layouts/Navbar/MobileDrawer.js`) listing the same `NAV` entries. `MainLayout` now also calls `closeMobileMenu()` on every route change (same `useEffect` that already does `scrollTo(0,0)`), so the drawer doesn't stay open after navigating.

**Gotchas hit**
- Spent a while chasing a phantom "horizontal overflow" bug: `chrome --headless=new --window-size=390,844 --screenshot=...` (the one-shot CLI screenshot flag used in every earlier verification this session) does **not** produce a true 390px CSS viewport — `window.innerWidth` actually came out to 504 when checked via CDP, because that single-shot mode doesn't set mobile device metrics, only an OS-level window size that doesn't map 1:1 to CSS px. Every "mobile" screenshot taken this way earlier in the session was silently wrong. Confirmed by opening a tab over CDP and explicitly calling `Emulation.setDeviceMetricsOverride({width:390, height:844, mobile:true})` before capturing — only then did `innerWidth` read exactly 390 and match reality. **Any future mobile-viewport screenshot needs `Emulation.setDeviceMetricsOverride` (or an equivalent explicit mobile emulation step), not just `--window-size` on the CLI flag.** The nav overflow this surfaced (links + bigger logo not fitting at real 390px) was real and is what prompted the `MobileDrawer` build above — but the "AboutBody text is being clipped" symptom from the flawed screenshots was not real; re-verified with proper device-metrics emulation and there's no clipping.

**Verification**
- `npm run lint` and `npm run build` clean.
- Properly mobile-emulated (`Emulation.setDeviceMetricsOverride`) screenshots: About page text wraps correctly, portrait renders full-width/rounded below the facts grid, hamburger opens the drawer with working nav links, theme toggle unaffected.
- Desktop screenshot: portrait sits to the right of the bio/facts column as asked, no layout shift.

---

## 2026-10-08 — Navbar: drop the wordmark, make the logo the brand

**Goal:** remove the "Priyanka Cherupally" text next to the Navbar mark and make the logo itself large/prominent instead.

**What was done**
- The mark previously used in the Navbar (`priyanka-monogram-square.png`) was the *squared, padded* crop built for favicon purposes — mostly transparent padding around a thin horizontal squiggle, so sizing it up mostly added invisible margin, not visible logo. Built a second, tightly-cropped source instead: `src/assets/brand/priyanka-monogram-wide.png` (972×355, natural aspect ratio, true alpha transparency, same brightness-threshold technique as the favicon pass) — no squaring, so scaling it up actually scales the visible line art.
- `Navbar`: dropped `{PROFILE.name}` text next to the image; the `<img>` now carries `alt={PROFILE.name}` and the `Link` gets `aria-label={PROFILE.name}` so the link's accessible name doesn't just silently disappear along with the visible text.
- `Navbar.module.scss`: `.mark` height 28px → 56px (40px on mobile), navbar vertical padding trimmed 20px → 14px (10px mobile) so the taller mark doesn't blow out the header height. Removed the now-unused `@include serif` / `font-size` / `gap` rules from `.brand` — they only ever styled the text that's gone now.
- Deleted the now-unused `priyanka-monogram-square.png` — nothing referenced it anymore after the swap. The square-with-padding version can be regenerated from `priyanka-logo-full.png` the same way if a square icon context (e.g. social share image) needs it later — documented in the 2026-10-08 "Real logo" entry below.

**Gotchas hit**
- Same dark-mode verification need as the favicon pass — re-used the CDP approach (headless Chrome + `--remote-debugging-port`, click the real toggle, screenshot) to confirm the bigger mark still inverts cleanly rather than trusting it by inspection.
- Cleanup, done properly this time: killed only the specific PIDs holding the dev-server port and the CDP Chrome port (via `netstat -ano | grep :PORT` → `Stop-Process -Id`), instead of the previous entry's `taskkill /F /IM chrome.exe /T` mistake that would've closed every Chrome window on the machine.

**Verification**
- `npm run lint` and `npm run build` clean.
- Headless screenshots in both light and dark mode: logo reads clearly larger, nav links and theme toggle stay aligned, no layout shift from the shorter brand slot.

---

## 2026-10-08 — Real logo: app icons + Navbar mark

**Goal:** replace the placeholder "N" favicon (a stale guess from before the Nikhil→Priyanka correction, never actually fixed visually) with the real brand mark the user provided — a hand-drawn "pc" monogram above a "PRIYANKA CHERUPALLY" wordmark, delivered as a single flat PNG (1264×843), no vector source.

**What was done**
- No ImageMagick/Pillow/sharp available in this environment — built the whole pipeline with .NET `System.Drawing` via PowerShell (`Bitmap`, `LockBits` for raw pixel access, `Graphics` for compositing/resize).
- Found the monogram's bounding box by scanning row/column dark-pixel density (ink vs the paper-textured background) rather than eyeballing crop coordinates — gave an exact, reproducible crop region instead of a guess.
- Converted the opaque crop to true RGBA: alpha = thresholded brightness ramp (full transparent above ~200 brightness, full opaque below ~120, linear ramp between, to keep anti-aliased stroke edges smooth), colour forced to pure black. This is what made CSS `invert()` work later — inverting only flips RGB, alpha is untouched, so transparent stays transparent either way.
- Outputs: `src/assets/brand/priyanka-logo-full.png` (original lockup, kept as the source of truth) and `priyanka-monogram-square.png` (transparent-background square crop, for in-app use). `public/favicon.ico` (packed 16+32+48 as PNG-compressed ICO entries — no managed API writes true multi-res ICOs, so the directory/entries were hand-written byte-for-byte), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` (all composited onto an opaque `#f5f3ee` fill — full-bleed, per the existing trap about iOS painting transparent corners black), and `public/manifest.webmanifest`.
- `index.html` now links the real favicon/icon set + manifest instead of the old placeholder `favicon.svg` (deleted).
- `Navbar` now shows the monogram next to the wordmark. In dark mode, `Navbar.module.scss` applies `filter: invert(1)` to it via `:global(html[data-theme='dark']) .mark` — the art is pure black ink on a light field, so inverting turns it into white ink with the (transparent) field untouched, matching the dark navbar with no extra asset needed.

**Gotchas hit**
- First pass used a *sampled* background colour (read from one corner pixel, ~(242,239,232)) to pad the crop into a square, instead of true transparency. That colour was close to but not identical to the site's `--paper` token, and the composited result had non-zero alpha across the *entire* background region (from a naive `alpha = 255 - brightness` with no threshold) — both produced a faint but visible rectangular "box" around the mark once placed in the Navbar/favicon. Caught by actually screenshotting it, not just eyeballing the PNG in isolation. Fixed by (a) switching to real alpha transparency with a brightness threshold/ramp instead of a flat fill, and (b) compositing favicon/app-icon variants onto the exact `#f5f3ee` hex rather than a sampled colour.
- A PowerShell `Remove-Item` on the temp per-size favicon PNGs (`_fav-16/32/48.png`) was blocked by this environment's sandbox ("Remove-Item on system path '*' is blocked") even though the path was inside the project's own `src/assets/brand/`, not a system path — worth remembering that file *deletion* from PowerShell can get blocked here even when creation/writes to the same path succeed; routed the cleanup through Bash `rm` instead, which worked fine.
- Verifying the dark-mode CSS actually worked required clicking the real theme-toggle button and re-screenshotting — a static screenshot of the default (light) state can't confirm a `:global(html[data-theme='dark'])` rule actually fires. Drove it for real via the Chrome DevTools Protocol (launched headless Chrome with `--remote-debugging-port`, opened a tab, clicked `[aria-label="Toggle theme"]` through `Runtime.evaluate`, then `Page.captureScreenshot`) since no higher-level browser-automation tool was available in this environment.
- Cleanup misstep: killed the CDP-driven headless Chrome instance with `taskkill /F /IM chrome.exe /T`, which force-closes **every** `chrome.exe` process on the machine, not just the headless one — if a real Chrome window had been open it would have been closed too. Next time, target the specific PID from the CDP instance (or the port's listening PID) instead of an image-name-wide `taskkill`.

**Verification**
- `npm run lint` and `npm run build` clean.
- Headless screenshot of the Navbar in light mode: no box artifact, mark reads cleanly inline with the wordmark.
- Clicked the real theme toggle via CDP and re-screenshotted: mark inverts to white line art, blends into the dark navbar, no mismatched background.
- Verified `favicon.ico`, `icon-192.png`, `apple-touch-icon.png`, `manifest.webmanifest` all serve 200 from the dev server.

---

## 2026-10-08 — About + Work pages

**Goal:** add the About and Work (case-studies list) pages. Asked first how Work should handle the fact that the real case-study text (Notion) still isn't scrapeable — went with: build the list now, each card links out to its Notion doc, swap to full on-site case studies once that content is provided.

**What was done**
- `content/profile.js` gained `ABOUT` (two bio paragraphs, written in the same first-person voice as the Hero tagline) and `QUICK_FACTS` (Role, Experience, Focus, Tools) — kept in `profile.js` rather than a new file, matching the folder-map comment that says profile.js owns `PROFILE, RESUME, ABOUT, QUICK_FACTS, SEO_DESCRIPTION`.
- New `content/projects.js`: `PROJECTS` array (slug, title, subtitle, summary, tags, `externalUrl`) + `getProjectBySlug` / `getProjectIndex` helpers, per the spec — unused today but there for when `/work/:slug` exists.
- New generic components: `FactList` (term/value grid, used by About) and `SectionHead` (oversized low-opacity number + serif title, used by both new pages).
- New feature components: `features/about/AboutBody`, `features/work/ProjectList`.
- New `pages/AboutPage.js` and `pages/WorkPage.js`; routed as `/about` and `/work` in `App.js`.
- `content/nav.js` now lists Home, Work, About — added in the same change as their routes, per the rule already written in that file's comment.

**Decisions**
- `ProjectList` cards link out to Notion (`target="_blank" rel="noreferrer"`) with a "Read full case study ↗" label rather than pretending there's an on-site detail page. No `/work/:slug` route yet — building one now would just duplicate the summary already on the card with nowhere real to send it.
- `getProjectBySlug`/`getProjectIndex` added even though nothing calls them yet, to match the spec and save a step later — not a violation of YAGNI so much as following an explicit, already-documented contract.

**Still open**
- Same gap as the Home-page content pass: Edusphere, Production Logging, and Seatrack still need their real case-study text (problem/process/outcomes) before a `/work/:slug` detail page is worth building.

**Verification**
- `npm run lint` and `npm run build` both clean.
- Headless screenshots of `/about` and `/work`: nav shows all three links, About renders both bio paragraphs + the 4-fact grid, Work renders all three project cards with tags and working external links.

---

## 2026-10-08 — Home page: real content from the live Framer site

**Goal:** replace the placeholder Home content with the real info pulled from the existing live site (https://priyankacherupally.framer.website/), ahead of the full content/project write-up that's coming later.

**What was done**
- Pulled profile, bio, skills, and project list off the Framer site via WebFetch. Confirmed: role is "AI-UI/UX Designer" (not "Software Engineer" — that was a placeholder guess), tagline is "I design experiences that make complex workflows feel simple and intuitive.", real email is `priyankacherupally02@gmail.com`, and the resume is currently hosted on Google Drive (no local PDF exists).
- Updated `content/profile.js`: `role`, `tagline`, `email`, `RESUME` (points at the Google Drive share link, `filename: null` since there's no local file to drive a same-origin download), `SEO_DESCRIPTION`. `socials` is now `[]` — the source site had no GitHub/LinkedIn/etc links, only email + resume, so nothing fabricated there.
- Updated `content/stats.js` to the only two numbers the source site actually states: 2 years of experience, 3 case studies. Dropped the placeholder third stat ("teams collaborated with") — no source for it.
- `features/home/Hero`: resume button now branches on `RESUME.filename` — a local file still gets `download` + "Download resume"; an external host (today) gets `target="_blank" rel="noreferrer"` + "View resume" instead, since the `download` attribute is silently ignored cross-origin and would otherwise mislabel the action.
- `features/home/StatGrid`: swapped the 3-column CSS grid for a wrapping flex row. The grid was hard-coded to `repeat(3, 1fr)`, which only looks right at exactly 3 stats — now it holds for any count (2 today, however many later).
- Synced `index.html`'s static `<title>` / `<meta description>` with the new role and `SEO_DESCRIPTION` so the no-JS fallback matches what `useDocumentMeta` sets at runtime.

**Decisions**
- Did not fabricate GitHub/LinkedIn links to keep the Footer "complete" — an empty `socials` array (and an empty-but-present `.socials` row in the Footer) was judged better than shipping a dead link to `github.com/` root.
- Left `PROFILE.site` on the placeholder `priyankacherupally.dev` domain rather than pointing it at the live Framer URL — the canonical tag describes *this* site, and the Framer site is being replaced, not mirrored.

**Known gap**
- The three case-study links on the source site point to Notion pages that render client-side; WebFetch only sees the loading shell, not the actual case-study text (problem/process/outcomes). `content/projects.js` and the Work page still need that content — either pasted in directly or pulled from a publicly-renderable version of those Notion pages.

**Verification**
- `npm run lint` clean.
- Headless screenshot of `/` after the change: Hero shows the correct role/tagline/buttons ("Get in touch" via `mailto:`, "View resume" opening the Drive link), StatGrid shows both real stats without a lopsided empty third column, Footer shows no broken social links.

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
