(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{309:function(e,t,r){},333:function(e,t,r){"use strict";r(309)},382:function(e,t,r){"use strict";r.r(t);r(32),r(55);const a="小网",l="中网",o="大网",i=(e,t=3)=>e.toFixed(t),n=(e,t=3)=>parseFloat(i(e,t)),s=(e,t)=>parseFloat((e/t).toPrecision(14));const c=e=>{const{numberOfRetainedProfits:t,type:r,gear:a,price:l=1,percent:o,buyAmount:n}=e,s=+(a*l).toFixed(4),c=100*Math.floor(n/s/100),m=+(c*s).toFixed(2),u=+((a+o)*l).toFixed(2),d=+(c*u).toFixed(2);let p,v,_,f,b=0,h=0;if(0===t)_=c,f=+(_*u).toFixed(2),p=+(d-m).toFixed(2),v=i(p/m*100,2)+"%";else try{p=+(d-m).toFixed(2),b=p*t,_=100*Math.floor((d-b)/u/100),f=+(_*u).toFixed(2),b=+(d-f).toFixed(2),h=c-_,p=+(f-m).toFixed(2),v=i(p/m*100,2)+"%"}catch(e){console.log(e)}return{type:r,gear:a,buyAmount:m,buyCount:c,buyPrice:s,sellPrice:u,sellAmount:f,sellCount:_,profits:p,profitsRate:v,retainedProfits:b,retainedCount:h}};var m={data:()=>({form:{inputName:"",name:"",price:1,amount:1e3,gridWidth:5,maxPercentOfDecline:60,increasePercentPerGrid:0,retain:!1,middleGrid:!1,bigGrid:!1},grids:[],tableKey:null,cb:null}),mounted(){this.createGrid(),window.getFundData=this.getFundData},methods:{getSummaries(e){const{columns:t,data:r}=e,a=[];return t.forEach((e,t)=>{if(0===t)return void(a[t]="总计");const l=r.map(t=>Number(t[e.property]));!l.every(e=>isNaN(e))&&["买入金额","卖出金额","盈利金额","留存份额"].includes(e.label)?(a[t]=l.reduce((e,t)=>{const r=Number(t);return isNaN(r)?e:+(e+t).toFixed(4)},0),a[t]+=""):a[t]=""}),console.log(a),this.form.retain&&(a[9]=+(Number(a[11])*Number(this.form.price)+Number(a[9])+Number(a[8])-Number(a[5])).toFixed(2)),a[10]=+(100*a[9]/a[5]).toFixed(2)+"%",a},getRowClass:({row:e})=>"中网"===e.type?"row-middle":"大网"===e.type?"row-big":"",selectFund(e){this.form.price=e.price,this.form.name=e.value,this.createGrid()},querySearch(e,t){var r;r=this.form.inputName,new Promise((function(e,t){const a=document.createElement("script");a.src=`https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx?m=1&Key=${r}&callback=getFundData`,a.onload=a.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e(),document.getElementsByTagName("head")[0].removeChild(a))},a.onerror=t,document.getElementsByTagName("head")[0].appendChild(a)})),this.cb=t},getFundData(e){console.log(e);const t=e.Datas.map(e=>({value:e.NAME+`(${e.CODE})`,price:e.FundBaseInfo?e.FundBaseInfo.DWJZ:""}));this.cb(t)},createGrid(){this.tableKey=Date.now();const{price:e=1,amount:t=1e3,gridWidth:r=5,maxPercentOfDecline:i=60,increasePercentPerGrid:m=0,retain:u,middleGrid:d,bigGrid:p}=this.form,v=[],_=(100-i)/100,f=r/100,b=u?1:0;let h=1,g=0,y=0,x=0;const w=s(3*f,f),G=s(6*f,f);for(;h>=_;){const r=n((m*g/100+1)*t,0);v.push(c({type:a,buyAmount:r,gear:h,percent:f,numberOfRetainedProfits:b,price:e})),d&&g&&g%w==0&&(y++,v.push(c({type:l,buyAmount:r,gear:n(1-y*f*3),percent:3*f,numberOfRetainedProfits:b,price:e}))),p&&g&&g%G==0&&(x++,v.push(c({type:o,buyAmount:r,gear:n(1-x*f*6),percent:6*f,numberOfRetainedProfits:b,price:e}))),g++,h=n(1-g*f)}this.grids=v,console.log(v)}}},u=(r(333),r(5)),d=Object(u.a)(m,(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("投资，每个人都应该有一套完整的观察和投资体系。")]),e._v(" "),t("p",[e._v("不是说这个时刻我觉得可以买，这个时刻我觉得可以卖。")]),e._v(" "),t("p",[e._v("如果是这样随意买卖，那么胜率会很低，短线频繁操作盈亏更加的影响心情。")]),e._v(" "),t("p",[e._v("今天看了 E 大的几篇文章，深有体会，这里分享给大家。")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/uxktt5ZpNo03FpQQX-aG7g",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之一：写在前面、体系以及策略"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/-czfqGvxkDcay_tSI1jv5g",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之二：网格策略基础/1.0 版"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/8pRKsjiQSZzrmH-uWCkRLQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之三：网格策略进阶/2.0 版"),t("OutboundLink")],1)])]),e._v(" "),t("h2",{attrs:{id:"网格策略"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#网格策略"}},[e._v("#")]),e._v(" 网格策略")]),e._v(" "),t("p",[e._v("这几篇文章着重讲述「网格策略」，它是一个中短期波段策略。")]),e._v(" "),t("p",[e._v("网格策略主要适用于稳定震荡的金融品种，比如上证指数十年 3000 点等。")]),e._v(" "),t("p",[e._v("这种品种来回波动，特别适合中短期波段策略！")]),e._v(" "),t("p",[e._v("金融投资最重要的是什么？"),t("strong",[e._v("是低买高卖")]),e._v("。")]),e._v(" "),t("p",[e._v("网格操作就是如此，逢低按照预定的计划（预定的价格和数量）加仓，在预定的计划建仓，锁住固定的收益，其他的交给时间。")]),e._v(" "),t("blockquote",[t("p",[e._v("1.0 版本是固定买入,固定全部卖出, 2.0 版本增加了中大网格,逐格加码,留存利润.")])]),e._v(" "),t("ul",[t("li",[e._v("「中大网格,逐格加码」其实就是越跌越买, 增加投入, 降低成本")]),e._v(" "),t("li",[e._v("「留存利润」也就是将当前网格买入卖出挣到的利润以 etf 的份额留存,反正都是赚的,留着怎么也不会亏本金, 这部分留存的利润如果将来该 etf 继续上涨还能继续获取利润, 防止卖飞")])]),e._v(" "),t("h3",{attrs:{id:"开始网格-你需要做的事情非常简单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开始网格-你需要做的事情非常简单"}},[e._v("#")]),e._v(" 开始网格，你需要做的事情非常简单：")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("第一步：确定交易品种（来回震荡，不会退市的，推荐指数 etf）。")])]),e._v(" "),t("li",[t("p",[e._v("第二步：列出网格表格。表格中包括交易价格、交易金额、交易日期。")])]),e._v(" "),t("li",[t("p",[e._v("第三步：做压力测试（确定你的最大亏损比例和金额）。")])]),e._v(" "),t("li",[t("p",[e._v("第四步：设置交易提醒（可以用闹钟或者交易软件）。")])]),e._v(" "),t("li",[t("p",[e._v("第五步：按照交易提醒进行交易。")])])]),e._v(" "),t("p",[e._v("在这里，我来实现一个计划表格：")]),e._v(" "),t("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",inline:!0}},[t("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"基金"}},[t("el-autocomplete",{staticStyle:{width:"400px"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"请输入基金代码或名称"},on:{select:e.selectFund},model:{value:e.form.inputName,callback:function(t){e.$set(e.form,"inputName",t)},expression:"form.inputName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"价格"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},on:{change:e.createGrid},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"每份金额"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},on:{change:e.createGrid},model:{value:e.form.amount,callback:function(t){e.$set(e.form,"amount",t)},expression:"form.amount"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"网格宽度"}},[t("el-input",{staticClass:"width200",attrs:{type:"number",placeholder:"E大默认为5%"},on:{change:e.createGrid},model:{value:e.form.gridWidth,callback:function(t){e.$set(e.form,"gridWidth",t)},expression:"form.gridWidth"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"最大跌幅"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},on:{change:e.createGrid},model:{value:e.form.maxPercentOfDecline,callback:function(t){e.$set(e.form,"maxPercentOfDecline",t)},expression:"form.maxPercentOfDecline"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"加码幅度"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},on:{change:e.createGrid},model:{value:e.form.increasePercentPerGrid,callback:function(t){e.$set(e.form,"increasePercentPerGrid",t)},expression:"form.increasePercentPerGrid"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"其他设置"}},[t("el-checkbox",{on:{change:e.createGrid},model:{value:e.form.retain,callback:function(t){e.$set(e.form,"retain",t)},expression:"form.retain"}},[e._v("留存利润")]),e._v(" "),t("el-checkbox",{on:{change:e.createGrid},model:{value:e.form.middleGrid,callback:function(t){e.$set(e.form,"middleGrid",t)},expression:"form.middleGrid"}},[e._v("启用中网")]),e._v(" "),t("el-checkbox",{on:{change:e.createGrid},model:{value:e.form.bigGrid,callback:function(t){e.$set(e.form,"bigGrid",t)},expression:"form.bigGrid"}},[e._v("启用大网")])],1)],1),e._v(" "),t("h3",[e._v(e._s(e.form.name)+"操作示意表")]),e._v(" "),t("br"),e._v(" "),t("el-table",{key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.grids,"row-class-name":e.getRowClass,"summary-method":e.getSummaries,"show-summary":""}},[t("el-table-column",{attrs:{type:"index",width:"50",label:"序号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"type",label:"种类"}}),e._v(" "),t("el-table-column",{attrs:{prop:"gear",label:"档位"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyPrice",label:"买入价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyCount",label:"买入数量"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyAmount",label:"买入金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellPrice",label:"卖出价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellCount",label:"卖出数量"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellAmount",label:"卖出金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"profits",label:"盈利金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"profitsRate",label:"盈利比列"}}),e._v(" "),t("el-table-column",{attrs:{prop:"retainedCount",label:"留存份额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"retainedProfits",label:"留存利润"}})],1),e._v(" "),t("br"),e._v(" "),t("h2",{attrs:{id:"收益计算"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#收益计算"}},[e._v("#")]),e._v(" 收益计算")]),e._v(" "),t("p",[e._v("以最极端的 V 型走势回到原点为例, 买入价格为 1, 买入金额为 1000, 网格宽度为 5 % 计算:")]),e._v(" "),t("ul",[t("li",[e._v("普通网格投入 12705, 盈利 985, 盈利比例 7.75%.")]),e._v(" "),t("li",[e._v("开启留存利润等回到原点卖掉所有份额, 投入 12705, 盈利 1240, 盈利比例 9.76%.")]),e._v(" "),t("li",[e._v("开启逐格加码 5%, 投入 16630, 盈利 1340, 盈利比例 8.06%")]),e._v(" "),t("li",[e._v("启用中网投入 16610, 盈利 2005, 盈利比例 12.07%")]),e._v(" "),t("li",[e._v("启用大网投入 14685, 盈利 2155, 盈利比例 14.67%")]),e._v(" "),t("li",[e._v("启用中大网组合投入 18590, 盈利 3175, 盈利比例 17.08%")])]),e._v(" "),t("p",[e._v("当然不同的组合会有不同的收益,但前提是你要选好金融品种, 该品种有周期波动, 下跌会涨回来")]),e._v(" "),t("p",[e._v("我们需要做的便是像机器一样严格执行,耐心等待.✊")]),e._v(" "),t("p",[e._v("愿大家一起共同富裕哈哈!😄")]),e._v(" "),t("tongji"),e._v(" "),t("comment")],1)}),[],!1,null,null,null);t.default=d.exports}}]);