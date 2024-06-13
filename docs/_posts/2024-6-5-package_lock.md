---
title: 何为 package-lock.json ?
date: 2024-6-5
tags:
  - 前端
  - 工程化
author: 小皮咖
location: 广州
---

之前遇到某个功能本地调试没有问题，但是一到线上该功能就出现瑕疵😭。一直无法重现，百思不得其解。后面细细对比才发现，是因为**本地依赖的模块和线上打包机使用的模块版本不一致**，为何呢 😕 ？

因为 `package-lock.json` 被开发者删除后重新安装依赖生成新的 `package-lock.json`，某些模块被自动升级了。

我们都知道 `package.json` 除了配置快捷的 node script 脚本, 最主要的作用还是: ***用于记录当前项目所应用到的依赖包.***

但是既然都已经有了 `package.json` 文件了, 那么为什么项目中还需要一个 `package-lock.json` 呢? 本文就来为您详细分析✍✍!

<!-- more -->

<tongji/>

## 语义化版本

在了解 package-lock.json 之前，我们先了解 package.json 的语义化版本。

- 指定版本：`"vue": "2.6.0"`
- 最新修复版：`"vue": "~2.6.0"`, `~`符号开头，会安装最新的 2.6.* 版本
- 最新功能小版本：`"vue": "^2.6.0"`, `^`符号开头，会安装最新的 2.*.* 版本，目前最新是 2.7.16
- 最新功能大版本：`"vue": "*2.6.0"`, `*`符号开头，会安装最新的 *.*.* 版本，目前最新是 3.4.27

因为 `npm install vue@2.6.0` 会往 package.json 中写入 `"vue": "^2.6.0"` （即最新功能小版本），此时本地的 `node_modules` 文件夹中的 vue 版本为 `2.6.0`，可是如果将 `node_modules` 删除重新安装所有依赖 `npm install`，此时 `vue2.6.0` 会自动升级⚡到 `vue2.7.16`. 在某些情况下，不同开发者在不同时机安装 vue 可能安装的版本都不一致。这并不是我们想要的结果！🚫

## lock 版本

**而 `package-lock.json` 的出现正是为了解决这一问题。**

`package-lock.json` 是在 `npm(^5.x.x.x)` 后才有，中途有几次更改。它会在 npm 更改 node_modules 目录树 或者 `package.json` 时自动生成的 ，它准确的描述了当前项目 npm 包的依赖树🌳，并且在随后的安装中会根据 `package-lock.json` 来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

> 它的产生就是来对整个依赖树🌳进行版本固定的（锁死）。

当我们在一个项目中 `npm install` 时候，会自动生成一个 `package-lock.json` 文件, 和 `package.json` 在同一级目录下。`package-lock.json` 记录了项目的一些信息和所依赖的模块。这样在每次安装都会出现相同的结果. 不管你在什么机器上面或什么时候安装。

当我们下次再 `npm install` 时候，npm 发现如果项目中有 `package-lock.json` 文件，会根据 `package-lock.json` 里的内容来处理和安装依赖而不再根据 `package.json`。

> 注意，使用 `cnpm install` 时候，并不会生成 `package-lock.json` 文件，也不会根据 `package-lock.json` 来安装依赖包，还是会使用 `package.json` 来安装。

`package-lock.json` 的生成逻辑是为了能够精准的反映出我们 node_modules 的结构，并保证能够这种结构被还原。


## package-lock.json 可能被意外更改的原因

#### 1. package.json 文件修改了

当你手动将 `package.json` 中的 vue 版本由 `^2.6.0` 改成 `^2.6.14`, 然后再执行 `npm install` 的时候，此时安装的却是最新的 `2.7.16`，`package-lock.json` 也修改成 vue2.7.16
#### 2. 挪动了包的位置
将部分包的位置从 dependencies 移动到 devDependencies 这种操作，虽然包未变，但是也会影响 `package-lock.json`，会将部分包的 dev 字段设置为 true
#### 3. registry 的影响
当安装所有依赖时，就算版本一样，安装源 registry 不同，执行 `npm install` 时也会修改 `package-lock.json`

## 总结

1. package.json 用于告诉 npm 项目运行需要哪些包, 但包的最终安装的版本不能够只依靠这个文件进行识别, 还需以 package-lock.json 为准

2. package.json 中修改版本号会影响 package-lock.json, 为了保证该项目的环境依赖一致, **在项目移动时需要同时复制 package.json 和 package.lock.json 两个文件
不要轻易改动 package.json 与 package-lock.json， 不要轻易删除 package-lock.json！**


一般情况下 npm install 是可以的，他能保证根据 package-lock.json 还原出开发时的 node_modules。**但是为了防止出现上述提到的意外情况,除非涉及到对包的调整，其他情况下建议使用 npm ci 来安装依赖，会避免异常的修改 package-lock.json.**

> npm ci 依赖 package-lock.json 安装所有依赖，它会删除已有的 node_modules 文件夹，不会去校验已下载文件版本与控制版本的关系，也不用校验是否存在最新版本的库，因此下载速度更快，并且当 package-lock.json 中的依赖与 package.json 不一致时，npm ci 会自动退出但不会修改 package-lock.json!


<comment/>
