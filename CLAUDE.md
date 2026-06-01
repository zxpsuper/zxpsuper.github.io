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

## CI
- `.github/workflows/deploy.yml`: push to `master`, Node 14, deploy to `gh-pages`. Uses `BLOB_DEPLOY_PRI` secret.

## Gotchas
- `[]` lines in build log are **harmless** (debug output from lunar.js).
- No lint / typecheck / test commands available.
- 31 posts, all with handwritten `frontmatter.summary`.
