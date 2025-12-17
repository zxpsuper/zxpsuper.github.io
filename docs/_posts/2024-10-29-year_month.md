---
title: 计算年月日的天干地支
date: 2025-12-16
tags:
  - 杂文
  - 前端
author: 小皮咖
location: 广州
---

想研究下五行取名，逃不开年月日的天干地支计算。

本文以简单易懂的方式带你一步步实现该功能！

<!-- more -->

## 年份的天干地支

**十大天干**：甲、乙、丙、丁、戊（wù）、己、庚（gēng）、辛、壬（rēn）、癸（guǐ）。

**十二地支**：子、丑、寅（yín）、卯（mǎo）、辰、巳（sì）、午、未、申、酉（yǒu）、戌（xū）、亥（hài）。

干支纪年法是根据十天干和十二地支的组合来纪年的。10 和 12 的最小公倍数是 60，所以干支纪年就会出现“六十一甲子”的现象了。

那么如何计算年份的天干地支呢？

以公元4年甲子年为基准，那么公元5年为乙丑年，公元6年为丙寅年，以此类推。天干每十年轮回一次，地支每十二年轮回一次，那么计算公式如下：

```js
// 天干地支定义
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function getYearPillar(year) {
    // 公元4年是甲子年，作为基准
    const baseYear = 4;
    const diff = year - baseYear;

    // +10 和 +12 为处理负数情况
    const ganIndex = ((diff % 10) + 10) % 10;
    const zhiIndex = ((diff % 12) + 12) % 12;

    return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

console.log(getYearPillar(2025)); // 输出：甲辰，2025年是乙巳年
```
从上面可以看到，2025年是甲辰年。但是，2025真的是乙巳年年吗？其实不完全是的，在2025年2月3日之前，还算是甲辰年！
![](https://s3.cn-north-1.jdcloud-oss.com/design-tool-data/data23/c96529ab92df036ca0e1669737e2a6d9.png)

年柱的更新是以立春作为分界点的，而月柱和二十四节气息息相关，因此我们不能简单以公元年月日简单计算天干地支。

具体方法太过复杂这里就不作介绍，简单趴了下万年历官网的算法，你可以在这里直接选择时间：

<el-date-picker v-model="date" :pickerOptions="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-on:change="changeDate"></el-date-picker>

<div v-if="lunarObj.cY && date">
    <p>公历：{{date}}</p>
    <p style="color: red">年月日时柱为：{{lunarObj.cY}}年{{lunarObj.cM}}月{{lunarObj.cD}}日{{lunarObj.cH}}时</p>
</div>

## 计算五行归属与基础分值

天干五行：直接对应一个完整的五行属性。
> 甲、乙 → 木
>
> 丙、丁 → 火
>
> 戊、己 → 土
>
> 庚、辛 → 金
>
> 壬、癸 → 水

地支藏干：每个地支内部都藏有一到三个天干，称为“藏干”，需要按权重计算。常见的权重分配规则如下表所示：
	
|藏干1 (本气)|权重|藏干2 (中气)|权重|藏干3 (余气)|权重|
|---|---|---|---|---|---|
|子​|癸(水)|1.0|
|丑​|己(土)|0.6|癸(水)|0.3|辛(金)|0.1|
|寅​|甲(木)|0.6|丙(火)|0.3|戊(土)|0.1|
|卯​|乙(木)|1.0|
|辰​|戊(土)|0.6|乙(木)|0.3|癸(水)|0.1|
|巳​|丙(火)|0.6|庚(金)|0.3|戊(土)|0.1|
|午​|丁(火)|0.7|己(土)|0.3|
|未​|己(土)|0.6|丁(火)|0.3|乙(木)|0.1|
|申​|庚(金)|0.6|壬(水)|0.3|戊(土)|0.1|
|酉​|辛(金)|1.0|
|戌​|戊(土)|0.6|辛(金)|0.3|丁(火)|0.1|
|亥​|壬(水)|0.7|甲(木)|0.3|

		
### 统计四柱五行权重

现在，我们可以将一个具体的八字四柱进行拆解计算。


> 我们以 甲子(年) 丙寅(月) 戊辰(日) 辛酉(时)​ 为例。

天干部分：直接累加每个天干所代表的五行。

年干甲 → 木+1

月干丙 → 火+1

日干戊 → 土+1

时干辛 → 金+1

地支部分：根据地支藏干表，将每个地支所藏的五行按权重累加。

年支子：癸(水) → 水+1.0
月支寅：甲(木)0.6 + 丙(火)0.3 + 戊(土)0.1 → 木+0.6，火+0.3，土+0.1
日支辰：戊(土)0.6 + 乙(木)0.3 + 癸(水)0.1 → 土+0.6，木+0.3，水+0.1
时支酉：辛(金) → 金+1.0

### 月令加倍

八字理论中，出生月份（月支）代表季节力量，对相应的五行有巨大的加强作用。月支的五行力量需要加倍计算。
本例中，月支为寅，五行属木。因此，月支寅中所含的所有木气（甲木0.6 + 乙木0.3）需要额外加一次权重：木+0.9。

### 汇总计算比例
将以上所有数据按五行分类汇总，并计算百分比
> 木：1 + 0.6 + 0.3 + 0.9 = 2.8
>
> 火：1.0 + 0.3 = 1.3
>
> 土：1.0 + 0.6 + 0.1 = 1.7
>
> 金：1.0 + 1.0 = 2.0
>
> 水：1.0 + 0.1 = 1.1


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
            天干,
            地支,
            生肖,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date(1900, 0, 31).getTime();
                },
            },
            date: '',
            target: '',
            yearTarget: '',
            dateTarget: '',
            hourTarget: '',
            lunarObj: {
                cD: '',
                cM: '',
                cY: '',
                cH: ''
            }
        }
    },
    methods: {
        changeDate() {
            const array = this.date.split('-')
            const year = array[0]
            this.yearTarget = 天干.charAt((+year + 6) % 10) +  地支.charAt((+year + 8) % 12) + 生肖.charAt((+year + 8) % 12) + '年'
            this.lunarObj = getCalendarData(new Date(this.date))
        }
    }
}
</script>

<style>
    .el-date-picker table {
        display: table;
    }
</style>
