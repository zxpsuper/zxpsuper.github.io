---
title: 让你的 git commit 更漂亮
date: 2024-5-22
tags:
  - git
  - IT技术
author: 小皮咖
location: 广州
---

对于 git 工作流，我认为 commit 数要多而有意义，branch 也要多而有意义.

也就是，一个小功能就要开一个分支，一个分支里要有一些有意义的 commit。

好处就是冲突会很少，review 代码速度加快，commit 都是有意义的，而且利于回退。

<!-- more -->

## Commit 结构

一个规范详细的 commit 结构如下：

```
<type>(<scope>): <subject>

<body>

<footer>
```

大致分为三个部分(使用空行分割):

- 标题行: 必填, 描述主要修改类型和内容
- 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
- 页脚注释: 放 Breaking Changes 或 Closed Issues

### Type

其中 type 为 commit 的类型，常见的有：

- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本

### scope

commit 影响的范围, 比如: route, component, utils, build...

### subject

commit 的概述,简要描述，单行显示

### body

commit 具体修改内容, 可以分为多行.（可选）

### footer

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.（可选）

## 约定式提交规范

每个提交都必须使用类型字段前缀，它由一个名词组成，诸如 feat 或 fix ，其后接一个可选的作用域字段，以及一个必要的冒号（英文半角）和空格。

当一个提交为应用或类库实现了新特性时，必须使用 feat 类型。

当一个提交为应用修复了 bug 时，必须使用 fix 类型。

作用域字段可以跟随在类型字段后面。作用域必须是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(login):`

描述字段必须紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如：

```bash
fix(login): 修复登录接口报错问题.
```

在简短描述之后，可以编写更长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。

```bash
fix(login): 修复登录接口报错问题.

登录接口返回数据没有判空，导致出现 undefinded 的问题
```

在正文结束的一个空行之后，可以编写一行或多行脚注。

脚注必须包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。

破坏性变更必须标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更必须包含大写的文本 BREAKING CHANGE，后面紧跟冒号和空格。

在 BREAKING CHANGE: 之后必须提供描述，以描述对 API 的变更。例如： `BREAKING CHANGE: environment variables now take precedence over config files.`

```bash
fix(login): 修复登录接口报错问题.

登录接口返回数据没有判空，导致出现 undefinded 的问题

BREAKING CHANGE：全局环境变量变动. FIX BUG: #13
```

<tongji/>

<comment/>
