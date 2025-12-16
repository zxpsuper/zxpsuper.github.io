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

console.log(getYearPillar(2024)); // 输出：甲辰，2024年是甲辰年
```

## 月份的天干地支

月份的天干地支比较复杂，需要结合年份的天干和五虎遁进行计算

正月固定为寅月，十二月份对应十二地支

```js
// 月支定义（正月为寅，二月为卯，以此类推）
const MONTH_DIZHI = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];

function getMonthPillar(year, month) {
    
    // 五虎遁法
    const WU_HU_DUN = {
        '甲': '丙', '己': '丙',  // 甲己之年丙作首
        '乙': '戊', '庚': '戊',  // 乙庚之岁戊为头
        '丙': '庚', '辛': '庚',  // 丙辛之年寻庚起
        '丁': '壬', '壬': '壬',  // 丁壬壬寅顺行流
        '戊': '甲', '癸': '甲'   // 若问戊癸何方发，甲寅之上好追求
    };

    const yearGanZhi = getYearPillar(year); // 年干支

    const yearGan = yearGanZhi[0]; // 年干
    
    // 根据五虎遁诀确定正月（寅月）的天干
    const firstMonthGan = WU_HU_DUN[yearGan];
    const firstMonthGanIndex = TIANGAN.indexOf(firstMonthGan);
    
    // 计算当前月的天干索引
    const monthGanIndex = (firstMonthGanIndex + month - 1) % 10;
    const monthGan = TIANGAN[monthGanIndex];
    
    // 月支固定
    const monthZhi = MONTH_DIZHI[month - 1];
    
    return monthGan + monthZhi;
}
```

请选择时间：
<el-date-picker v-model="date" :pickerOptions="pickerOptions" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" v-on:change="changeDate"></el-date-picker>

<div v-if="lunarObj.cY">
    <p>公历：{{date}}</p>
    <div>年月日时柱为：{{lunarObj.cY}}年{{lunarObj.cM}}月{{lunarObj.cD}}日{{lunarObj.cH}}时</div>
</div>

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
