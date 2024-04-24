---
title: Vue 多语言转化工具——vue-i18n-transform
date: 2024-4-19
tags: 
  - Vue
  - IT技术
  - 前端
author: 小皮咖
location: 佛山  
description: vue 多语言转化工具
---

## 背景
现有的庞大 Vue 项目突然要进军海外了，原本一开始就没有做多语言适配的准备，面对这么多文件的中文替换多语言变量的工作确实有些头疼。参考网上的一些案例和做法，我写了一款 vue 文件批量转化多语言插件————[vue-i18n-transform](https://github.com/zxpsuper/vue-i18n-transform)!

<!-- more -->

<tongji/>

## 原理

vue-i18n-transform 其实是一款发布在 npm 的 node 插件, 通过对文件操作，获取文本内容后使用正则对中文进行文本替换后再重写文件实现，同时支持对 vue,js,ts 文件的中文替换。

## 使用

1. 安装vue-i18n-transform依赖
```bash
npm i vue-i18n-transform -D
```
2. 编写配置文件

以下是默认配置, 当然你也可以在项目文件夹下创建 `vue-i18n-transform.config.js` 文件, 按下面的配置修改你的自定义配置
```js
module.exports = {
  entry: 'src', // 编译入口文件夹,默认是 src
  outdir: 'src/locales', // i18n 输出文件夹 默认是 src/locales
  exclude: ['src/locales'], // 不重写的文件夹, 默认是 ['src/locales']
  extensions: ['.vue', '.js', '.ts'], // 重写的文件类型，默认是 ['.js', '.vue', '.ts']
  // 是否为单文件编译, 默认为 false. 如果为 true, 则 entry 需为文件而不是文件夹,
  // 如: entry: 'src/index.vue'
  single: false, 
  filename: 'zh_cn' // 输入的中文 json 文件名,默认为 zh_cn
}
```
3. 一键转化
```bash
npx vue-i18n-transform
```

## 实现效果
本插件的语言变量名是以`目录文件名 + 下划线 + 索引`的方式命名，如“filename_1” 或者 “src_views_index_1”
```html
<!-- 替换前 -->
<i :class="{ selected: tabactiveName === 1 }" @click="handleTabClick(1)">
  <span>效果图</span>
</i>

<!-- 替换后 -->
<i :class="{ selected: tabactiveName === 1 }" @click="handleTabClick(1)">
  <span>{{$t('filename_1')}}</span>
</i>
```
## 功能拓展
在开发完这个 node 插件之后，还是遇到了几个问题：
1. 每次新增文件都跑批量转化浪费时间还可能出现其他问题，单独转化一个文件需每次修改配置很麻烦
2. 这种变量命名方式可读性很差，每次查找一个变量的中文都得跑去`zh_cn.json` 中搜索，很不方便。
3. 转化不理想后没法回退

针对以上几个问题，我开发了一个 vscode 插件——[vue-i18n-transform](https://marketplace.visualstudio.com/items?itemName=zxpsuper.vue-i18n-transform)

该插件支持右键一键转化和还原：

![GIF.gif](/images/i18n-01.gif)

同时也支持鼠标悬浮显示语言包详情，点击可跳转至相应位置：

![haha.gif](/images/i18n-02.gif)

vscode 插件和 node 插件共用一套配置，除此之外 vscode 插件新增配置 useChineseKey，默认false. 可以直接用中文做 key，进一步增加可读性。


![haha2.gif](/images/i18n-03.gif)

当然插件本身可能存在一些不足，欢迎大家给我提 [Issue](https://github.com/zxpsuper/vue-i18n-transform/issues/new) 或者 PR 一起优化它😁.

<comment/>