---
title: 使用 Github Action 发布博客
date: 2024-4-18
tags: 
  - blog
  - 前端
  - IT技术
author: 小皮咖
location: 广州  
---

原本是计划用 travis-cli 自动构建发布博客的，结果登录上去发现已经开始收费使用了，没办法只能转向 Github Action 了！

<!-- more -->

**那么如何集成到我们的博客中呢？**

1. 选择一个公开的仓库，在 setting 中找到 feature-Discussions, 勾选打开。

![01](/images/giscus-01.png)

2. 点击这里👉[giscus app](https://github.com/apps/giscus) 安装 giscus app

3. 前往 [giscus 官网](https://giscus.app/zh-CN) 进行配置，选择主题后复制生成的 script 标签代码

![01](/images/giscus-02.png)

4. 创建 vuepress 全局组件 comment

```vue
<template>
  <div>
    <div class="giscus"></div>
    <script
      src="https://giscus.app/client.js"
      ...你上一步复制的代码
    ></script>
  </div>
</template>
<script>
export default {
  name: 'comment'
}
</script>
```
5. 最后在我们编写的 markdown 文件的底部加入一行代码 `<comment/>` 即可！

![01](/images/giscus-03.png)

总的来说操作比较简单，样式也很简洁，不过前提是该读者要通过 Github 登录后方可评论，和 Gittalk 功能很类似。


<comment/>