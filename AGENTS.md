# 小皮咖博客 — AGENTS.md

## 命令

| 命令 | 说明 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 (localhost:8080) |
| `npm run docs:build` | 构建预生成搜索索引 + VuePress 构建 |
| `npm run deploy` | **不可用** — publish.js 文件已删除，构建产物由 GitHub Actions 自动部署 |

## 架构要点

- **VuePress 1.x** + **@vuepress/theme-blog 2.3.3**（本地副本在 `theme-blog/`，**不是** npm 安装）。配置通过 `docs/.vuepress/config.js` 中 `theme: require.resolve('../../theme-blog')` 加载。
- **博客文章**：`docs/_posts/YYYY-MM-DD-title.md`，必须包含 `title` / `date` / `tags`，可选 `author` / `location` / `summary`。
- **摘要优先级**：`frontmatter.summary` > 自动生成的 `page.summary`。自动摘要在 `theme-blog/index.js:138-156` 的 `extendPageData` 中生成（对 strippedContent 取前 200 字符 + "..."）。
- **Element UI**：静态导入（`enhanceApp.js` 中 `import ElementUI` + `Vue.use`）。不要用动态 `import()` — 会导致竞态错误。
- **自定义组件**：`comment.vue`（Giscus 评论）、`tongji.vue`（统计）、`element-ui.js`（UMD 打包文件，单行）。
- **Utils/lunar.js**：1237 行农历工具库，ES module 导出 `getCalendarData`。内部 `calendar()` 函数使用 `target` 对象而非 `this`（ES module 严格模式下 `this` 为 `undefined`）。
- **搜索索引**：构建前运行 `scripts/generate-search-index.js` 生成 `docs/.vuepress/public/search.json`，不是 VuePress 原生搜索。
- **样式**：`docs/.vuepress/styles/index.styl`（Stylus），字体 LXGW WenKai Screen R。

## CI / 部署

- **GitHub Actions**：`.github/workflows/deploy.yml`，推送到 `master` 分支时触发。Node 14，构建产物部署到 `gh-pages` 分支。
- **Secret**：需要 `BLOB_DEPLOY_PRI`（SSH 私钥）。

## 注意事项

- 构建日志中的 `[]` 空数组行是 **无害**的（来自 lunar.js 中调试输出）。
- `element-ui.js` 是经过 **UMD 打包的单行文件**，不要格式化或编辑，替换需重新打包。
- 暂无可用的 lint / typecheck 命令，无测试框架。
- `docs/_posts/` 下当前 31 篇文章，每篇都有 `frontmatter.summary`（作者口吻短文案，手动生成）。
- 导航链接：首页 `/`，文章列表 `/page/1/`，标签 `/tag/`，时间线 `/archives`。
