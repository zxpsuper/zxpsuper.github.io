# 微信公众号爬取 Skill 使用说明

## 安装依赖

首先安装所需的 Python 包：

```bash
pip install requests beautifulsoup4 pillow
```

## 使用方法

### 爬取单篇文章

```bash
python .claude/skills/wechat-crawler/scripts/crawl_wechat.py <公众号文章链接>
```

### 爬取多篇文章

```bash
python .claude/skills/wechat-crawler/scripts/crawl_wechat.py <链接1> <链接2> <链接3>
```

## 输出位置

- **Markdown 文件**：保存在 `docs/_posts/` 目录
- **图片文件**：保存在 `docs/.vuepress/public/images/` 目录（自动转换为 WebP 格式）

## 注意事项

1. 脚本会自动处理文章中的图片，下载并转换为 WebP 格式
2. 生成的 Markdown 文件包含标准的 VuePress frontmatter
3. 支持批量爬取多篇文章，自动避免文件名冲突
