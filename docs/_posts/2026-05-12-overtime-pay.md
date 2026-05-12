---
title: 发给那个让你加班的同事
date: 2026-05-12
tags:
  - 工具
  - 杂文
author: 小皮咖
location: 广州
---

大家好，我是小皮咖。昨天晚上赶deadline到11点，肚子饿得咕咕叫，看着钉钉里那个"辛苦了"的表情包，突然想：能不能做个东西，让加班这件事...稍微有趣一点？

于是就有了这个页面。

<!-- more -->

## 先看效果

这个页面有两个模式：

**管理模式**：当你直接打开页面时，会看到左右分栏。左边可以填名字、公司、头像，右边是实时预览。

**预览模式**：点击"复制链接"，把链接发给那个让你加班的同事。他点开只会看到支付页面，完全不知道背后还有个管理端。

## 怎么玩

1. **填信息**：左侧输入框里填上你的名字、公司（或者填他的公司），头像可以上传你的照片。右侧会实时更新预览。
2. **传头像**：点击左侧虚线区域，选一张你最帅/最美的照片，会自动上传到图床，链接会自动填进去。
3. **复制链接**：点击绿色按钮"复制链接"，会自动生成带参数的URL。
4. **发链接**：把链接发给你的同事/老板，配上一句："老板，加班费结一下"。

当同事点开链接，他看到的是：你的头像、亲切的问候、三个档位的套餐...嗯，你懂的。

## 技术实现

### 1. 模式自动切换

原理很简单，就是检查URL里有没有参数：

```javascript
function getMode() {
  const params = getParams();
  const hasValidParam = params.name || params.company || params.image;
  return hasValidParam ? "preview" : "admin";
}
```

- 有参数 = 预览模式（只显示页面）
- 无参数 = 管理模式（左右分栏编辑）

### 2. 实时预览更新

左侧输入的时候，右侧会实时更新。因为每次输入都会触发更新：

```javascript
const inputName = document.getElementById("input-name");
inputName.addEventListener("input", function(e) {
  state.name = e.target.value;
  updatePreview();
});
```

`updatePreview()` 会重新渲染整个右侧预览面板，保证所见即所得。

### 3. 图片上传

图片上传用的是 Fetch API，直接 POST 到图床：

```javascript
async function handleImageUpload(e) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://img.scdn.io/api/v1.php", {
    method: "POST",
    body: formData
  });
  // ...处理响应
}
```

上传期间会显示"上传中..."，失败会有提示，体验还不错。

### 4. 动态时间计算

套餐里的结束时间是根据当前时间动态计算的：

```javascript
function getEndTimes() {
  var now = new Date();

  var time2h = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  var time4h = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  return {
    time2h: formatTime(time2h),
    time4h: formatTime(time4h),
    timeDawn: "04:00"
  };
}
```

最后那个"工作到凌晨"套餐是固定为04:00的，嗯，你知道为什么。

### 5. 链接参数生成

点击"复制链接"时，会自动把当前状态编码到URL里：

```javascript
async function handleCopyLink() {
  const params = new URLSearchParams();
  if (state.name) params.set("name", state.name);
  if (state.company) params.set("company", state.company);
  if (state.image) params.set("image", state.image);

  const url = baseUrl + "?" + params.toString();
  await navigator.clipboard.writeText(url);
}
```

这里用了 `URLSearchParams`，处理编码非常方便。

## 试试看

点击下方链接可以直接打开体验：

[加班费支付工具](/pay.html)

## 结语

这个页面其实是昨天晚上加班时写的，写的时候差点笑出声。当然，加班还是要注意身体，这只是个娱乐项目，大家别当真！

如果觉得有意思，欢迎去我的博客逛逛：https://www.suporka.site/

资源站也有很多好东西：https://resource.suporka.site/

<tongji/>

<comment/>
