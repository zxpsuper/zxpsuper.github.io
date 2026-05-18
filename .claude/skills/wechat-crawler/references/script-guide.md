# 公众号爬取脚本详细指南

## 脚本功能详解

### 主要组件

1. **路径配置**
   - `BASE_DIR`: 项目根目录
   - `POSTS_DIR`: Markdown 文件保存位置 (`docs/_posts/`)
   - `IMAGES_DIR`: 图片保存位置 (`docs/.vuepress/public/images/`)

2. **核心函数**

   - `download_image(url, save_dir)`
     - 下载图片并转换为 WebP 格式
     - 自动处理 RGBA 到 RGB 转换
     - 生成唯一文件名避免冲突
     - 返回转换后的文件名

   - `extract_content(soup)`
     - 从 BeautifulSoup 对象中提取文章正文
     - 自动下载并替换图片为本地 WebP 版本
     - 清理不需要的标签（script, style 等）

   - `html_to_markdown(html)`
     - 将 HTML 内容转换为 Markdown 格式
     - 支持标题、段落、图片、链接、列表等

   - `extract_title(soup)`
     - 从多个来源提取文章标题
     - 优先级：公众号专用标签 > Open Graph > 页面 title

   - `extract_date(soup, url)`
     - 提取文章发布时间
     - 优先级：article:published_time > 页面脚本中的时间戳 > 当前日期

   - `crawl_article(url)`
     - 整合所有功能，完成单篇文章的完整爬取流程

## 依赖安装

```bash
pip install requests beautifulsoup4 pillow python-dotenv
```

## 使用示例

### 基本使用

爬取单篇文章：
```bash
python .claude/skills/wechat-crawler/scripts/crawl_wechat.py https://mp.weixin.qq.com/s/xxx
```

爬取多篇文章：
```bash
python .claude/skills/wechat-crawler/scripts/crawl_wechat.py https://mp.weixin.qq.com/s/xxx https://mp.weixin.qq.com/s/yyy https://mp.weixin.qq.com/s/zzz
```

### 输出文件

Markdown 文件格式示例：

```markdown
---
title: 文章标题
date: 2024-05-20
tags: [微信公众号]
---

文章内容...

![图片描述](/images/wechat_1234567890_abcdef12.webp)

更多内容...
```

## 注意事项

1. **请求频率**：脚本内置了 1 秒的请求间隔，避免被限制
2. **图片质量**：WebP 转换默认使用 85% 的质量
3. **防冲突**：文件名会自动添加序号避免覆盖
4. **编码问题**：统一使用 UTF-8 编码
