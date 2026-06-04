# CLAUDE.md — 小皮咖博客

## Commands
- `npm run docs:dev` — dev server (localhost:8080)
- `npm run docs:build` — pre-build search index + VuePress build
- `npm run deploy` **broken** (publish.js removed); deploy via GitHub Actions on push to `master`

## Architecture
- **VuePress 1.x** + **@vuepress/theme-blog 2.3.3** (local copy at `theme-blog/`, not npm). Loaded in `docs/.vuepress/config.js` via `theme: require.resolve('../../theme-blog')`.
- **Posts**: `docs/_posts/YYYY-MM-DD-title.md`. Required frontmatter: `title`, `date`, `tags`. Optional: `author`, `location`, `summary`.
- **Summary priority**: `frontmatter.summary` > auto-generated `page.summary` (200 chars from strippedContent in `theme-blog/index.js:138-156`).
- **Element UI**: Static import in `enhanceApp.js` (`import ElementUI` + `Vue.use`). Do NOT use dynamic `import()`.
- **Custom components**: `comment.vue` (Giscus), `tongji.vue` (stats), `element-ui.js` (UMD bundle, single line — do not format).
- **lunar.js** (`docs/.vuepress/utils/`): 1237 lines. ES module with `export function getCalendarData`. Internal `calendar()` uses `target` object, NOT `this` (ES module strict mode makes `this` undefined).
- **Search index**: Generated pre-build by `scripts/generate-search-index.js` → `docs/.vuepress/public/search.json`. Not VuePress native search.
- **Styles**: `docs/.vuepress/styles/index.styl` (Stylus), font LXGW WenKai Screen R.

## Post Image Viewer
- **Implementation**: `docs/.vuepress/utils/imageViewer.js` (singleton viewer, plain DOM) + global directive `v-image-preview` registered in `docs/.vuepress/enhanceApp.js`.
- **Mount point**: root element of `theme-blog/layouts/GlobalLayout.vue` (`v-image-preview`). Delegates click events to all `<img>` inside container `.bp-post-content`.
- **Trigger**: click any in-article image (not wrapped in `<a>`). Viewer auto-collects all images in the same container as a gallery.
- **Interactions**:
  - `←` / `→` navigate prev / next (loops)
  - `ESC` close
  - Click mask / top-right × to close
  - Mouse wheel zoom (0.2× ~ 6×)
  - Drag to pan when zoomed
  - Double-click toggles 1× / 2×
- **Styling**: `.bp-image-viewer*` classes live at the end of `docs/.vuepress/styles/index.styl`. Body scroll locked via `body.bp-viewer-open` class.
- **History**: previously relied on `@vuepress/medium-zoom`, but its default selector (`.theme-default-content :not(a) > img`) did not match this theme's `.bp-post-content` container, so clicks had no effect; medium-zoom also lacks gallery mode. Plugin removed from `theme-blog/index.js`.

## CI
- `.github/workflows/deploy.yml`: push to `master`, Node 14, deploy to `gh-pages`. Uses `BLOB_DEPLOY_PRI` secret.

## Gotchas
- `[]` lines in build log are **harmless** (debug output from lunar.js).
- `element-ui.js` is a UMD-bundled single-line file — do not format or edit. Replace by re-bundling.
- No lint / typecheck / test commands available.
- 34 posts in `docs/_posts/`, all with handwritten `frontmatter.summary`.
- Nav links: home `/`, post list `/page/1/`, tags `/tag/`, timeline `/archives`.
- After modifying `theme-blog/`, `docs/.vuepress/config.js`, or any theme-related files, run `npm run docs:build` to verify.

## Post Format Spec

### Filename
- `docs/_posts/YYYY-M-D-slug.md` (month/day may be unpadded, but dict order must equal chronological order)
- Multiple posts on the same day: disambiguate with `YYYY-M-D-slug_N` (rare)

### Frontmatter

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `title` | ✅ | string | Article title |
| `date` | ✅ | `YYYY-M-D` or `YYYY-MM-DD` | Both formats accepted |
| `tags` | ✅ | string \| array | Inline `[A, B]` or block `- A\n- B` both work |
| `summary` | ✅ | string | **Handwritten** short blurb (1st-person, ~50–150 chars); overrides auto-summary |
| `author` | ❌ | string | Old posts use `小皮咖` uniformly; new posts may omit |
| `location` | ❌ | string | City name (广州 / 佛山 etc.) |
| `description` | ❌ | string | Legacy field, overridden by `summary`, safe to keep |
| `image` | ❌ | string | Cover image URL, used by a few posts only |

### Body Structure

```markdown
---
title: xxx
date: 2026-6-4
tags: [A, B]
summary: "一句开场白……"
---

Intro paragraph(s) — 1–3 short paragraphs of setup or banter.

<!-- more -->          ← required: list-page excerpt cutoff

<tongji/>              ← required: stats component

## Section 1

Body text + images + quotes + code blocks + lists …

## Section 2

More sections …

<tongji/>              ← rare in old posts, omitted in new

<comment/>             ← required: Giscus comments

<script>               ← optional: inline Vue component (for interactions)
  import { xxx } from '../.vuepress/utils/index'
  export default { data() {...}, mounted() {...}, methods: {...} }
</script>
<style scoped>         ← optional: scoped styles
  ...
</style>
```

### Images
- Local: `![alt](/images/<file>.webp)`, files live in `docs/.vuepress/public/images/`
- Remote: image host `https://img.cdn1.vip/i/xxx.webp` (most recent posts)
- The image viewer makes every `<img>` click-to-zoom with ←/→ navigation

### Code Blocks
- Fenced: ` ``` lang … ``` `; common langs: `js` `bash` `vue` `html` `css`
- Inline: `` `code` ``

### Inline Interaction (Element UI)
- Element UI is globally registered (`enhanceApp.js` + `element-ui.js`); use `el-form` / `el-table` / `el-button` / `el-row` / `el-col` directly in markdown
- For non-trivial interactions, append a `<script>` block exporting a Vue component and a `<style>` block at end of post (see `2024-10-23-etf.md`)
- **Do NOT** use dynamic `import()` for Element UI in markdown (race condition); all deps are static imports

### Custom Component Tags
- `<tongji/>` — stats (no props)
- `<comment/>` — Giscus comments (no props)
- `<myqrcode code="resource-name">button text</myqrcode>` — download QR code

### Writing Style
- `summary`: first-person, conversational, emotional (rant / surprise / empathy), often ends with `~` `😄` `😂`
- Body: Chinese-first with occasional English terms; short paragraphs, no long sentences; use `**bold**` to highlight keywords
- Spaces around numbers / English words (e.g. `100 台`, `300 亿`)

