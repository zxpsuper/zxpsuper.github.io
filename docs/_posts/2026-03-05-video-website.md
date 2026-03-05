---
title: 一些好用的视频网站推荐
date: 2026-03-05
tags:
  - 杂文
  - 工具
author: 小皮咖
location: 广州
---

个人收藏的视频观看网址，方便自己观看，也分享给大家。

<!-- more -->

<ol>
<li class="video-list" v-for="item in website" :key="item.name" style="margin-bottom: 16px">
    <div class="video-item">
        <div class="video-name">{{ item.name }}</div>
        <div class="video-description">{{ item.description }}</div>
        <a :href="item.url" target="_blank">
            {{ item.url }}
        </a>
    </div>
</li>
</ol>

<tongji/>

<comment/>

<script>
import { getCalendarData } from '../.vuepress/utils/lunar'
const 天干 = '甲乙丙丁戊己庚辛壬癸'   
const 地支 = '子丑寅卯辰巳午未申酉戌亥'
const 生肖 = '鼠牛虎兔龙蛇马羊猴鸡狗猪'

export default {
    data() {
        return {
            website: [
                        {
                            "name": "注视影视",
                            "url": "https://gaze.run/",
                            "description": "无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/4/14",
                            "active": true
                        },
                        {
                            "name": "FreeOK",
                            "url": "https://www.freeok.one",
                            "description": "新的同名站点，目测无广告",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "网飞猫",
                            "url": "https://www.ncat24.com/",
                            "description": "无广告，注意4K线路要下载app，推荐网页使用其它线路观看",
                            "created_at": "",
                            "updated_at": "2026/2/24",
                            "active": true
                        },
                        {
                            "name": "03影院",
                            "url": "https://www.03yy.live/",
                            "description": "移动端有广告",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "蛋蛋鸡",
                            "url": "https://www.dandanji.cc/",
                            "description": "目前限制仅手机访问，无广告",
                            "created_at": "",
                            "updated_at": "2025/7/1",
                            "active": true
                        },
                        {
                            "name": "耐看点播",
                            "url": "https://www.nkdvd.me/",
                            "description": "仅限手机访问，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "NO视频",
                            "url": "https://www.novipnoad.net/",
                            "description": "海外剧丰富，视频清晰，有弹幕，有广告",
                            "created_at": "",
                            "updated_at": "2023/7/1",
                            "active": true
                        },
                        {
                            "name": "LIBVIO影视",
                            "url": "https://www.libvio.site/",
                            "description": "有广告，海外剧丰富，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "4k影视",
                            "url": "https://www.4kvm.tv/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "蛋蛋鱼",
                            "url": "https://dandanyu.cc/",
                            "description": "有广告",
                            "created_at": "",
                            "updated_at": "2025/11/23",
                            "active": true
                        },
                        {
                            "name": "播剧网",
                            "url": "https://www.ysxq.cc/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "拖布影视",
                            "url": "https://www.rainvi.com/",
                            "description": "移动端有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/5/9",
                            "active": true
                        },
                        {
                            "name": "磁力熊",
                            "url": "https://www.cilixiong.org/",
                            "description": "微量广告，视频清晰，主要是提供磁力下载",
                            "created_at": "",
                            "updated_at": "2025/2/24",
                            "active": true
                        },
                        {
                            "name": "喵TV",
                            "url": "https://miaotv.net/",
                            "description": "原旋风视频，无广告，感谢",
                            "created_at": "",
                            "updated_at": "2026/2/14",
                            "active": true
                        },
                        {
                            "name": "飞流视频",
                            "url": "https://www.flixflop.com/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/8/11",
                            "active": true
                        },
                        {
                            "name": "厂长资源",
                            "url": "https://www.czzymovie.com/",
                            "description": "视频清晰，资源丰富，有广告",
                            "created_at": "",
                            "updated_at": "2026/2/3",
                            "active": true
                        },
                        {
                            "name": "大米星球",
                            "url": "https://www.dmj1w9l4m6.shop/",
                            "description": "有广告，视频清晰，资源丰富",
                            "created_at": "",
                            "updated_at": "2026/2/14",
                            "active": true
                        },
                        {
                            "name": "外剧迷",
                            "url": "https://www.waijumi.cc/",
                            "description": "移动端有广告，清晰度中等，主要是海外影视剧",
                            "created_at": "",
                            "updated_at": "2026/2/23",
                            "active": true
                        },
                        {
                            "name": "Vidhub",
                            "url": "https://vidhub3.top/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2024/12/18",
                            "active": true
                        },
                        {
                            "name": "69美剧",
                            "url": "https://v.69mj.com/",
                            "description": "视频清晰，视频加载不出可以尝试刷新页面",
                            "created_at": "",
                            "updated_at": "2025/9/18",
                            "active": true
                        },
                        {
                            "name": "奈飞工厂",
                            "url": "https://www.netflixgc.org/",
                            "description": "视频清晰无广告",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        }
                    ]
        }
    },
    methods: {
    }
}
</script>

<style>
    .el-date-picker table {
        display: table;
    }
    .video-description {
        font-size: 14px;
        color: #999;
    }
</style>
