# 项目概览

这是一个基于 VuePress 构建的个人博客系统，名为"小皮咖"（Suporka blog）。项目使用 VuePress 官方博客主题，集成了评论系统、统计分析等功能，并通过 GitHub Actions 实现自动化部署。

## 主要技术栈

- **VuePress 1.9.10** - 静态站点生成器
- **@vuepress/theme-blog 2.3.3** - VuePress 官方博客主题
- **Element UI** - UI 组件库（按需引入）
- **Giscus** - 基于 GitHub Discussions 的评论系统
- **GitHub Actions** - CI/CD 自动化部署

## 项目结构

```
E:\github\zxpsuper.github.io/
├── docs/                          # 文档目录
│   ├── _posts/                    # 博客文章目录
│   ├── _writings/                 # 随笔目录（当前未启用）
│   ├── archives.md                # 归档页面
│   ├── README.md                  # 项目说明
│   └── .vuepress/                 # VuePress 配置目录
│       ├── config.js              # 主配置文件
│       ├── enhanceApp.js          # 应用增强配置
│       ├── components/            # 自定义组件
│       │   ├── comment.vue        # 评论组件
│       │   ├── element-ui.js      # Element UI 导入
│       │   └── tongji.vue         # 统计组件
│       ├── styles/                # 样式文件
│       │   ├── element-ui.css     # Element UI 样式
│       │   └── index.styl         # 全局样式
│       ├── public/                # 静态资源
│       │   └── images/            # 图片资源
│       └── dist/                  # 构建输出目录
├── .github/workflows/             # GitHub Actions 配置
│   └── deploy.yml                 # 自动部署配置
├── package.json                   # 项目依赖和脚本
└── node_modules/                  # 依赖包
```

## 构建和运行

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run docs:dev
```
开发服务器默认运行在 `http://localhost:8080`

### 构建生产版本
```bash
npm run docs:build
```
构建产物输出到 `docs/.vuepress/dist` 目录

### 部署
```bash
npm run deploy
```
该命令会先构建项目，然后执行部署脚本

## 自动化部署

项目使用 GitHub Actions 实现自动化部署，配置文件位于 `.github/workflows/deploy.yml`。

**触发条件**：当代码推送到 `master` 分支时自动触发

**部署流程**：
1. 检出代码
2. 设置 Node.js 环境（版本 14）
3. 安装项目依赖
4. 构建项目
5. 将构建产物部署到 `gh-pages` 分支

**注意事项**：
- 需要在仓库 Settings 中配置 `BLOB_DEPLOY_PRI` Secret（SSH 私钥）
- 需要在仓库 Settings 的 Deploy keys 中配置 SSH 公钥并启用写权限

## 开发约定

### 文章格式
所有博客文章位于 `docs/_posts/` 目录，文件命名格式为 `YYYY-MM-DD-标题.md`。

每篇文章必须包含 frontmatter：
```yaml
---
title: 文章标题
date: YYYY-MM-DD
tags:
  - 标签1
  - 标签2
author: 作者名
location: 位置
---
```

文章内容使用 Markdown 格式，可通过 `<!-- more -->` 标记文章摘要截断位置。

### 静态资源
图片等静态资源应放置在 `docs/.vuepress/public/images/` 目录，在文章中通过 `/images/文件名` 引用。

### 组件使用
- **评论组件**：在文章末尾使用 `<comment/>` 标签启用 Giscus 评论系统
- **统计组件**：使用 `<tongji/>` 标签启用页面统计

### 样式规范
- 全局样式定义在 `docs/.vuepress/styles/index.styl`
- 使用 Stylus 预处理器
- 字体使用 LXGW WenKai Screen R（霞鹜文楷屏幕阅读版）
- 响应式设计，适配移动端（最大宽度 959px）

### 导航配置
博客导航包含三个主要页面：
- **Blog**：首页，显示最新文章列表
- **Tags**：标签页，按标签分类展示文章
- **Archives**：归档页，按时间线展示所有文章

### 分页设置
- 全局分页：每页显示 10 篇文章
- 标签页分页：继承全局设置

## 部署地址

- GitHub Pages: https://zxpsuper.github.io/
- Netlify: https://zxpsuper.netlify.app/

## 特殊功能

### 统计分析
- 首页集成百度统计（通过 enhanceApp.js）
- 自定义统计组件（tongji.vue）

### 评论系统
- 使用 Giscus（基于 GitHub Discussions）
- 配置仓库：zxpsuper/zxpsuper.github.io
- 语言：中文（zh-CN）

### RSS Feed
- 启用 RSS 功能
- Canonical URL: https://zxpsuper.github.io/

## 维护说明

### 更新依赖
定期更新 VuePress 和相关依赖以获取最新功能和安全补丁。

### 备份
- 源码托管在 GitHub
- 构建产物部署到 gh-pages 分支
- 建议定期备份 `docs/_posts/` 目录

### 扩展配置
如需修改博客配置，主要编辑以下文件：
- `docs/.vuepress/config.js` - 主要配置
- `docs/.vuepress/styles/index.styl` - 样式配置
- `docs/.vuepress/enhanceApp.js` - 应用增强