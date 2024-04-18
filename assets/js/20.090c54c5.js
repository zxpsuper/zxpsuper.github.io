(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{327:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("原本是计划用 travis-cli 自动构建发布博客的，结果登录上去发现已经开始收费使用了，没办法只能转向 Github Action 了！")]),t._v(" "),s("p",[t._v("GitHub Actions 是 GitHub 官方推出的持续集成/部署模块服务（CI/CD），和 jenkins、Travis CI 是同一类产品定位。")]),t._v(" "),s("p",[t._v("但 Actions 的最大优势，就是它是与 GitHub 高度整合的，只需一个配置文件即可自动开启服务。甚至你不需要购买服务器 —— GitHub Actions 自带云环境运行，包括私有仓库也可以享用，而且云环境性能也十分强劲。")]),t._v(" "),s("tongji"),t._v(" "),s("p",[s("strong",[t._v("那么如何利用 Github Action 构建并发布博客呢？")])]),t._v(" "),s("ol",[s("li",[t._v("本地创建公钥密钥并保存到仓库设置中")])]),t._v(" "),s("p",[t._v("本地执行 "),s("code",[t._v("ssh-keygen -f github-deploy-key")]),t._v(" 后会生成两个文件：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("github-deploy-key")]),t._v("密钥")]),t._v(" "),s("li",[s("code",[t._v("github-deploy-key.pub")]),t._v("公钥")])]),t._v(" "),s("p",[t._v("在仓库的 Setting 中找到 Actions secrets and variables, 添加一个 Secret, 取名 "),s("code",[t._v("BLOB_DEPLOY_PRI")]),t._v(", 将密钥的内容复制进去并保存。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/github-action-01.png",alt:""}})]),t._v(" "),s("p",[t._v("在仓库的 Setting 中找到 Deploy keys, 添加刚才生成的公钥，取名 "),s("code",[t._v("BLOB_DEPLOY_PUB")]),t._v(", 并勾选 "),s("code",[t._v("Allow write access")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/github-action-02.png",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("创建 workflow 模板 "),s("code",[t._v("deploy.yml")]),t._v(" 文件")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v(".github\n   └─ workflows\n       └─ deploy.yml\n")])])]),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Build and Deploy to GitHub Pages\n \n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("push")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branches")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定触发部署的分支，通常是main或master")]),t._v("\n \n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build-and-deploy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用最新的Ubuntu虚拟环境")]),t._v("\n \n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Checkout Code\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/checkout@v2\n \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Setup Node.js\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/setup"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("node@v1\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("node-version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'14'")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定Node.js的版本，根据您的项目需求调整")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Install Dependencies\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" npm install "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 安装依赖")]),t._v("\n \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Build\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" npm run docs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("build "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 构建文档")]),t._v("\n \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy to GitHub Pages\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用他人的 action 将文档推送至 gh-pages 分支")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" JamesIves/github"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("deploy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("action@4.1.4 \n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("GITHUB_TOKEN")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.BLOB_DEPLOY_PRI "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("BRANCH")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 部署到gh-pages分支")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("FOLDER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" docs/.vuepress/dist  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定构建目录")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("CLEAN")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 清理旧文件")]),t._v("\n")])])]),s("p",[t._v("在完成上述操作之后，只要每次推送代码到 master 分支，就会触发 workflow 自动执行 action 构建并部署，做到推送即部署的效果，大大解放生产力！")]),t._v(" "),s("p",[t._v("构建部署流程可以在 Action tab 中看到，可以实时查看构建状态，分析解决问题！😁😁")]),t._v(" "),s("comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);