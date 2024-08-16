(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{398:function(t,s,a){"use strict";a.r(s);var r=a(5),e=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"背景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),s("p",[t._v("之前浏览过草料二维码的网站，他的二维码美化功能很强大，可以分别自定义码眼和码点的形状和颜色，功能十分强大 💪！")]),t._v(" "),s("p",[t._v("碰巧之前写过一个 npm 插件 "),s("a",{attrs:{href:"https://github.com/zxpsuper/qrcode-with-logos",target:"_blank",rel:"noopener noreferrer"}},[t._v("qrcode-with-logos"),s("OutboundLink")],1),t._v(", 用于前端生成带 logo 的二维码。")]),t._v(" "),s("p",[t._v("而且在 github 的 issues 里有外国友人 👨‍🦱 问我能否实现不同样式的二维码，刚好以此作为新需求，模仿草料二维码的样式和功能，开发了 qrcode-with-logos 的 v1.1.0 版本。")]),t._v(" "),s("blockquote",[s("p",[t._v("有了 qrcode-with-logos 这款 npm 插件，你也可以在你的网站实现不同风格组合的 qrcode 了！")])]),t._v(" "),s("tongji"),t._v(" "),s("h2",{attrs:{id:"实现功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现功能"}},[t._v("#")]),t._v(" 实现功能")]),t._v(" "),s("ul",[s("li",[t._v("自定义码眼码点颜色！")]),t._v(" "),s("li",[t._v("自定义码眼码点形状！")]),t._v(" "),s("li",[t._v("自动计算合适的 logo 大小！")]),t._v(" "),s("li",[t._v("自由选择不同宽高比的 logo, 不再是之前限定的 1:1")]),t._v(" "),s("li",[t._v("自动选择合适的容错率版本！")]),t._v(" "),s("li",[t._v("相比之前版本更快的绘制速度！")])]),t._v(" "),s("p",[t._v("demo 及文档点击 👉"),s("a",{attrs:{href:"https://zxpsuper.github.io/qrcode-with-logos/",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),s("OutboundLink")],1),t._v(",实现的效果如下：")]),t._v(" "),s("p",[s("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://raw.githubusercontent.com/zxpsuper/qrcode-with-logos/master/images/qr-code.png",width:"200"}}),s("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://raw.githubusercontent.com/zxpsuper/qrcode-with-logos/master/images/qr-code2.png",width:"200"}}),s("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://raw.githubusercontent.com/zxpsuper/qrcode-with-logos/master/images/qr-code3.png",width:"200"}})]),s("p"),t._v(" "),s("h2",{attrs:{id:"实现原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现原理"}},[t._v("#")]),t._v(" 实现原理")]),t._v(" "),s("p",[t._v("qrcode 的原理在这里就不过多介绍了，有兴趣的小伙伴可以网上搜索一下。")]),t._v(" "),s("p",[t._v("本插件是基于 qrcode 插件生成的记录二维码点阵的一维数组，从而得知每个点的黑白情况。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" QRCode "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"qrcode"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("QRDATA")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" QRCode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" nodeQrCodeOptions"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("QRDATA")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("modules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" version "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("QRDATA")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("version"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" qrcodeArray "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("QRDATA")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("modules"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("strong",[t._v("如：9*9 的点阵二维码，其数组长度 81,内容大致为："),s("code",[t._v("[1,1,1,1,1,1,1,0,0,0,0,0,....]")]),t._v("，其中 1 代表黑点，0 代表白点。")])]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**判断当前坐标是否为黑点 */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isDark")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" qrcodeArray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("x "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" y "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("根据此数据我们可以分别绘制码眼码点及 logo。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("首先绘制码点，在绘制码点之前，我们需要计算 logo 所占位置的区域，此区域内不绘制码点，(之前是 logo 直接覆盖码点，效果不好)，提高绘制速度。")])]),t._v(" "),s("li",[s("p",[t._v("其次绘制码眼，码眼长度固定为 7 * 7， 码眼内部固定为 3*3 的实心矩形，当然也可以自由绘制其他形状。")])]),t._v(" "),s("li",[s("p",[t._v("最后在 logo 区域绘制 logo 及 logo 背景色。")])])]),t._v(" "),s("p",[t._v("逻辑比较简单，具体代码实现有兴趣的小伙伴请移步 "),s("a",{attrs:{href:"https://github.com/zxpsuper/qrcode-with-logos",target:"_blank",rel:"noopener noreferrer"}},[t._v("Github"),s("OutboundLink")],1),t._v("!")]),t._v(" "),s("h2",{attrs:{id:"踩坑过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#踩坑过程"}},[t._v("#")]),t._v(" 踩坑过程")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("之前版本是支持自定义 logo 的大小的，但是这种过于自由导致二维码的识别效率不高，容易出现识别不出的情况，因此这次版本去掉了自定义 logo 大小的功能，根据 qrcode 的容错率计算 logo 最大能占用的面积大小，用于计算 logo 的最大大小。")])]),t._v(" "),s("li",[s("p",[t._v("在实现液化码点的时候，圆液化实现效果比较好，但是 "),s("code",[t._v("fluid-line")]),t._v(" 实现的效果远不及原版的液化效果，有没有小伙伴有更好的思路可以在评论区或者 Github 讨论一下。")])])]),t._v(" "),s("comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);