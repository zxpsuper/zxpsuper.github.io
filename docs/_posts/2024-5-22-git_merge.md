---
title: Git merge 与 rebase 的区别
date: 2024-5-22
tags:
  - git
  - IT技术
author: 小皮咖
location: 广州
---

之前公司项目分支合并基本都使用 git merge , 久而久之发现有一些代码合并缺漏的问题。

git merge 会产生一个多余的 commit, 并且这个 commit　在文件的　commit 历史的找不到的，这样导致代码遗漏缺失很难溯源。

后来在一篇知乎问答「 [Git commits历史是如何做到如此清爽的？](https://www.zhihu.com/question/61283395)」下面看到尤雨溪的回答：**多用 rebase!**

那么 merge 和 rebase 究竟有什么区别呢 ？rebase能解决什么问题？

<!-- more -->


**1. 首先我们看一个 *`git merge`* 例子：**

我们在 master 分支初始化一个commit

`git commit -m 'init'`, 此时 commit ID 为 `640d9a77271d614eeb826b1b53b3a1419e73c0cd`

```js
console.log('init') 
```
接着创建 test 分支 `git checkout -b test`，并新增一个 commit 'test'

`git commit -m 'test'`, 此时 commit ID 为 `278ba9e59aa83d706017f32f6c64260c815fc638`

```js
console.log('init')
console.log('test') 
```
再者回到 master `git checkout master` 新增一个 commit 'master'

`git commit -m 'master'`, 此时 commit ID 为 `065a9a2480a024ceef7dca3ecc7856c299377141`
```js
console.log('init')
console.log('master')
```
再将 test 分支合并到 master, 就会出现冲突

```js
// git merge test
console.log('init')
<<<<<<< HEAD
console.log('master')
=======
console.log('test')
>>>>>>> test
```
此时我们保留 master 的变动, 并添加一句注释 `use master`,再用编辑器默认 message 提交 commit

```js
console.log('init')
// use master
console.log('master')
```

此时 master 分支的 git 记录如下：

```bash
commit 89a68f5acd87e5de3e0ff38cd146fefef1f256d0 (HEAD -> master)
Merge: 065a9a2 278ba9e
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 10:49:37 2024 +0800

    Merge branch 'test'

commit 065a9a2480a024ceef7dca3ecc7856c299377141
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 10:45:56 2024 +0800

    master

commit 278ba9e59aa83d706017f32f6c64260c815fc638 (test)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 10:45:35 2024 +0800

    test

commit 640d9a77271d614eeb826b1b53b3a1419e73c0cd
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 10:45:15 2024 +0800

    init
```

和之前的 commit ID 对比我们发现，commit ID 没有变化，并按照时间顺序排列，并且 merge 还会新增一个“无效”commit, merge 的好处是：**提交历史记录清晰，便于溯源。**

**2. 我们再来看 *`git rebase`* 的例子**

和上述同样的操作，只不过这次我们是将 master 合进 test 分支, 在test分支上执行 `git rebase master`

test 分支合并前的记录如下：
```bash
commit cb5de32691465d8e8ef188d4fa576637d883a03b (HEAD -> test)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 11:42:14 2024 +0800

    test

commit 1557ff20f62592f028e66ac33a11cb5e24af02d2 (t)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 11:41:04 2024 +0800

    init
```

test 分支合并后的记录如下：

```bash
commit 5cf3442b8e9c30f202cf21edb4352ac3d7d59775 (HEAD -> test)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 11:42:14 2024 +0800

    test

commit 9148a21b44db2aef8708804003c25c591a23fcbc (master)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 11:42:33 2024 +0800

    master

commit 1557ff20f62592f028e66ac33a11cb5e24af02d2 (t)
Author: xiaopika <zxpscau@163.com>
Date:   Wed May 22 11:41:04 2024 +0800

    init
```

观察前后两个记录你会发现，test 这个 commit 时间人物没有变，但是顺序和 id 都变了

总的来说就是 rebase 会删除你本地分支原来的 commit, 合并主分支后又生成原来的 commit, 但顺序和 id 变化了

![](/images/commit-01.png)

总的来说，merge 和 rebase 这两者哪种操作更好，这是取决于不同的场景的。

- 当我们拉取公共分支最新代码的时候建议使用 rebase，也就是 `git pull -r` 或 `git pull --rebase`，这样不会生成多余 commit;
- 当我们功能分支合并公共分支的时候建议用 `git rebase [branch]`，让我们的 commit 处于最前方且不会有多余的 commit。
- 当我们往公共分支上合代码的时候，使用 merge 合并可以使提交历史记录清晰，便于溯源。


<tongji/>

<comment/>
