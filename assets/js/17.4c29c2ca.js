(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{309:function(e,t,r){},333:function(e,t,r){"use strict";r(309)},382:function(e,t,r){"use strict";r.r(t);r(32);const l="小网",a="中网",i="大网",n=(e,t=3)=>e.toFixed(t),o=(e,t=3)=>parseFloat(n(e,t)),s=e=>{const{numberOfRetainedProfits:t,type:r,gear:l,price:a,percent:i,buyAmount:o}=e,s=l*a,m=100*Math.floor(o/s/100),c=+(m*s).toFixed(2),p=+((l+i)*a).toFixed(2),u=m*p,d=u-c,f=n(d/c*100,2)+"%";let v=d*t;const _=100*Math.floor((u-v)/p/100),b=_*p;v=u-b;return{type:r,gear:l,buyAmount:c,buyCount:m,buyPrice:s,sellPrice:p,sellAmount:b,sellCount:_,profits:d,returnRate:f,retainedProfits:v,retainedCount:v/p}};var m={data:()=>({form:{inputName:"",name:"",price:1,amount:1e3,gridWidth:5,maxPercentOfDecline:60,increasePercentPerGrid:0,retain:!1,middleGrid:!1,bigGrid:!1},grids:[]}),mounted(){this.createGrid()},methods:{createGrid(){const{price:e,amount:t,gridWidth:r,maxPercentOfDecline:n,increasePercentPerGrid:m,retain:c,middleGrid:p,bigGrid:u}=this.form,d=[],f=(100-n)/100,v=r/100,_=c?1:0;let b=1,h=0,x=0,g=0;for(;b>=f;){const r=o((m*h+1)*t,0);d.push(s({type:l,buyAmount:r,gear:b,percent:v,numberOfRetainedProfits:_,price:e})),p&&h&&h%T_MIDDLE==0&&(x++,d.push(s({type:a,buyAmount:r,gear:o(1-x*v*2),percent:2*v,numberOfRetainedProfits:_,price:e}))),u&&h&&h%T_BIG==0&&(g++,d.push(s({type:i,buyAmount:r,gear:o(1-g*v*3),percent:3*v,numberOfRetainedProfits:_,price:e}))),h++,b=o(1-h*v)}this.grids=d,console.log(d)}}},c=(r(333),r(5)),p=Object(c.a)(m,(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("投资，每个人都应该有一套完整的观察和投资体系。")]),e._v(" "),t("p",[e._v("不是说这个时刻我觉得可以买，这个时刻我觉得可以卖。")]),e._v(" "),t("p",[e._v("如果是这样随意买卖，那么胜率会很低，短线频繁操作盈亏更加的影响心情。")]),e._v(" "),t("p",[e._v("今天看了 E 大的几篇文章，深有体会，这里分享给大家。")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/uxktt5ZpNo03FpQQX-aG7g",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之一：写在前面、体系以及策略"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/-czfqGvxkDcay_tSI1jv5g",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之二：网格策略基础/1.0 版"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s/8pRKsjiQSZzrmH-uWCkRLQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("波段策略.网格之三：网格策略进阶/2.0 版"),t("OutboundLink")],1)])]),e._v(" "),t("h2",{attrs:{id:"网格策略"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#网格策略"}},[e._v("#")]),e._v(" 网格策略")]),e._v(" "),t("p",[e._v("这几篇文章着重讲述「网格策略」，它是一个中短期波段策略。")]),e._v(" "),t("p",[e._v("网格策略主要适用于稳定震荡的金融品种，比如上证指数十年 3000 点等。")]),e._v(" "),t("p",[e._v("这种品种来回波动，特别适合中短期波段策略！")]),e._v(" "),t("p",[e._v("金融投资最重要的是什么？"),t("strong",[e._v("是低买高卖")]),e._v("。")]),e._v(" "),t("p",[e._v("网格操作就是如此，逢低按照预定的计划（预定的价格和数量）加仓，在预定的计划建仓，锁住固定的收益，其他的交给时间。")]),e._v(" "),t("h3",{attrs:{id:"开始网格-你需要做的事情非常简单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开始网格-你需要做的事情非常简单"}},[e._v("#")]),e._v(" 开始网格，你需要做的事情非常简单：")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("第一步：确定交易品种（来回震荡，不会退市的，推荐指数 etf）。")])]),e._v(" "),t("li",[t("p",[e._v("第二步：列出网格表格。表格中包括交易价格、交易金额、交易日期。")])]),e._v(" "),t("li",[t("p",[e._v("第三步：做压力测试（确定你的最大亏损比例和金额）。")])]),e._v(" "),t("li",[t("p",[e._v("第四步：设置交易提醒（可以用闹钟或者交易软件）。")])]),e._v(" "),t("li",[t("p",[e._v("第五步：按照交易提醒进行交易。")])])]),e._v(" "),t("p",[e._v("在这里，我来实现一个计划表格：")]),e._v(" "),t("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",inline:!0}},[t("el-form-item",{attrs:{label:"基金"}},[t("el-input",{staticClass:"width200",model:{value:e.form.inputName,callback:function(t){e.$set(e.form,"inputName",t)},expression:"form.inputName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"价格"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"每份金额"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},model:{value:e.form.amount,callback:function(t){e.$set(e.form,"amount",t)},expression:"form.amount"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"网格宽度"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},model:{value:e.form.gridWidth,callback:function(t){e.$set(e.form,"gridWidth",t)},expression:"form.gridWidth"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"最大跌幅"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},model:{value:e.form.maxPercentOfDecline,callback:function(t){e.$set(e.form,"maxPercentOfDecline",t)},expression:"form.maxPercentOfDecline"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"加码幅度"}},[t("el-input",{staticClass:"width200",attrs:{type:"number"},model:{value:e.form.increasePercentPerGrid,callback:function(t){e.$set(e.form,"increasePercentPerGrid",t)},expression:"form.increasePercentPerGrid"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),e._v(" "),t("el-form-item",{attrs:{label:"其他设置"}},[t("el-checkbox",{model:{value:e.form.retain,callback:function(t){e.$set(e.form,"retain",t)},expression:"form.retain"}},[e._v("留存利润")]),e._v(" "),t("el-checkbox",{model:{value:e.form.middleGrid,callback:function(t){e.$set(e.form,"middleGrid",t)},expression:"form.middleGrid"}},[e._v("启用中网")]),e._v(" "),t("el-checkbox",{model:{value:e.form.bigGrid,callback:function(t){e.$set(e.form,"bigGrid",t)},expression:"form.bigGrid"}},[e._v("启用大网")])],1)],1),e._v(" "),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.grids,stripe:""}},[t("el-table-column",{attrs:{type:"index",width:"50",label:"序号"}}),e._v(" "),t("el-table-column",{attrs:{prop:"type",label:"种类"}}),e._v(" "),t("el-table-column",{attrs:{prop:"gear",label:"档位"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyPrice",label:"买入价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyCount",label:"买入数量"}}),e._v(" "),t("el-table-column",{attrs:{prop:"buyAmount",label:"买入金额"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellPrice",label:"卖出价"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellCount",label:"卖出数量"}}),e._v(" "),t("el-table-column",{attrs:{prop:"sellAmount",label:"卖出金额"}})],1),e._v(" "),t("tongji"),e._v(" "),t("comment")],1)}),[],!1,null,null,null);t.default=p.exports}}]);