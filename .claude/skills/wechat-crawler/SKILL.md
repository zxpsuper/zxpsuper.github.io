---
name: wechat-crawler
description: 爬取微信公众号文章内容，生成 Markdown 文件保存到 docs/_posts 文件夹，图片转换为 WebP 格式保存到 docs/.vuepress/public/images 文件夹，并对内容进行优化润色。使用场景：(1) 用户提供公众号文章链接需要爬取时，(2) 需要将公众号文章迁移到本博客时，(3) 定期抓取公众号内容时。
---

# 微信公众号文章爬取 Skill

## 快速开始

使用 `scripts/crawl_wechat_v2.py` 脚本爬取公众号文章：

```bash
# 安装依赖
pip install requests beautifulsoup4 pillow python-dotenv

# 爬取单篇文章
python scripts/crawl_wechat_v2.py <url>

# 爬取多篇文章
python scripts/crawl_wechat_v2.py <url1> <url2> <url3>
```

## 功能说明

1. **内容爬取**：从公众号链接获取标题、正文、发布时间等信息
2. **图片处理**：下载文章中的图片并转换为 WebP 格式
3. **Markdown 生成**：生成符合 VuePress 博客格式的 Markdown 文件
4. **内容润色**：对爬取的内容进行优化和润色

## 使用流程

### 1. 准备工作

确保已安装 Python 依赖：
```bash
pip install requests beautifulsoup4 pillow python-dotenv
```

### 2. 执行爬取

运行脚本并提供公众号文章链接：

```bash
python .claude/skills/wechat-crawler/scripts/crawl_wechat_v2.py <公众号文章链接>
```

### 3. 检查结果

- 生成的 Markdown 文件位于 `docs/_posts/` 目录
- 下载并转换的 WebP 图片位于 `docs/.vuepress/public/images/` 目录

## 脚本说明

详细的脚本使用说明请参考 [references/script-guide.md](references/script-guide.md)。

## 输出格式

生成的 Markdown 文件包含标准的 VuePress 博客 frontmatter：

```markdown
---
title: 文章标题
date: YYYY-MM-DD
tags: [标签1, 标签2]
---

文章内容...
```
