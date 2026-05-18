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

# 配置路径 - 从脚本位置向上 4 级到项目根目录
script_dir = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
POSTS_DIR = os.path.join(BASE_DIR, 'docs', '_posts')
IMAGES_DIR = os.path.join(BASE_DIR, 'docs', '.vuepress', 'public', 'images')

# 创建目录（如果不存在）
os.makedirs(POSTS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

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

    # 处理标题
    for i in range(1, 7):
        pattern = r'<h{}[^>]*>(.*?)</h{}>'.format(i, i)
        replacement = '\n{} \\1\n'.format('#' * i)
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    # 处理段落
    html = re.sub(r'<p[^>]*>(.*?)</p>', '\n\\1\n', html, flags=re.DOTALL)

    # 处理图片
    html = re.sub(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>', '![\\2](\\1)', html)
    html = re.sub(r'<img[^>]*src="([^"]+)"[^>]*>', '![](\\1)', html)

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

def polish_content(content):
    """对内容进行简单润色优化"""
    # 这里可以添加更多润色规则
    content = content.replace('\xa0', ' ')
    content = content.replace('&nbsp;', ' ')
    content = re.sub(r'[ \t]+', ' ', content)
    return content

def crawl_article(url):
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
        polished_content = polish_content(content)

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

        full_content = frontmatter + polished_content

        # 保存文件
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(full_content)

        print("成功保存: {}".format(md_path))
        return md_path

    except Exception as e:
        print("爬取失败 {}: {}".format(url, e))
        return None

def main():
    parser = argparse.ArgumentParser(description='爬取微信公众号文章')
    parser.add_argument('urls', nargs='+', help='公众号文章链接')
    args = parser.parse_args()

    print("开始爬取 {} 篇文章...".format(len(args.urls)))

    success_count = 0
    for url in args.urls:
        if crawl_article(url):
            success_count += 1
        time.sleep(1)  # 避免请求过快

    print("完成！成功爬取 {}/{} 篇文章".format(success_count, len(args.urls)))

if __name__ == '__main__':
    main()
