---
title: typescript 配置文件 tsconfig.json 详解
date: 2024-4-16
tags:
  - typescript
  - 前端
  - IT技术
author: 小皮咖
location: 广州
---

tsconfig.json 是用来配置 TypeScript 编译选项的，通常位于项目的根目录位置。

我们可以用 ts 提供的 tsc 命令行工具生成配置文件，执行 `tsc --init`。

它会生成一堆默认设置如下：

```
Created a new tsconfig.json with:
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig
```

<!-- more -->

<tongji/>

## 顶层配置

首先我们看配置最上层级的配置字段。

- compilerOptions：编译器相关的选项。
- files：指定需要被编译的文件列表。
- include：指定需要编译的文件列表或匹配模式。include 可以通过通配符指定目录，如 `src/**/**` 表示 src 下的所有文件。
- exclude：排除掉一些文件。默认值为 `node_modules,bower_componen`；
- extends：继承另一个 ts 配置文件。用法示例：`"extends": "./common-tsconfig.json"`。
- reference：引用。添加引用可以利用已经编译好的核心库和工具库，加快编译速度

## 编译器配置 compilerOptions

下面是一些常用的编译配置！

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": true, // 是否只生成类型声明文件
    "declaration": true, // 是否为每个脚本生成类型声明文件.d.ts
    "declarationDir": "./types", // declarationDir设置生成的.d.ts文件所在的目录
    "baseUrl": ".", // 指定 TypeScript 项目的基准目录。
    // 描述项目需要加载的 TypeScript 内置类型描述文件
    "lib": ["esnext","dom", "DOM.Iterable"], 
    "paths": { // 设置模块名和模块路径的映射
      // 映射列表
      "@/*": [
        "src/*"
      ]
    },
    // allowSyntheticDefaultImports允许import命令默认加载没有default输出的模块。
    "allowSyntheticDefaultImports": true,
    "target": "ESNext", // 指定编译的目标版本。
    "module": "commonjs", // 指定生成的模块系统
    "strict": true, // 启用所有严格类型检查选项
    "esModuleInterop": true, // 启用ES模块互操作
    "skipLibCheck": true, // 跳过对库文件的类型检查
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./src", // 指定根目录，用于确定TypeScript输入文件的相对位置
    "removeComments": true, // 删除注释
    "noImplicitAny": false, // 禁用隐式any类型
    "sourceMap": true, // 生成相应的.map文件
    "experimentalDecorators": true, // 允许使用实验性的装饰器特性
    "resolveJsonModule": true, // 是否允许 import 命令导入 JSON 文件
    "emitDecoratorMetadata": true // 为装饰器生成元数据
  }
}
```

一般来说我们不会利用 tsc 做一些打包构建操作，而会使用像 rollup webpack esbuild 等打包工具，所以像 outDir 、outFile 的配置基本没啥用。

我们更多的使用 tsc 来生成类型声明文件，只要 `types/**` 文件夹下的东西，因此设置 `emitDeclarationOnly` 为 `true` 即可。😄
<comment/>
