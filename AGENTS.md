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

## 文章图片查看器

- **实现**：`docs/.vuepress/utils/imageViewer.js`（viewer 单例，DOM 操作）+ `docs/.vuepress/enhanceApp.js` 注册的全局指令 `v-image-preview`。
- **挂载点**：`theme-blog/layouts/GlobalLayout.vue` 根节点（`v-image-preview`），对容器 `.bp-post-content` 内所有 `img` 做事件委托。
- **触发**：点击文章内（非 `<a>` 包裹）的图片；viewer 自动收集同一容器内所有图片作为画廊。
- **交互**：
  - `←` / `→` 切换上一张 / 下一张（循环）
  - `ESC` 关闭
  - 点击遮罩 / 右上角 × 关闭
  - 滚轮缩放（0.2× ~ 6×）
  - 缩放后可鼠标拖拽平移
  - 双击图片在 1× / 2× 切换
- **样式**：`.bp-image-viewer*` 系列类集中写在 `docs/.vuepress/styles/index.styl` 末尾；打开时通过 `body.bp-viewer-open` class 锁滚动。
- **历史变更**：早期依赖 `@vuepress/medium-zoom` 插件，但默认 selector（`.theme-default-content :not(a) > img`）不匹配本主题的 `.bp-post-content` 容器，导致点击无反应；且 medium-zoom 本身不支持画廊模式。已在 `theme-blog/index.js` 移除该插件。

## CI / 部署

- **GitHub Actions**：`.github/workflows/deploy.yml`，推送到 `master` 分支时触发。Node 14，构建产物部署到 `gh-pages` 分支。
- **Secret**：需要 `BLOB_DEPLOY_PRI`（SSH 私钥）。

## 注意事项

- 构建日志中的 `[]` 空数组行是 **无害**的（来自 lunar.js 中调试输出）。
- `element-ui.js` 是经过 **UMD 打包的单行文件**，不要格式化或编辑，替换需重新打包。
- 暂无可用的 lint / typecheck 命令，无测试框架。
- `docs/_posts/` 下当前 34 篇文章，每篇都有 `frontmatter.summary`（作者口吻短文案，手动生成）。
- 导航链接：首页 `/`，文章列表 `/page/1/`，标签 `/tag/`，时间线 `/archives`。
- 修改 `theme-blog/`、`docs/.vuepress/config.js` 等主题相关文件后必须跑一次 `npm run docs:build` 验证。

## 文章格式规范

### 文件命名
- `docs/_posts/YYYY-M-D-slug.md`（月、日可不补零，但必须保证字典序 = 时间序）
- 同一天多篇：用 `YYYY-M-D-slug` 或 `YYYY-M-D-slug_N` 区分（少见）

### Frontmatter

| 字段 | 必需 | 类型 | 说明 |
|------|------|------|------|
| `title` | ✅ | string | 文章标题 |
| `date` | ✅ | `YYYY-M-D` 或 `YYYY-MM-DD` | 两种格式都接受 |
| `tags` | ✅ | string \| array | 行内 `[A, B]` 或块状 `- A\n- B` 都可 |
| `summary` | ✅ | string | **手写**短文案（作者口吻，~50–150 字），最终覆盖自动摘要 |
| `author` | ❌ | string | 旧文章统一 `小皮咖`；新文章可省略 |
| `location` | ❌ | string | 城市名（广州 / 佛山 等） |
| `description` | ❌ | string | 旧字段，会被 `summary` 覆盖，可保留无害 |
| `image` | ❌ | string | 文章封面图 URL，仅个别文章用 |

### 正文结构

```markdown
---
title: xxx
date: 2026-6-4
tags: [A, B]
summary: "一句话引子……"
---

引子段，1–3 段，铺垫背景或吐槽。

<!-- more -->          ← 必加：列表页摘要截断点

<tongji/>              ← 必加：统计组件

## 章节 1

正文 + 配图 + 引用 + 代码块 + 列表……

## 章节 2

更多章节……

<tongji/>              ← 旧文章偶有，新文章已省略

<comment/>             ← 必加：评论组件（Giscus）

<script>               ← 可选：内联 Vue 组件 data/methods（带交互时）
  import { xxx } from '../.vuepress/utils/index'
  export default { data() {...}, mounted() {...}, methods: {...} }
</script>
<style scoped>         ← 可选：组件私有样式
  ...
</style>
```

### 图片
- 本地：`![alt](/images/<file>.webp)`，文件存于 `docs/.vuepress/public/images/`
- 远程：图床 `https://img.cdn1.vip/i/xxx.webp`（近期文章多用）
- 启用图片查看器：所有 `<img>` 自动可点击放大、左右键切换

### 代码块
- 围栏代码：\`\`\`lang … \`\`\`，常用 `js` `bash` `vue` `html` `css`
- 内联代码：\`code\`

### 内联交互（Element UI）
- Element UI 已全局注册（`enhanceApp.js` + `element-ui.js`），可直接在 markdown 中使用 `el-form` / `el-table` / `el-button` / `el-row` / `el-col` 等
- 复杂交互在文章末尾追加 `<script>` 导出 Vue 组件 + `<style>` 写样式（参考 `2024-10-23-etf.md`）
- **注意**：**不要**在 markdown 里用 `import()` 动态加载 Element UI（会竞态）；所有依赖都静态 import

### 自定义组件标签
- `<tongji/>` — 统计（不传参）
- `<comment/>` — Giscus 评论（不传参）
- `<myqrcode code="资源名">按钮文案</myqrcode>` — 资源下载二维码

### 文案风格
- `summary`：第一人称、口语化、带情绪（吐槽/惊喜/共鸣），常以「~」「😄」「😂」结尾
- 正文：中文为主，少量英文术语；段落短，少长句；常用 `**加粗**` 强调关键词
- 数字/英文前后留空格（如 `100 台`、`300 亿`）

