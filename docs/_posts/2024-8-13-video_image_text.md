---
title: 字幕截图生成器
date: 2024-8-13
tags:
  - 前端
  - IT技术
author: 小皮咖
location: 广州
---

昨天刷知乎的时候看到一个问题[「假如一辈子不结婚会怎样？」](https://www.zhihu.com/question/660952558/answer/3565035895)

其中有个回答使用罗翔老师的视频采访字幕拼接截图的形式获得了高赞，看完之后还感觉挺有道理，结果翻开评论一堆人在说图是制作的，罗翔没有说过这些话。

感觉蛮有意思的，今天就来试试实现一个**字幕截图生成器**😄！

<!-- more -->
<tongji/>

## Demo

<el-row style="margin-top: 16px" :gutter="20">
<el-col :span="8">
<div class="flex y-center">
字号：
<el-slider v-model="fontSize" :min="12" :max="60" class="flex1" size="mini" @change="createImage"></el-slider>
</div>
<div class="flex y-center">
行高：
<el-slider v-model="lineHeight" :min="24" :max="120" class="flex1" size="mini" @change="createImage"></el-slider>
</div>
<div class="flex y-center  mb-16">
名人：
<el-select v-model="people" placeholder="请选择名人" size="mini" class="flex1" @change="createImage">
<el-option
  v-for="item in options"
  :key="item.value"
  :label="item.label"
  :value="item.value">
</el-option>
</el-select>
</div>
<el-input
  type="textarea"
  :rows="8"
  :placeholder="placeholder"
  @change="createImage"
  class="mb-16"
  v-model="textarea">
</el-input>
<button class="button" @click="downloadFile">
<span class="button-content">下载图片</span>
</button>
<button size="mini" @click="uploadFile" class="upload">
上传图片
</button>
</el-col>
<el-col :span="16">
<canvas style="width: 420px" id="canvas"></canvas>
</el-col>
</el-row>

## 实现原理

原理也很简单，画布根据图片宽高和文案行数计算出总画布总高度，然后便是一行一行画背景和文字。

首行背景图全高，后续行数只需要画那一行的背景图片即可！

实现比较简单，主要是好玩哈哈哈 😄！！好玩点个赞呗！👍

<comment/>

<script>
  import { downloadImageByUrl, selectSingleFile, getBlobURL } from '../.vuepress/utils/index'
  export default {
    data() {
      return {
        placeholder: '巷子里的猫很自由\n却没有归宿\n围墙里的狗有归宿\n却终身都得低头\n人生这道选择题怎么选都会有遗憾\n人总以为自己没走过的路上开满了鲜花',
        fontSize: 40,
        lineHeight: 80,
        textarea: '',
        options: [
          {value: '/images/郭德纲.jpg', label: '郭德纲'}, 
          {value: '/images/罗永浩.jpg', label: '罗永浩'}, 
          {value: '/images/罗翔.webp', label: '罗翔'}, 
          {value: '/images/马斯克.webp', label: '马斯克'}, 
        ],
        people: '/images/罗翔.webp'
      }
    },
    mounted() {
      this.createImage()
    },
    methods: {
      downloadFile() {
        const canvas = document.getElementById('canvas');
        const url = canvas.toDataURL()
        downloadImageByUrl(url, '小皮咖.png')
      },
      async uploadFile() {
        const file = await selectSingleFile('.png,.jpg,.webp,.jpeg')
        this.people = getBlobURL(file)
        this.createImage()
      },
      createImage() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const canvasWidth = 840;
        canvas.width = canvasWidth;
        let image = new Image();
        image.onload = () => {
          const scaleFactor = canvasWidth / image.width;
          const scaledHeight = image.height * scaleFactor;
          const lineHeight = this.lineHeight
          const fontSize = this.fontSize
          const imageLineHeight = lineHeight / scaleFactor;
          const value = this.textarea || this.placeholder;
          const lines = value.split('\n');
          canvas.width = canvasWidth;
          canvas.height = scaledHeight;
          if (lines.length > 1) {
              canvas.height += (lines.length - 1) * lineHeight;
          }
          ctx.drawImage(image, 0, 0, canvas.width, scaledHeight);
          ctx.font = fontSize+'px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 5;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          for (let i = 0; i < lines.length; i++) {
              if (i > 0) {
                  const sx = 0, sy = image.height - imageLineHeight, sw = image.width, sh = imageLineHeight;
                  const dx = 0, dy = scaledHeight + (i-1)*lineHeight, dw = canvas.width, dh = lineHeight;
                  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
              }
              const y = scaledHeight + i * lineHeight - (lineHeight - fontSize) / 2;
              ctx.fillText(lines[i], canvas.width / 2, y);
          }
          ctx.font = '24px Arial';
          ctx.fillStyle = '#cccccc';
          ctx.textAlign = 'right';
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          ctx.fillText('@小皮咖', canvas.width - 20, 40);
        }
        image.src = this.people
      }
    }
  }
</script>
<style scoped>
.button {
  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;
}

.button:hover::before {
  transform: scaleX(1);
}

.button-content {
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  transition: all 0.475s;
}

.upload,
.upload:focus {
  margin-top: 16px;
  font-size: 17px;
  padding: 10px 25px;
  border-radius: 0.7rem;
  background-image: linear-gradient(rgb(214, 202, 254), rgb(158, 129, 254));
  border: 2px solid rgb(50, 50, 50);
  border-bottom: 5px solid rgb(50, 50, 50);
  box-shadow: 0px 1px 6px 0px rgb(158, 129, 254);
  transform: translate(0, -3px);
  cursor: pointer;
  transition: 0.2s;
  transition-timing-function: linear;
}

.upload:active {
  transform: translate(0, 0);
  border-bottom: 2px solid rgb(50, 50, 50);
}
</style>
