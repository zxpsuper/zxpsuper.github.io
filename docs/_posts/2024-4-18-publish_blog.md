---
title: 使用 Github Action 发布博客
date: 2024-4-18
tags: 
  - blog
  - IT技术
author: 小皮咖
location: 广州  
---

原本是计划用 travis-cli 自动构建发布博客的，结果登录上去发现已经开始收费使用了，没办法只能转向 Github Action 了！

GitHub Actions 是 GitHub 官方推出的持续集成/部署模块服务（CI/CD），和 jenkins、Travis CI 是同一类产品定位。

但 Actions 的最大优势，就是它是与 GitHub 高度整合的，只需一个配置文件即可自动开启服务。甚至你不需要购买服务器 —— GitHub Actions 自带云环境运行，包括私有仓库也可以享用，而且云环境性能也十分强劲。

<!-- more -->

<tongji/>

**那么如何利用 Github Action 构建并发布博客呢？**

1. 本地创建公钥密钥并保存到仓库设置中

本地执行 `ssh-keygen -f github-deploy-key` 后会生成两个文件：
- `github-deploy-key`密钥
- `github-deploy-key.pub`公钥

在仓库的 Setting 中找到 Actions secrets and variables, 添加一个 Secret, 取名 `BLOB_DEPLOY_PRI`, 将密钥的内容复制进去并保存。

![](/images/github-action-01.png)

在仓库的 Setting 中找到 Deploy keys, 添加刚才生成的公钥，取名 `BLOB_DEPLOY_PUB`, 并勾选 `Allow write access`

![](/images/github-action-02.png)

2. 创建 workflow 模板 `deploy.yml` 文件

```
.github
   └─ workflows
       └─ deploy.yml
```

```yml
name: Build and Deploy to GitHub Pages
 
on:
  push:
    branches:
      - master  # 指定触发部署的分支，通常是main或master
 
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # 使用最新的Ubuntu虚拟环境
 
    steps:
    - name: Checkout Code
      uses: actions/checkout@v2
 
    - name: Setup Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '14'  # 指定Node.js的版本，根据您的项目需求调整

    - name: Install Dependencies
      run: npm install # 安装依赖
 
    - name: Build
      run: npm run docs:build # 构建文档
 
    - name: Deploy to GitHub Pages
      # 使用他人的 action 将文档推送至 gh-pages 分支
      uses: JamesIves/github-pages-deploy-action@4.1.4 
      with:
        GITHUB_TOKEN: ${{ secrets.BLOB_DEPLOY_PRI }}
        BRANCH: gh-pages  # 部署到gh-pages分支
        FOLDER: docs/.vuepress/dist  # 指定构建目录
        CLEAN: true  # 清理旧文件
```
在完成上述操作之后，只要每次推送代码到 master 分支，就会触发 workflow 自动执行 action 构建并部署，做到推送即部署的效果，大大解放生产力！

构建部署流程可以在 Action tab 中看到，可以实时查看构建状态，分析解决问题！😁😁


<comment/>