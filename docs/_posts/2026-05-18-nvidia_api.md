---
title: NVIDIA 免费 API 接入
date: 2026-05-18
tags: [AI, Nvidia, Claude]
summary: "NVIDIA 悄悄放出了一批免费 API Key，支持 42 个模型，能用一整年。我试了一下接入 Claude Code，配置简单，用起来很丝滑。白嫖党的福音，薅羊毛要趁早。"
---

NVIDIA 官方悄悄放出了一批免费 API Key，支持 MiniMax、Qwen、Gemma 等大模型，而且可以免费使用一年。打开 FreeEndpoint 搜索发现还有 42 个模型可以免费薅羊毛~

![](/images/wechat_1779074772_4898c537.webp)

话不多说，入口在这里

https://build.nvidia.com

## 注册账号

![](/images/wechat_1779074772_00487d95.webp)
注册账号需要邮箱和手机号码，比较简单就不做过多介绍~

## 生成 API key
![](/images/wechat_1779074773_5f91c46b.webp)
![](/images/wechat_1779074773_09130588.webp)
![](/images/wechat_1779074774_6a1d580e.webp)

将生成好的 API Key 保存好！

## 接入 claude code

![](/images/wechat_1779074774_7b635e15.webp)

点击加号添加供应商，然后随便起个名字!

![](/images/wechat_1779074775_3e3601d3.webp)

粘贴你的 API Key，输入请求地址

“https://integrate.api.nvidia.com/v1”

![](/images/wechat_1779074775_e99de438.webp)

API 格式要选择 “OpenAI Chat Completions”, 然后打开本地路由模式，在设置里面开启

![](/images/wechat_1779074776_7a887f0e.webp)

这是因为 OpenAI 和 Anthropic 的格式不一致，需要通过本地代理处理往返格式！

![](/images/wechat_1779074776_c3b075cf.webp)

设置完了在命令行工具打开 claude 即可使用~

![](/images/wechat_1779074776_cabe1c63.webp)![](/images/wechat_1779074777_9555adf3.webp)

上图左边是我用 Nvidia API 优化文章耗时 52s, 右边是我用火山方舟优化文章耗时 35s, 速度上英伟达的会慢一点，但也勉强够用，毕竟免费的还要什么自行车？哈哈~!

趁着免费模型的羊毛还在赶紧薅，过了这村就没这店了，快去试试吧~!


<tongji/>

<comment/>
