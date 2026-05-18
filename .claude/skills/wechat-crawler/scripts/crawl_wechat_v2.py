# -*- coding: utf-8 -*-
#!/usr/bin/env python3
import os
import re
import sys
import requests
from bs4 import BeautifulSoup
from PIL import Image
from datetime import datetime
import argparse
import hashlib
import time
import json

# 配置路径 - 先定义路径函数
def get_base_dir():
    # 方式1: 从当前工作目录开始找
    cwd = os.getcwd()
    if os.path.exists(os.path.join(cwd, 'docs')):
        return cwd

    # 方式2: 从脚本位置向上找
    script_dir = os.path.dirname(os.path.abspath(__file__))
    current = script_dir
    for _ in range(10):  # 最多找10级
        if os.path.exists(os.path.join(current, 'docs')):
            return current
        parent = os.path.dirname(current)
        if parent == current:  # 到达根目录
            break
        current = parent

    # 默认返回脚本位置上方4级
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(script_dir))))

BASE_DIR = get_base_dir()
POSTS_DIR = os.path.join(BASE_DIR, 'docs', '_posts')
IMAGES_DIR = os.path.join(BASE_DIR, 'docs', '.vuepress', 'public', 'images')

# 创建目录（如果不存在）
os.makedirs(POSTS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

class ContentOptimizer:
    """文案优化器"""

    def __init__(self):
        # 常见的公众号冗余表达 - 正则表达式
        self.redudant_patterns = [
            r'👆关注.*?获取.*?$',
            r'关注.*?，分享更多.*?$',
            r'欢迎点赞.*?评论.*?$',
            r'欢迎转发.*?$',
            r'点个在看.*?$',
            r'—{3,}',
        ]

        # 需要移除的表情符号
        self.emojis_to_remove = [
            '👇', '👆', '💬', '❤️', '👍', '🔥', '✨', '🚀', '💡', '🎉', '💰',
            '⬇️', '⬆️', '😊', '😂', '🤔', '😎', '🤣', '😭', '🙏', '👏', '🤝',
            '🌟', '💪', '🎁', '🎯', '🎊', '💯', '🥳', '🤩', '😱', '🤗', '😘'
        ]

    def optimize(self, content):
        """主优化函数"""
        if not content:
            return content

        print("  - 基础清理...")
        content = self.basic_clean(content)

        print("  - 移除冗余内容...")
        content = self.remove_redundant(content)

        print("  - 优化段落结构...")
        content = self.optimize_paragraphs(content)

        print("  - 优化标点符号...")
        content = self.optimize_punctuation(content)

        print("  - 处理特殊格式问题...")
        # 处理文案后面紧跟着标题的情况（如 "保存好！## 标题"）
        content = re.sub(r'([^！？。\n])(##+ )', r'\1\n\n\2', content)
        content = re.sub(r'([！？。])(##+ )', r'\1\n\n\2', content)

        # 处理文案后面紧跟着图片的情况（如 "格式！![图片]("）
        content = re.sub(r'(\S)(!\[.*\]\(.*\))', r'\1\n\n\2', content)

        print("  - 最后清理空行...")
        content = self.clean_empty_lines(content)

        return content

    def basic_clean(self, content):
        """基础清理"""
        # 替换特殊空格
        content = content.replace('\xa0', ' ')
        content = content.replace('&nbsp;', ' ')

        # 移除表情符号
        for emoji in self.emojis_to_remove:
            content = content.replace(emoji, '')

        # 移除多余的星号（包括行尾的）
        content = re.sub(r'\*{2,}', '', content)
        content = re.sub(r'\*+\s*$', '', content, flags=re.MULTILINE)
        content = re.sub(r'^\s*\*+', '', content, flags=re.MULTILINE)

        return content

    def remove_redundant(self, content):
        """移除冗余内容"""
        lines = content.split('\n')
        cleaned_lines = []

        for line in lines:
            line_stripped = line.strip()

            # 检查是否是冗余行
            is_redundant = False
            for pattern in self.redudant_patterns:
                if re.search(pattern, line_stripped):
                    is_redundant = True
                    break

            # 检查是否是纯表情或符号行
            if not is_redundant:
                if re.match(r'^[\s\W\d]*$', line_stripped):
                    if not re.match(r'^#+', line_stripped):  # 保留标题
                        if len(line_stripped) < 15:  # 短的纯符号行移除
                            is_redundant = True

            # 检查是否是微信号、二维码等引导（更宽松的检测）
            if not is_redundant:
                # 这些关键词如果单独出现或在短句中，很可能是引导关注
                keywords = ['二维码', '扫码', '回复', '后台', '加群', '微信号', '点个']
                for kw in keywords:
                    if kw in line_stripped:
                        # 如果行中包含这些词且长度适中，很可能是公众号引导语
                        if len(line_stripped) < 60 or ('回复' in line_stripped and len(line_stripped) < 80):
                            is_redundant = True
                            break

            if not is_redundant and line_stripped:
                cleaned_lines.append(line)

        return '\n'.join(cleaned_lines)

    def optimize_paragraphs(self, content):
        """优化段落"""
        # 先按行分割，处理标题
        lines = content.split('\n')
        processed = []
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            if not line:
                i += 1
                continue

            # 如果是标题行，确保前后有空行
            if re.match(r'^#+', line):
                processed.append('')
                processed.append(line)
                processed.append('')
                i += 1
            else:
                processed.append(line)
                i += 1

        # 重新组合后按空行分段
        content = '\n'.join(processed)
        paragraphs = re.split(r'\n\s*\n', content)
        optimized = []

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            # 如果段落太短（小于15字），且不是标题，合并到上一段
            if len(para) < 15 and not re.match(r'^#+', para) and not re.match(r'!\[.*\]\(.*\)', para):
                if optimized and not re.match(r'^#+', optimized[-1]) and not re.match(r'!\[.*\]\(.*\)', optimized[-1]):
                    optimized[-1] = optimized[-1] + ' ' + para
                else:
                    optimized.append(para)
            else:
                optimized.append(para)

        result = '\n\n'.join(optimized)

        # 额外处理：确保 "###" 开头的标题前面一定有空行
        result = re.sub(r'(\S)(\n###\s)', r'\1\n\n\2', result)
        result = re.sub(r'(\S)(\n##\s)', r'\1\n\n\2', result)
        result = re.sub(r'(\S)(\n#\s)', r'\1\n\n\2', result)

        # 确保图片前后有空行
        # 图片前面没有空行的情况
        result = re.sub(r'(\S)(\n!\[.*\]\(.*\))', r'\1\n\n\2', result)
        # 图片后面没有空行的情况
        result = re.sub(r'(!\[.*\]\(.*\))(\n\S)', r'\1\n\n\2', result)

        # 确保标题前面有空行（标题可能紧跟在图片或文案后面）
        result = re.sub(r'([^\n])(\n#+ )', r'\1\n\n\2', result)

        return result

    def optimize_punctuation(self, content):
        """优化标点符号"""
        # 多个感叹号、问号合并
        content = re.sub(r'[!！]{2,}', '！', content)
        content = re.sub(r'[?？]{2,}', '？', content)
        content = re.sub(r'[。.]{2,}', '。', content)

        # 移除中文标点后的多余空格（保持自然）
        content = re.sub(r'([，。！？；：])\s+', r'\1', content)

        # 清理多余空格
        content = re.sub(r'[ \t]{2,}', ' ', content)
        content = re.sub(r'[ \t]+\n', '\n', content)

        return content

    def clean_empty_lines(self, content):
        """清理空行"""
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        content = re.sub(r'\n\s*\n', '\n\n', content)
        return content.strip()

def download_image(url, save_dir):
    """下载图片并转换为 WebP 格式"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        # 生成唯一文件名
        url_hash = hashlib.md5(url.encode('utf-8')).hexdigest()[:8]
        timestamp = int(time.time())
        webp_filename = 'wechat_{}_{}.webp'.format(timestamp, url_hash)
        webp_path = os.path.join(save_dir, webp_filename)

        # 保存临时文件
        temp_path = os.path.join(save_dir, 'temp_{}'.format(timestamp))
        with open(temp_path, 'wb') as f:
            f.write(response.content)

        # 转换为 WebP
        with Image.open(temp_path) as img:
            # 如果是 RGBA 模式，转换为 RGB
            if img.mode == 'RGBA':
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            img.save(webp_path, 'WebP', quality=85)

        # 删除临时文件
        os.remove(temp_path)

        return webp_filename
    except Exception as e:
        print("图片下载失败 {}: {}".format(url, e))
        return None

def extract_content(soup):
    """提取并优化文章内容"""
    # 查找主要内容区域
    content = soup.find('div', id='js_content')
    if not content:
        # 尝试其他可能的内容容器
        content = soup.find('div', class_='rich_media_content')

    if not content:
        return ""

    # 优化内容
    for elem in content.find_all(['script', 'style']):
        elem.decompose()

    # 处理图片
    for img in content.find_all('img'):
        data_src = img.get('data-src') or img.get('src')
        if data_src:
            print("正在下载图片: {}".format(data_src))
            webp_file = download_image(data_src, IMAGES_DIR)
            if webp_file:
                # 替换为本地图片路径
                new_tag = soup.new_tag('img')
                new_tag['src'] = '/images/{}'.format(webp_file)
                new_tag['alt'] = img.get('alt', '')
                img.replace_with(new_tag)

    # 转换为 Markdown
    markdown = html_to_markdown(str(content))
    return markdown

def html_to_markdown(html):
    """简单的 HTML 到 Markdown 转换"""
    # 移除多余的标签
    html = re.sub(r'</?section[^>]*>', '', html)
    html = re.sub(r'</?span[^>]*>', '', html)

    # 处理标题 - 确保前后有空行
    for i in range(1, 7):
        pattern = r'<h{}[^>]*>(.*?)</h{}>'.format(i, i)
        replacement = '\n\n{} \\1\n\n'.format('#' * i)
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    # 处理段落
    html = re.sub(r'<p[^>]*>(.*?)</p>', '\n\\1\n', html, flags=re.DOTALL)

    # 处理图片 - 确保前后有空行
    html = re.sub(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>', '\n\n![\\2](\\1)\n\n', html)
    html = re.sub(r'<img[^>]*src="([^"]+)"[^>]*>', '\n\n![](\\1)\n\n', html)

    # 处理加粗和斜体
    html = re.sub(r'<strong[^>]*>(.*?)</strong>', '**\\1**', html, flags=re.DOTALL)
    html = re.sub(r'<b[^>]*>(.*?)</b>', '**\\1**', html, flags=re.DOTALL)
    html = re.sub(r'<em[^>]*>(.*?)</em>', '*\\1*', html, flags=re.DOTALL)
    html = re.sub(r'<i[^>]*>(.*?)</i>', '*\\1*', html, flags=re.DOTALL)

    # 处理链接
    html = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', '[\\2](\\1)', html, flags=re.DOTALL)

    # 处理列表
    html = re.sub(r'<ul[^>]*>(.*?)</ul>', '\\1', html, flags=re.DOTALL)
    html = re.sub(r'<ol[^>]*>(.*?)</ol>', '\\1', html, flags=re.DOTALL)
    html = re.sub(r'<li[^>]*>(.*?)</li>', '- \\1\n', html, flags=re.DOTALL)

    # 处理换行
    html = re.sub(r'<br\s*/?>', '\n', html)
    html = re.sub(r'</br>', '\n', html)

    # 移除其他标签
    html = re.sub(r'<[^>]+>', '', html)

    # 清理多余空行
    html = re.sub(r'\n\s*\n\s*\n', '\n\n', html)

    return html.strip()

def extract_title(soup):
    """提取文章标题"""
    # 尝试公众号标题
    title = soup.find('h1', class_='rich_media_title')
    if title:
        return title.get_text(strip=True)

    # 尝试通用标题
    title = soup.find('meta', property='og:title')
    if title:
        return title.get('content', '').strip()

    title = soup.find('title')
    if title:
        return title.get_text(strip=True)

    return '未命名文章'

def extract_date(soup, url):
    """提取发布日期"""
    # 尝试从 meta 标签获取
    date_meta = soup.find('meta', property='article:published_time')
    if date_meta:
        date_str = date_meta.get('content', '')
        if date_str:
            try:
                dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                return dt.strftime('%Y-%m-%d')
            except:
                pass

    # 尝试从页面脚本中提取
    scripts = soup.find_all('script')
    for script in scripts:
        content = script.string
        if content:
            match = re.search(r'var\s+createTime\s*=\s*["\'](\d+)["\']', content)
            if match:
                try:
                    timestamp = int(match.group(1))
                    dt = datetime.fromtimestamp(timestamp)
                    return dt.strftime('%Y-%m-%d')
                except:
                    pass

    # 使用当前日期
    return datetime.now().strftime('%Y-%m-%d')

def sanitize_filename(title):
    """清理文件名"""
    filename = re.sub(r'[<>:"/\\|?*]', '', title)
    filename = filename[:50].strip()
    return filename or 'article'

def crawl_article(url, optimize=True):
    """爬取单篇公众号文章"""
    print("正在爬取: {}".format(url))

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        response.encoding = 'utf-8'

        soup = BeautifulSoup(response.text, 'html.parser')

        # 提取信息
        title = extract_title(soup)
        date = extract_date(soup, url)
        content = extract_content(soup)

        # 优化文案
        if optimize:
            print("正在优化文案...")
            optimizer = ContentOptimizer()
            content = optimizer.optimize(content)

        # 生成文件名
        safe_title = sanitize_filename(title)
        md_filename = '{}-{}.md'.format(date, safe_title)
        md_path = os.path.join(POSTS_DIR, md_filename)

        # 防止文件名冲突
        counter = 1
        while os.path.exists(md_path):
            md_filename = '{}-{}-{}.md'.format(date, safe_title, counter)
            md_path = os.path.join(POSTS_DIR, md_filename)
            counter += 1

        # 生成 Markdown 内容
        frontmatter = '''---
title: {}
date: {}
tags: [微信公众号]
---

'''.format(title, date)

        full_content = frontmatter + content

        # 保存文件
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(full_content)

        print("成功保存: {}".format(md_path))
        return md_path

    except Exception as e:
        print("爬取失败 {}: {}".format(url, e))
        import traceback
        traceback.print_exc()
        return None

def main():
    parser = argparse.ArgumentParser(description='爬取微信公众号文章')
    parser.add_argument('urls', nargs='+', help='公众号文章链接')
    parser.add_argument('--no-optimize', action='store_true', help='跳过文案优化')
    args = parser.parse_args()

    print("开始爬取 {} 篇文章...".format(len(args.urls)))

    success_count = 0
    for url in args.urls:
        if crawl_article(url, optimize=not args.no_optimize):
            success_count += 1
        time.sleep(1)  # 避免请求过快

    print("完成！成功爬取 {}/{} 篇文章".format(success_count, len(args.urls)))

if __name__ == '__main__':
    main()
