// 天干地支定义
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

function getYearPillar(year) {
  // 公元4年是甲子年，作为基准
  const baseYear = 4;
  const diff = year - baseYear;

  // +10 和 +12 为处理负数情况
  const ganIndex = ((diff % 10) + 10) % 10;
  const zhiIndex = ((diff % 12) + 12) % 12;

  return TIANGAN[ganIndex] + DIZHI[zhiIndex];
}

// 月支定义（正月为寅，二月为卯，以此类推）
const MONTH_DIZHI = [
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
  "子",
  "丑",
];

function getMonthPillar(year, month) {
  // 五虎遁年起月诀（根据年干确定月干）
  const WU_HU_DUN = {
    甲: "丙",
    己: "丙", // 甲己之年丙作首
    乙: "戊",
    庚: "戊", // 乙庚之岁戊为头
    丙: "庚",
    辛: "庚", // 丙辛之年寻庚起
    丁: "壬",
    壬: "壬", // 丁壬壬寅顺行流
    戊: "甲",
    癸: "甲", // 若问戊癸何方发，甲寅之上好追求
  };

  const yearGanZhi = getYearPillar(year); // 年干支
  const yearGan = yearGanZhi.substring(0, 1); // 年干
  // 根据五虎遁诀确定正月（寅月）的天干[3](@ref)
  const firstMonthGan = WU_HU_DUN[yearGan];
  const firstMonthGanIndex = TIANGAN.indexOf(firstMonthGan);

  // 计算当前月的天干索引
  const monthGanIndex = (firstMonthGanIndex + month - 1) % 10;
  const monthGan = TIANGAN[monthGanIndex];

  // 月支固定[3](@ref)
  const monthZhi = MONTH_DIZHI[month - 1];

  return monthGan + monthZhi;
}

// 五鼠遁日起时诀（根据日干确定时干）
const WU_SHU_DUN = {
    '甲': '甲', '己': '甲',  // 甲己还加甲
    '乙': '丙', '庚': '丙',  // 乙庚丙作初
    '丙': '戊', '辛': '戊',  // 丙辛从戊起
    '丁': '庚', '壬': '庚',  // 丁壬庚子居
    '戊': '壬', '癸': '壬'   // 戊癸何方发，壬子是真途
};

/**
 * 计算时柱
 * @param {string} dayGanZhi - 日柱
 * @param {number} hour - 小时(0-23)
 * @returns {string} 时柱干支
 */
function getHourPillar(dayGanZhi, hour) {
    const dayGan = dayGanZhi[0]; // 日干
    
    // 将24小时制转换为时辰(0-11)[3](@ref)
    const hourIndex = Math.floor((hour + 1) / 2) % 12;
    
    // 根据五鼠遁诀确定子时的天干[3](@ref)
    const ziHourGan = WU_SHU_DUN[dayGan];
    const ziHourGanIndex = TIANGAN.indexOf(ziHourGan);
    
    // 计算当前时辰的天干索引
    const hourGanIndex = (ziHourGanIndex + hourIndex) % 10;
    const hourGan = TIANGAN[hourGanIndex];
    
    // 时支固定
    const hourZhi = DIZHI[hourIndex];
    
    return hourGan + hourZhi;
}

console.log(getHourPillar('己巳', 2));
