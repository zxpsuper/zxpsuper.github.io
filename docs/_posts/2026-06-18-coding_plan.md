---
title: Coding plan 大对比～
date: 2026-06-18
tags: [AI]
summary: "各家 AI Coding Plan 五花八门，额度倍率、TPS、模型选择看得眼花缭乱。花了大量时间对比了 Claude/ChatGPT/Kimi/GLM/MiniMax 等十几个平台的套餐，做了张详细的性价比表格，还整理了旗舰模型的参数量、上下文和硬件需求。结论：免费白嫖 NVIDIA NIM，按量付费选 DeepSeek V4 Flash，团队用 Kimi Code Allegretto 或 GLM Pro，看完这篇不再纠结～"
---

*注：本文不会讨论模型的具体智力水平，只建议使用各家的旗舰模型，且如果有数据安全性要求，不允许数据被用于训练，不建议购买 Coding Plan*


## 📖 术语说明

- **周期**：`5h` = 5小时 | `w` = 周 | `mo` = 月
- **额度倍率**：`当前周期额度 ÷ 包月价格`（认可该模型单位定价的前提下，倍率越高，代表性价比越高）


## 💡 核心选购建议

尽量考虑算力相对充裕的厂商，额度再差也比天天 429 报错强，如果难以忍受 Coding Plan 的 429，可以直接选择 DeepSeek V4 Flash 按用量计费，Token Plan 通常性价比远低于 Coding Plan 一般情况下不推荐（MiniMax 例外）

- 🎁 **个人想免费白嫖: `NVIDIA NIM` (其他 OpenCode/Ollama/OpenRouter Free 模型选择有限)**
  - **特点**：deepseek-v4-pro/glm-5.1/glm-4.7/deepseek-v4-flash/minimax-m2.7 等开源模型，速率限制 Up to 40 rpm 速度无保证，不限量免费使用 [点此直达](https://build.nvidia.com/) 
  - **劣势**：无稳定性保证，首Token时间通常较高，速度因模型而异，部分模型为量化版本，注意甄别，免费不可持续

- 💰 **按用量计费首选：`DeepSeek V4 Flash`**
  - **特点**：在认可该模型效果前提下，性价比最高模型，同等 Token 用量下，DeepSeek V4 Flash 的按量计费比大部分 Coding Plan 都便宜。速度稳定在 50 TPS 以上，1M 上下文，缓存读 1/100 的价格领先业界 1/10 一代，百万 Token 输入 1 元，输出 2 元，1 亿 Token 约 9 元（输入输出比 115:1 情况下）；DeepSeek V4 Pro 相当于 DeepSeek V4 Flash 的三倍价格，也非常划算。
  - **劣势**：不支持多模态
 
- 🇺🇸 **海外版顶级商业模型 Coding ChatGPT Plus/Claude Pro 之外性价比较高的选择：`Ollama Pro` ($20/月)、`OpenCode Go` ($10/月)**
  - **特点**：Ollama Pro 倍率大约为 10，OpenCode Go 倍率大约为 6，含大部分顶级开源模型，值得一试
  - **劣势**：模型和倍率均不如 ChatGPT Plus/Claude Pro
  
- 👥 **团队综合使用推荐：`Kimi Code Allegretto` (￥199/月)**
  - **特点**：支持多模态（图像输入），模型代码能力更优，较高强度的日常开发够用，送专属龙虾，不需要抢
  - **劣势**：¥49 套餐毫无性价比，¥199 套餐倍率也一般，最近算力紧张，TPS 大幅下降，升级 kimi-k2.6 后不太稳定容易死循环（有待观察）,429 错误频繁

- 💻 **团队开发推荐：`GLM Coding Plan Pro` (￥149/月)**
  - **特点**：模型代码能力国内最强
  - **劣势**：GLM 5.1 不支持多模态，¥49 套餐毫无性价比，¥149 套餐倍率也较差，算力紧缺，429 错误频繁，同时也很难抢到

---

## 📊 数据对比

| 厂商                             | 价格(mo)      | 官方说明   | TPS  | 模型请求数/Tokens(5h) | 额度价值(5h)   | 额度倍率(5h) | 模型请求数/Tokens(w) | 额度价值(w)    | 额度倍率(w) | 模型请求数/Tokens(mo) | 💰额度价值(mo)     | ⏫额度倍率(mo)  |
|--------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------|-----------|---------|--------|-----------|--------|--------|-------------|---------|
| [Claude Pro](https://claude.ai/upgrade)   |  $20.00   | 2026-5-6 后 5h 额度翻倍, 5-14 至 7-13 周额度增加 50%  | /    | 411/2298万     |  $18.39   | 0.92    | 1868/1.04亿  |  $83.59  |  4.18  | 7472/4.16亿  |  $334.36       | 16.7   |
| [ChatGPT Plus](https://chatgpt.com/pricing)            |  $20.00 | 45-225 Local Messages* / 5h<br/>US$100 /月 级用户享有双倍 Codex 配额，优惠活动持续至 2026 年 5 月 31 日 | /    | 490/2000万    |  $11.85   | 0.59    | 3062/1.2亿   |  $74   | 3.7   | 12250/4.8亿  |  $296       | 14.8   |
| [Ollama Free](https://ollama.com/pricing) (glm-4.7) |  免费   |   glm-4.7/minimax-m2.7/qwen3.5<br/>预估价值按93%的缓存命中率修正 |  /   |  49/217万   |  $0.38   |  /   |  128/556万  |  $0.99   |  /  |  512/2224万 |    $3.96     |  Ollama Pro $20 大约 10 倍额度  |
| [OpenCode Go](https://opencode.ai/go) |   $10.00 (首月 $5)  | 包含 GLM-5.1, Kimi K2.6, MiMo-V2.5-Pro, DeepSeek V4 Pro, Qwen3.6 Plus 和 MiniMax M2.7 等 | / |   /  |  $12   |  1.2   |  /  |  $30   |  3  |  / |    $60     |  6  |
| [OpenRouter](https://openrouter.ai) |  部分模型限免 50 reqs/day   |  hy3-preview/minimax-m2.5/qwen3-coder 等模型限免  |      |         |           |     |        |           |      |     |             |     |
| [NVIDIA NIM](https://build.nvidia.com) (glm-4.7) |  免费   |   deepseek-v4-pro/glm-5.1/glm-4.7/deepseek-v4-flash/minimax-m2.7 等开源模型 Up to 40 rpm 不限量使用  |      |         |           |     |        |           |      |     |             |     |
| [MiniMax Coding Plan Plus](https://platform.minimaxi.com/subscribe/token-plan) （minimax-m2.7）      |  ￥49.00   | 1500次模型调用 / 5 小时（目前已改套餐，该数据为老数据） | 52.6 | 1360/6000万    |  ￥108.60  | 2.22    | 13600/6亿      | ￥1086         | 22.2     | 54400/24亿   |  ￥4344 |   88.65|
| [Kimi Code Andante](https://www.kimi.com/membership/pricing) （kimi-k2.5）             |  ￥49.00   | Kimi Code 可调用| 27.98| 359/1500万     |  ￥21.46   | 0.44    | 639/2100万    |  ￥30.34   | 0.62   | 2556/8400万   |  ￥121.36    | 2.48    |
| [Kimi Code Allegretto](https://www.kimi.com/membership/pricing)（kimi-k2.5）           |  ￥199.00  | Kimi Code 20 倍额度  |  27.98   |  1307/6500万       |    ￥89.67       |    0.45     | 9073/3.57亿   |  ￥492.00  | 2.47   | 36292/14.28亿  |  ￥1,968.00  | 9.89    |
| [阿里云 Coding Plan Lite 基础套餐](https://www.aliyun.com/benefit/scene/codingplan)（已下线, qwen-3.5-plus） |  ￥40.00   | 每月请求额度至高 18,000 次<br/>最多 1,200 次/每 5 小时<br/>最多 9,000 次/每周<br/>最多 18,000 次/每月 | 52.5 | 1179/4000万    |  ￥52.83   | 1.32    | 8842/3亿   |  ￥396.00  | 9.90   | 17684/6亿  |  ￥792.00    | 19.80   |
| [火山方舟 Coding Plan Lite](https://www.volcengine.com/activity/codingplan)    |  ￥40.00   | 数倍于 Claude Pro plan 的用量 | 86.6 | 148/1000万     |  ￥19.00   | 0.48    | 1138/7500万   |  ￥146.00  | 3.65   | 6275/3.2亿   |  ￥607.00    | 15.18   |
| [GLM Coding Plan Lite](https://bigmodel.cn/glm-coding)（使用海外版订阅测试 glm-5.1）|  ￥49.00   | 3x Claude Pro 用量额度<br/>每 5 小时限额  最多约 80 次 prompts<br/>每周限额 最多约 400 次 prompts |   26.8   |    90/600万     |    ￥11.66       |  0.24   |      600/3200万  |     ￥62.19      |  1.27    |   2400/1.28亿   |       ￥248.76      |   5.08  |
| [GLM Coding Plan Pro](https://bigmodel.cn/glm-coding)（glm-5.1）|  ￥149.00   | 5x Lite 用量额度<br/>最多约 400 次 prompts<br/>最多约 2000 次 prompts |   26.8   |    450/3000万     |    ￥58.3       |  0.39   |      3000/1.6亿  |     ￥310.95      |   2.09   |   12000/6.4亿   |       ￥1243.8      |   8.35  |
| [Fireworks Fire Pass](https://app.fireworks.ai/fire-pass)（kimi-k2.6-turbo）|  $7/w*4   |   with no per-token charges for kimi-k2.6-turbo  |      |         |           |     |        |           |      |     |             |     |
| [Xiaomi MiMo Token Plan Pro](https://platform.xiaomimimo.com/#/token-plan) (mimo-v2.5-pro)|  ￥329.00   | 380亿 Credits 套餐月总量 |   46.7   |         |          |    |        |           |      |   13亿   |      ￥381       |  1.12   |


## AI IDE/Plugin Plan

| 厂商                             | 价格(mo)      | 官方说明   | 备注 | 额度价值(mo)/Tokens     | 额度倍率(mo)  |
|--------------------------------|--------------|------|---------|-----------|---------|
| [Factory Droid Pro](https://factory.ai/pricing) |   $20.00  |   	20 million 	Standard Tokens (10 cached tokens = 1 Standard Token)   |    Usage-based    |     ~$48/~6000万 claude-opus-4.6     |  ~2.4   | 
| [Cursor Pro](https://cursor.com/pricing) |   $20.00  |   $20 of API usage each month<br/>Significantly more included usage when Auto or Composer 2 is selected   |    Usage-based    |      >=$20     |  >=1   | 
| [Windsurf Pro](https://windsurf.com/pricing) |   $20.00 (2 week free trial)  |   plan includes a usage allowance measured as a daily and weekly budget, daily quota is more than 1/7 of your weekly quota<br/>8-101 messages / day for Premium Model<br/>unlimited SWE-1.5      |   Quota-based     |           |     |         
| ⚠️[Kiro Pro](https://kiro.dev/pricing) |   $20.00 (新注册首月免费，退出付款页丢失免费资格) |   1,000 credits<br/>Pay-per-use overage ($0.04/credit)<br/>Get 500 bonus credits usable within 30 days when you first sign up    |    Usage-based    |     $40.00      |   2  | 
| [Augment Code INDIE](https://www.augmentcode.com/pricing) |   $20.00  |   Includes 40,000 credits    |     Usage-based          |  $25.00   |   1.25     |             
| [Qoder Pro](https://qoder.com/pricing) |   $20.00（为期 2 周的 Pro 试用及 300 Credits）  | 2,000 Credits<br/>更多的对话与智能体请求数   |   Usage-based     |          |     |  
| [Antigravity in Google AI Pro](https://antigravity.google/pricing)<br/><br/>[Gemini Code Assist/Gemini CLI in Google AI Pro](https://codeassist.google/)  |   $19.99（Pixel 手机用户免费试用一年  |   **Antigravity**<br/>High, generous quota, refreshed every five hours until weekly limit reached<br/>Higher weekly rate limit<br/>Free: 50 AI credits/d<br/>Google AI Plus $7.99: 200 AI credits/mo<br/>Google AI Pro $19.99: 1,000 AI credits/mo<br/>Google AI Ultra $249.99: 25,000 AI credits/mo<br/><br/>**Gemini Code Assist/Gemini CLI**<br/>On June 18, 2026, Gemini CLI and Gemini Code Assist IDE extensions will stop serving requests for Google AI Pro and Ultra, as well as those using it free of charge using Gemini Code Assist for individuals.<br/>Maximum requests per user per day<br/>Free: 1000/d<br/>Google AI Pro $19.99: 1500/d<br/>Google AI Ultra $249.99: 2000/d    |   Quota-based     |           |     |  
| [Kilo Pass Starter](https://kilo.ai/pricing) |   $19.00  |  Up to 40% bonus credits |   Usage-based     |     ~$26.6      |    1.4 |   
| [Trae Pro](https://www.trae.ai/pricing) |   $10.00 (Free for 7 days)  |   $20 Basic usage + Bonus usage<br/>Unlimited Autocomplete     |     Usage-based       |   $20.00 + 随机赠送 Bonus（有反馈收到 $130）  |    >2    |  
| [GitHub Copilot Pro](https://github.com/features/copilot/plans) |   $10.00<br/>Temporarilly unavailable  |   Users on a monthly Pro or Pro+ plan will automatically migrate to usage-based billing on June 1, 2026.    |   Usage-based     |   $10   |    1    |          
| [Zed Pro](https://zed.dev/pricing) |   $10.00  |    Unlimited edit predictions<br/>$5 of tokens included<br/>Usage-based billing beyond $5<br/>14-day free trial. No credit card required.    |   Usage-based     |     $5.00/440万 Claude Sonnet 4.6      |   0.5  | 
| [CodeBuddy 个人专业版](https://www.codebuddy.cn/pricing) |   ￥59.00  |    每月 2000 Credits（含体验版 500 Credits）    |     Usage-based       |    |        | 



## 🤔 我的看法

整理完这么多数据，有点感慨。Coding Plan 这个市场卷得飞起，但说实话大部分国内厂商的套餐其实挺坑的 — 算力不够还硬要卖、429 报错成家常便饭、额度倍率看着高实际抢不到。反而按量计费的 DeepSeek V4 Flash 成了最后的良心，简单粗暴不玩套路。

我个人现在主力是 DeepSeek V4 Flash 按量 + Claude Code，国内偶尔用 MIMO-v2.5 处理多模态场景。说实话，AI Coding Plan 这东西，买之前先想清楚自己是真的需要那么多额度，还是只是被"倍率"的数字迷惑了。花里胡哨的套餐不如一个稳定可用的 API 😄

**最后的忠告**：别为了省那几十块钱去抢那些天天 429 的套餐，时间成本也是钱。如果 DeepSeek V4 Flash 能满足你的需求，它就是目前最省心省钱的选择，没有之一。

<tongji/>

<comment/>