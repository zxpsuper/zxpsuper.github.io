---
title: 关于 babel polyfill 那些事
date: 2024-5-16
tags:
  - babel
  - IT技术
  - 前端
author: 小皮咖
location: 广州
---

> `polyfill` 意为“补充物”，它可以在旧版浏览器中模拟新的 API。当新的 API 在旧版浏览器中不可用时，开发人员可以使用 Polyfill 来填充这些缺失的功能。

`babel-polyfill` 为不支持 ES6 或 ES7 新特性的浏览器提供了一些新的 API 和全局对象的实现，以便于在这些浏览器中使用新的 ECMAScript 语法和特性。它主要用于解决浏览器兼容性问题。

`babel-polyfill` 提供了一些常见的 polyfills，如 `Promise、Object.assign、Array.from` 等，这些 polyfills 可以让开发者在使用新特性的同时，不用担心浏览器兼容性问题。

<!-- more -->

## 如何使用

`@babel/polyfill` 需配合 `@babel/preset-env` 一起使用。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false
        // 默认false, 不添加polyfill，'entry' 为全量引入，'usage' 为按需引入
      }
    ]
  ]
}
```

我们先看没有添加 babel 转译后的代码是怎样的：

```js
// 原代码
const a = new Promise(() => {})

// 转译后的代码
'use strict'
var a = new Promise(function () {})
```

可见箭头函数被转译了，而 promise 并没有转译，接下来我们试试全量引入和按需引入

1. 全量引入

全量引入需要修改配置参数 useBuiltIns 为 entry. 并在入口文件顶部导入 @babel/polyfill

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

```js
// 原代码
// 项目入口文件中需要额外引入polyfill
// core-js 2.0中是使用"@babel/polyfill"
// core-js3.0 版本中变化成为 core-js/stable 和 regenerator-runtime/runtime
import '@babel/polyfill'
const a = new Promise(() => {})

// 转译后代码
'use strict';

require('core-js/modules/es6.array.copy-within.js')
require('core-js/modules/es6.array.fill.js')
require('core-js/modules/es6.array.filter.js')
require('core-js/modules/es6.array.find.js')
require('core-js/modules/es6.array.find-index.js')
// ...后面还有十几行

new Promise(function () {})
```

**全量引入的好处是大而全，其缺点也很明显，就是会使打包体积偏大~**


2. 按需引入

修改配置参数 useBuiltIns 为 usage 按需引入，此时不需要在顶部导入 @babel/polyfill 了
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```
```js
'use strict'

require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.promise.js')

new Promise(function () {})
```

**按需引入可见代码少了很多, 但这种也存在污染全局变量的副作用，Promise 已不是原来的 Promise 了**

3. 运行时按需导入

运行时按需导入需要三个库配合实现：`npm i @babel/runtime @babel/runtime-corejs3 @babel/plugin-transform-runtime`

- @babel/runtime 的作用: 将转译的辅助代码从在文件中硬编码方式变为运行时的模块注入方式从而达到在某些条件下（重复代码过多时）缩小编译后的代码体积。

- @babel/runtime 并不包含任何 polyfill 的注入

- 类库的打包如果需要注入 polyfill 的话，最好使用 @babel/transform-runtime，因为它提供了一种不污染全局作用域的方式。

修改 babel 配置：

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
此时我们再看下打包结果：

```js
'use strict';

var _Promise = require('@babel/runtime-corejs3/core-js-stable/promise');

new _Promise(function () {});
```
此时的 promise 变成了 _Promise, 不存在全局污染的情况。


## 总结

在 babel 中实现 polyfill 主要有两种方式：

- 一种是通过 @babel/polyfill 配合 preset-env 全量导入使用，这种方式可能会存在污染全局作用域, 增加很多额外的引入语句，增加包体积。

- 一种是通过 preset-env 配置 `useBuintIns:usage` 按需导入使用，这种方式可能会存在污染全局作用域。

- 一种是通过 @babel/runtime 配合 @babel/plugin-transform-runtime 和 corejs 去使用，这种方式并不会污染作用域。

通常我个人选择是会在开发类库时遵守不污染全局为首先使用 `@babel/plugin-transform-runtime` 而在业务开发中使用 `@babel/polyfill`。

<tongji/>

<comment/>
