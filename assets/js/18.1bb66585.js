(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{310:function(t,e,a){},336:function(t,e,a){"use strict";a(310)},386:function(t,e,a){"use strict";a.r(e);function n(t){var e,a,n,r,s,i,o,c,h=-1;t=t;var u=new Array("日","一","二","三","四","五","六","日");var v=new Array(19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835);function l(t){var e,a=348;for(e=32768;e>8;e>>=1)a+=v[t-1900]&e?1:0;return a+p(t)}function p(t){return d(t)?65536&v[t-1900]?30:29:0}function d(t){return 15&v[t-1900]}function f(t,e){return v[t-1900]&65536>>e?30:29}function g(t,e,a){var n,r,s=0,i=(Date.UTC(t,e,a)-Date.UTC(1900,0,31))/864e5;for(n=1900;n<2050&&i>0;n++)i-=s=l(n);for(i<0&&(i+=s,n--),this.year=n,r=d(n),this.isLeap=!1,n=1;n<13&&i>0;n++)r>0&&n==r+1&&0==this.isLeap?(--n,this.isLeap=!0,s=p(this.year)):s=f(this.year,n),1==this.isLeap&&n==r+1&&(this.isLeap=!1),i-=s;0==i&&r>0&&n==r+1&&(this.isLeap?this.isLeap=!1:(this.isLeap=!0,--n)),i<0&&(i+=s,--n),this.month=n,this.day=i+1}var _,y,w,m,D,L,b=new Array("","一","二","三","四","五","六","七","八","九","十","十一","十二"),k=new Array("初","十","廿","卅","□");return(L=t?new Date(t):new Date).getDate()!=h&&(e=L.getFullYear(),a=L.getMonth()+1,n=L.getDay(),h=L.getDate(),D=new g(e,a-1,h),console.log(D),m=D.month,o=1==m?"正":b[m],c=function(t){var e;switch(t){case 10:e="初十";break;case 20:e="二十";break;case 30:e="三十";break;default:e=k[Math.floor(t/10)],e+=b[t%10]}return e}(D.day),1==D.isLeap&&(o="闰"+o)),r=L.getHours(),s=L.getMinutes(),void(i=L.getSeconds()),u[n],(w=i)<=9&&(w="0"+w),(y=s)<=9&&(y="0"+y),void((_=r)<=9&&(_="0"+_)),o+"月"+c}n("2023-11-03");var r={data:()=>({date:"",target:""}),methods:{changeDate(){const t=this.date.split("-")[0],e="甲乙丙丁戊己庚辛壬癸".charAt((+t+6)%10)+"子丑寅卯辰巳午未申酉戌亥".charAt((+t+8)%12)+"鼠牛虎兔龙蛇马羊猴鸡狗猪".charAt((+t+8)%12)+"年";console.log(e,n(this.date))}}},s=(a(336),a(5)),i=Object(s.a)(r,(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("想研究下五行取名，逃不开年月日的天干地支计算。")]),t._v(" "),e("p",[t._v("本文以简单易懂的方式带你一步步实现该功能！")]),t._v(" "),e("h2",{attrs:{id:"年份的天干地支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#年份的天干地支"}},[t._v("#")]),t._v(" 年份的天干地支")]),t._v(" "),e("p",[e("strong",[t._v("十大天干")]),t._v("：甲、乙、丙、丁、戊（wù）、己、庚（gēng）、辛、壬（rēn）、癸（guǐ）。")]),t._v(" "),e("p",[e("strong",[t._v("十二地支")]),t._v("：子、丑、寅（yín）、卯（mǎo）、辰、巳（sì）、午、未、申、酉（yǒu）、戌（xū）、亥（hài）。")]),t._v(" "),e("p",[t._v("干支纪年法是根据十天干和十二地支的组合来纪年的。10 和 12 的最小公倍数是 60，所以干支纪年就会出现“六十一甲子”的现象了。")]),t._v(" "),e("p",[t._v("请选择时间：\n"),e("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},on:{change:t.changeDate},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),e("tongji"),t._v(" "),e("comment")],1)}),[],!1,null,null,null);e.default=i.exports}}]);