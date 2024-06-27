---
title: 颜色选择器原理
date: 2024-6-13
tags:
  - 前端
author: 小皮咖
location: 广州
---

前端开发最常见的颜色模型🎨就是 RGB，即红绿蓝三基色模型，而前端浏览器能支持颜色显示的颜色模型只有两种：RGB 和 HSL。

其中，RGB 模型是以三色的值在 0-255 以内的范围内，混合成一种颜色，对机器较友好，但并不太适合❌人直观的进行颜色选择。

所以，通常的颜色选择器一般会使用另外两种更面向视觉感知的模型：HSV 和 HSL。

<!-- more -->
<tongji/>

## 那么，什么是 HSV、HSL？

HSV 是基于 **色相 H(hue)、饱和度 S(saturation)、明度 V(Value)** 组合的模型；

HSL 是基于 **色相 H(hue)、饱和度 S(saturation)、亮度 L(lightness)** 组合的模型；

两者是最后一个单位的区别，其中饱和度和明亮度的值均为百分数。

色相是以六大主色为基础，分别按 60 度的间隔排列在圆环上。

这六大主色分别是：0° 红、60° 黄、120° 绿、180° 青、240° 蓝、300° 洋红、360° 红。

换算成百分比就是：0%红、17%黄、33%绿、50%青、66%蓝、83%洋红、100%红。

我们来实现一个色相条，代码如下：

```html
<div id="colorBar" class="color-bar"></div>
<style>
  .color-bar {
    background: linear-gradient(
      to right,
      #f00,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      #f00
    );
    width: 200px;
    height: 20px;
  }
</style>
```

**效果如下：**

<div ref="colorBar" class="color-bar" v-on:click="handleMouseMove"></div>

根据**鼠标点击上述色相条位置**👆计算比例值，当前色相值为：{{hue}}，对应比例为： {{ hueRatio }}%

<br>

## 饱和度和明亮度

除了色相条以外，我们还需要设定一个基于饱和度和明亮度的颜色面板。

以当前的色相颜色为红色（**h=0,s=1,v=1**）为例！

HSV 在面板上的具体体现为：

- 从左到右设置饱和度，可在白色上设置从左至右的透明度变化，即最左边白色，到最右边的完全透明，线性渐变；
- 从下到上设置**明度**，可在黑色上设置从下到上的透明度变化，即最下边黑色，到最上边的完全透明，线性渐变。

HSL 在面板上的具体体现为：

- 从左到右设置饱和度，可在灰色上设置从左至右的透明度变化，即最左边灰色`rgb(128,128,128)`，到最右边的完全透明，线性渐变；
- 从下到上设置**亮度**，颜色从纯黑到透明再到纯白，线性渐变。

<div class="card">
  <div>
    <div class="hsv"></div>
    <div>hsv 面板</div>
  </div>
  <div>
    <div class="hsl"></div>
    <div>hsl 面板</div>
  </div>
</div>

```css
.hsv {
  width: 200px;
  height: 150px;
  margin-right: 16px;
  background-color: rgb(255, 0, 0);
  background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent),
    linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
}
.hsl {
  width: 200px;
  height: 150px;
  background-color: rgb(255, 0, 0);
  background-image: linear-gradient(
      to bottom,
      rgb(255, 255, 255) 0%,
      transparent 50%,
      transparent 50%,
      rgb(0, 0, 0) 100%
    ), linear-gradient(to right, rgb(128, 128, 128) 0%, transparent 100%);
}
```

## 颜色值计算方式

以 HLV 面板为例，计算鼠标点击位置到左边和底部的距离，分别除以长宽，得出比例值

<div class="flex">
  <div>
    <div ref="colorBar2" class="color-bar" v-on:click="handleMouseMove2" style="width: 200px;margin-bottom: 10px"></div>
    <div class="hsv" ref="hsv" v-on:click="handleHSVMouseMove"></div> 
  </div>
  <div>
    <div>色相值为：{{ hue2 }}</div>
    <div>色相RGB为：{{ backgroundColor }}</div>
    <div>S值为：{{ x }}%</div>
    <div>V值为：{{ y }}%</div>
    <div>目标颜色RGB：{{rgb}} <div style="display: inline-block; width: 20px; height: 20px" v-bind:style="{backgroundColor: rgb}"></div>
    </div>
    <br>
    <b>👈可以点击左边色相条和明亮度面板选择颜色！</b>
  </div>
</div>

下面是 hsv 转化 rgb 的方法：

```js
function hsvToRgb(hue, saturation, value) {
  saturation = Math.round(saturation * 255)
  value = Math.round(value * 255)
  if (saturation === 0) {
    return [value, value, value]
  } else {
    const satVal = Math.round(((255 - saturation) * value) / 255)
    const ligVal = Math.round(((value - satVal) * (hue % 60)) / 60)
    if (hue === 360) {
      return [value, 0, 0]
    } else if (hue < 60) {
      return [value, satVal + ligVal, satVal]
    } else if (hue < 120) {
      return [value - ligVal, value, satVal]
    } else if (hue < 180) {
      return [satVal, value, satVal + ligVal]
    } else if (hue < 240) {
      return [satVal, value - ligVal, value]
    } else if (hue < 300) {
      return [satVal + ligVal, satVal, value]
    } else if (hue < 360) {
      return [value, satVal, value - ligVal]
    } else {
      return [0, 0, 0]
    }
  }
}
```
同样的 HLS 也是基于比例计算后得出颜色值！综上，完成了一个颜色选择器基本雏形！


<comment/>

<script>

export default {
  data() {
    return {
      hueRatio: 0,
      hue2: 0,
      backgroundColor: 'rgb(255, 0, 0)',
      x: 0,
      y: 0,
      rgb: ''
    }
  },
  computed: {
    hue() {
      return Math.round(360 * this.hueRatio / 100)
    }
  },
  methods: {
    handleMouseMove(e) {
      const colorBar = this.$refs.colorBar
      const clientRect = colorBar.getBoundingClientRect()
      let cha = e.clientX - clientRect.left
      if (cha < 0) cha = 0
      else if (cha > clientRect.width) cha = clientRect.width
      this.hueRatio = Math.round(cha / clientRect.width * 100)
    },
    handleMouseMove2(e) {
      const colorBar = this.$refs.colorBar2
      const clientRect = colorBar.getBoundingClientRect()
      let cha = e.clientX - clientRect.left
      if (cha < 0) cha = 0
      else if (cha > clientRect.width) cha = clientRect.width
      this.hue2 = Math.round(360 * Math.round(cha / clientRect.width * 100) / 100)
      this.backgroundColor = this.$refs.hsv.style.backgroundColor = `rgb(${this.hsvToRgb(this.hue2,1,1).join(',')})`
    },
    handleHSVMouseMove(e) {
      const hsv = this.$refs.hsv
      const hsvRect = hsv.getBoundingClientRect()
      this.x = (e.clientX - hsvRect.left) / hsvRect.width * 100 | 0
      this.y = (hsvRect.bottom - e.clientY) / hsvRect.height * 100 | 0
      this.rgb = `rgb(${this.hsvToRgb(this.hue2,this.x / 100,this.y/100).join(',')})`
    },
    hsvToRgb(hue, saturation, value) {
      saturation = saturation * 255 | 0
      value = value * 255 | 0
      if (saturation === 0) {
        return [value, value, value]
      } else {
        const satVal = (255 - saturation) * value / 255 | 0
        const ligVal = (value - satVal) * (hue % 60) / 60 | 0
        if (hue === 360) {
          return [value, 0, 0]
        } else if (hue < 60) {
          return [value, satVal + ligVal, satVal]
        } else if (hue < 120) {
          return [value - ligVal, value, satVal]
        } else if (hue < 180) {
          return [satVal, value, satVal + ligVal]
        } else if (hue < 240) {
          return [satVal, value - ligVal, value]
        } else if (hue < 300) {
          return [satVal + ligVal, satVal, value]
        } else if (hue < 360) {
          return [value, satVal, value - ligVal]
        } else {
          return [0, 0, 0]
        }
      }
    }
  }
}
</script>
<style scoped>
  .flex {
    display: flex;
  }
  .color-bar {
    background: linear-gradient(to right, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00);
    height: 20px;
    cursor: pointer;
  }
  .card {
    display: flex;
    text-align: center;
  }
  .hsv {
    width: 200px;
    height: 150px;
    margin-right: 16px;
    background-color: rgb(255, 0, 0);
    background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
  }
  .hsl {
    width: 200px;
    height: 150px;
    background-color: rgb(255, 0, 0);
    background-image: linear-gradient(to bottom, rgb(255, 255, 255) 0%, transparent 50%, transparent 50%, rgb(0, 0, 0) 100%), linear-gradient(to right, rgb(128, 128, 128) 0%, transparent 100%);
  }
</style>
