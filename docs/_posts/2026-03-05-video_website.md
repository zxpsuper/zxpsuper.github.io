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

## 视频网址

<div style="margin-top: 16px; " class="video-wrapper">
<div class="video-list" v-for="item in website" :key="item.name" style="margin-bottom: 16px" @click="openWebsite(item.url)">
    <div class="video-item">
        <div class="video-name">{{ item.name }}</div>
        <div class="video-description">{{ item.description }}</div>
        <a :href="item.url" target="_blank">
            {{ item.url }}
        </a>
    </div>
</div>
</div>

## 动漫网址

<div style="margin-top: 16px; " class="video-wrapper">
<div class="video-list" v-for="item in dongman" :key="item.name" style="margin-bottom: 16px" @click="openWebsite(item.url)">
    <div class="video-item">
        <div class="video-name">{{ item.name }}</div>
        <div class="video-description">{{ item.description }}</div>
        <a :href="item.url" target="_blank">
            {{ item.url }}
        </a>
    </div>
</div>
</div>

<tongji/>

<comment/>

<script>

export default {
    data() {
        return {
            dongman: [
                        {
                            "name": "次元方舟😁",
                            "url": "https://www.cyfz.vip/",
                            "description": "无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/9/1",
                            "active": true
                        },
                        {
                            "name": "打驴动漫🤔",
                            "url": "https://www.dalvdm.cc/",
                            "description": "无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2025/7/1",
                            "active": true
                        },
                        {
                            "name": "Animoe动漫😾",
                            "url": "https://animoe.org/",
                            "description": "无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/11/3",
                            "active": true
                        },
                        {
                            "name": "ANIME7😏",
                            "url": "https://anime7.top/",
                            "description": "无广告",
                            "created_at": "",
                            "updated_at": "2025/5/18",
                            "active": true
                        },
                        {
                            "name": "囧次元👀",
                            "url": "https://www.jcydmz.com/",
                            "description": "原漫次元，无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2025/9/18",
                            "active": true
                        },
                        {
                            "name": "风铃动漫⏰",
                            "url": "https://www.aafun.cc/",
                            "description": "无广告，但有些资源需要注册登录",
                            "created_at": "",
                            "updated_at": "2024/11/20",
                            "active": true
                        },
                        {
                            "name": "次元城动画🏣",
                            "url": "https://www.cycani.org/",
                            "description": "轻微广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/2/17",
                            "active": true
                        },
                        {
                            "name": "番薯动漫🥔",
                            "url": "https://www.fsdm02.com/",
                            "description": "轻微广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2024/6/29",
                            "active": true
                        },
                        {
                            "name": "喵物次元😻",
                            "url": "https://www.mwcy.net/",
                            "description": "有广告",
                            "created_at": "",
                            "updated_at": "2024/11/8",
                            "active": true
                        },
                        {
                            "name": "稀饭动漫🍚",
                            "url": "https://dm.xifanacg.com/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2025/8/9",
                            "active": true
                        },
                        {
                            "name": "动漫巴士🚙",
                            "url": "https://dmbus.cc/",
                            "description": "有广告，视频高清",
                            "created_at": "",
                            "updated_at": "2025/11/23",
                            "active": true
                        },
                        {
                            "name": "girigiri爱动漫👧",
                            "url": "https://bgm.girigirilove.com/",
                            "description": "少量广告，视频清晰",
                            "noReferrer": true,
                            "created_at": "",
                            "updated_at": "2023/4/20",
                            "active": true
                        },
                        {
                            "name": "咕咕番🤶",
                            "url": "https://www.gugu3.com/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2024/9/14",
                            "active": true
                        },
                        {
                            "name": "嘶哩嘶哩🕵️‍♀️",
                            "url": "https://www.silisilifun.com/",
                            "description": "注意，在网站内的搜索框中输入“silisilinb”等待页面跳转，有广告，视频清晰，提供下载源，PC模式访问有弹幕",
                            "created_at": "",
                            "updated_at": "2025/8/2",
                            "active": true
                        },
                        {
                            "name": "橘子动漫🍊",
                            "url": "https://www.jzacg.com/",
                            "description": "有广告，视频高清，但需要邮箱注册登录下才能看，不过你可以使用一次性的[匿名邮箱](https://temp-mail.org/zh/) 。",
                            "created_at": "",
                            "updated_at": "2025/3/16",
                            "active": true
                        },
                        {
                            "name": "去看吧动漫😶",
                            "url": "https://11kt.net/",
                            "description": "有广告，画质清晰",
                            "created_at": "",
                            "updated_at": "2025/5/23",
                            "active": true
                        },
                        {
                            "name": "西瓜卡通🍉",
                            "url": "https://cn.xgcartoon.com/",
                            "description": "有广告，需要手动在播放器中设置1080P画质，有视频缩略图，部分地区存在被拦截无法正常访问现象",
                            "created_at": "",
                            "updated_at": "2024/8/11",
                            "active": true
                        },
                        {
                            "name": "XDM动漫👨‍👩‍👧‍👦",
                            "url": "https://www.xuandm.com/",
                            "description": "有广告，如遇异常，尝试切换资源",
                            "created_at": "",
                            "updated_at": "2023/12/21",
                            "active": true
                        },
                        {
                            "name": "路漫漫动漫🏳",
                            "url": "https://www.lmm85.com/",
                            "description": "视频高清，移动端有广告，视频中间部分可能存在博彩广告",
                            "created_at": "",
                            "updated_at": "2026/2/14",
                            "active": true
                        },
                        {
                            "name": "五弹幕动漫🥞",
                            "url": "https://www.5dm.link/",
                            "description": "有广告，视频清晰，部分动漫可能无法观看，请勿登录，因为注册可能要收费，视频加载稍慢，请等待。",
                            "created_at": "",
                            "updated_at": "2023/12/13",
                            "active": true
                        },
                        {
                            "name": "AGE动漫🍳",
                            "url": "https://www.agedm.io/",
                            "description": "经典动漫站点，有广告",
                            "created_at": "",
                            "updated_at": "2025/9/18",
                            "active": true
                        },
                        {
                            "name": "樱花动漫🌺",
                            "url": "https://www.xdm6.com/",
                            "description": "有广告",
                            "created_at": "",
                            "updated_at": "2024/12/9",
                            "active": true
                        },
                        {
                            "name": "Anime1动漫🍜",
                            "url": "https://anime1.me/",
                            "description": "有广告，画质中等",
                            "created_at": "",
                            "updated_at": "2022/3/17",
                            "active": true
                        }
                        ],
            website: [
                        {
                            "name": "注视影视🙄",
                            "url": "https://gaze.run/",
                            "description": "无广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/4/14",
                            "active": true
                        },
                        {
                            "name": "FreeOK👌",
                            "url": "https://www.freeok.one",
                            "description": "新的同名站点，目测无广告",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "网飞猫🐹",
                            "url": "https://www.ncat24.com/",
                            "description": "无广告，注意4K线路要下载app，推荐网页使用其它线路观看",
                            "created_at": "",
                            "updated_at": "2026/2/24",
                            "active": true
                        },
                        {
                            "name": "03影院🏠",
                            "url": "https://www.03yy.live/",
                            "description": "移动端有广告",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "蛋蛋鸡🐔",
                            "url": "https://www.dandanji.cc/",
                            "description": "目前限制仅手机访问，无广告",
                            "created_at": "",
                            "updated_at": "2025/7/1",
                            "active": true
                        },
                        {
                            "name": "耐看点播🥱",
                            "url": "https://www.nkdvd.me/",
                            "description": "仅限手机访问，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "NO视频🤩",
                            "url": "https://www.novipnoad.net/",
                            "description": "海外剧丰富，视频清晰，有弹幕，有广告",
                            "created_at": "",
                            "updated_at": "2023/7/1",
                            "active": true
                        },
                        {
                            "name": "LIBVIO影视🤡",
                            "url": "https://www.libvio.site/",
                            "description": "有广告，海外剧丰富，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "4k影视😬",
                            "url": "https://www.4kvm.tv/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "蛋蛋鱼🐬",
                            "url": "https://dandanyu.cc/",
                            "description": "有广告",
                            "created_at": "",
                            "updated_at": "2025/11/23",
                            "active": true
                        },
                        {
                            "name": "播剧网🥟",
                            "url": "https://www.ysxq.cc/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2026/1/7",
                            "active": true
                        },
                        {
                            "name": "拖布影视🍚",
                            "url": "https://www.rainvi.com/",
                            "description": "移动端有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/5/9",
                            "active": true
                        },
                        {
                            "name": "磁力熊🐻",
                            "url": "https://www.cilixiong.org/",
                            "description": "微量广告，视频清晰，主要是提供磁力下载",
                            "created_at": "",
                            "updated_at": "2025/2/24",
                            "active": true
                        },
                        {
                            "name": "喵TV🦁",
                            "url": "https://miaotv.net/",
                            "description": "原旋风视频，无广告，感谢",
                            "created_at": "",
                            "updated_at": "2026/2/14",
                            "active": true
                        },
                        {
                            "name": "飞流视频🕊",
                            "url": "https://www.flixflop.com/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2023/8/11",
                            "active": true
                        },
                        {
                            "name": "厂长资源💎",
                            "url": "https://www.czzymovie.com/",
                            "description": "视频清晰，资源丰富，有广告",
                            "created_at": "",
                            "updated_at": "2026/2/3",
                            "active": true
                        },
                        {
                            "name": "大米星球🎇",
                            "url": "https://www.dmj1w9l4m6.shop/",
                            "description": "有广告，视频清晰，资源丰富",
                            "created_at": "",
                            "updated_at": "2026/2/14",
                            "active": true
                        },
                        {
                            "name": "外剧迷🎞",
                            "url": "https://www.waijumi.cc/",
                            "description": "移动端有广告，清晰度中等，主要是海外影视剧",
                            "created_at": "",
                            "updated_at": "2026/2/23",
                            "active": true
                        },
                        {
                            "name": "Vidhub👓",
                            "url": "https://vidhub3.top/",
                            "description": "有广告，视频清晰",
                            "created_at": "",
                            "updated_at": "2024/12/18",
                            "active": true
                        },
                        {
                            "name": "69美剧🎫",
                            "url": "https://v.69mj.com/",
                            "description": "视频清晰，视频加载不出可以尝试刷新页面",
                            "created_at": "",
                            "updated_at": "2025/9/18",
                            "active": true
                        },
                        {
                            "name": "奈飞工厂✒",
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
        openWebsite(url) {
            window.open(url, '_blank')
        }
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
    .video-wrapper {
        display: grid;
        -webkit-box-pack: center;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, 165px);
        margin-bottom: 20px;
        gap: 12px;
    }
    .video-name {
        color: rgb(102, 102, 102);
        font-weight: 600;
        font-size: 20px;
        height: 40px;
        margin-bottom: 6px;
        text-align: center;
        display: flex;
        flex-direction: row;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
    }

    .video-description {
        font-size: 12px;
        height: 34px;
        line-height: 17px;
        color: rgb(102, 102, 102);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-bottom: 9px;
    }
    .video-item {
        align-self: center;
        flex-shrink: 1;
        background: rgb(255, 255, 255);
        box-shadow: rgba(163, 177, 191, 0.35) 0px 8px 24px;
        border-radius: 10px;
        -webkit-box-align: center;
        align-items: center;
        width: 165px;
        height: 180px;
        cursor: pointer;
        padding: 20px 12px 0px;
        box-sizing: border-box;
        transition: transform 0.4s;
        overflow: hidden;
    }
    .video-item:hover {
        transform: scale(1.1)
    }
</style>
