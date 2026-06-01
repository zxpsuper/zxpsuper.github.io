
const path = require('path')
// .vuepress/config.js
console.log(path.resolve(__dirname, 'fonts'))
module.exports = {
    theme: require.resolve('../../theme-blog'),
    title: '小皮咖',
    description: '小皮咖博客',
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        // 请参考文档来查看所有可用的选项。
        directories: [
            {
                id: 'post',
                dirname: '_posts',
                path: '/',
                title: '博客',
                pagination: {
                    getPaginationPageTitle(pageNumber) {
                        return `第 ${pageNumber} 页`
                    },
                },
            },
            // {
            //     id: 'writing', // Unique id for current classifier
            //     dirname: '_writings', // Matched directory name
            //     path: '/writings/', // Entry page for current classifier
            //     title: '随笔', // Entry and pagination page titles for current classifier.
            //     layout: 'IndexWriting', // Layout for entry page.
            //     frontmatter: { // Frontmatter for entry page.
            //         tag: 'vuepress'
            //     },
            //     itemLayout: 'Writing', // Layout for matched pages.
            //     itemPermalink: '/writings/:year/:month/:day/:slug', // Permalink for matched pages.
            //     pagination: { // Pagination behavior
            //         lengthPerPage: 2,
            //     },
            // }
        ],
        frontmatters: [
            {
                id: 'tag',
                keys: ['tags'],
                path: '/tag/',
            },
        ],
        globalPagination: {
            lengthPerPage: 10,
        },
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/zxpsuper',
                },
                {
                    type: 'mail',
                    link: 'mailto:zxpscau@163.com',
                },
            ],
            copyright: [
                {
                    text: 'MIT Licensed | Copyright © 2024 - 2026 小皮咖',
                },
            ],
        },
        nav: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '文章',
                link: '/page/1/',
            },
            {
                text: '标签',
                link: '/tag/',
            },
            {
                text: '时间线',
                link: '/archives',
            },
            {
                text: '资源库',
                link: 'https://suporka-resource.netlify.app/',
            },
        ],
        feed: {
            canonical_base: 'https://zxpsuper.github.io',
            posts_directories: ['/'],
            count: 50,
            sort: entries => entries.sort((a, b) => {
                const da = a.date ? new Date(a.date) : new Date(0)
                const db = b.date ? new Date(b.date) : new Date(0)
                return db - da
            }),
        },
        hero: {
            greeting: '你好，我是小皮咖',
            intro: '热爱技术、音乐和旅行的全栈开发者。<br class="hero-br">专注于 Web 开发与开源分享。',
            subtitle: '技能树：',
            skills: [
                'Vue.js / React 前端开发',
                '网站设计与性能优化',
                '开源项目维护',
            ],
            ctaText: '在 GitHub 上关注我',
            ctaLink: 'https://github.com/zxpsuper',
            avatar: '/images/my-avatar2.webp',
        },
        projectsTitle: '我的项目',
        projectsDesc: '这里是我的一些开源项目，我一直在不断创造新的东西。',
        projectsSectionTitle: '开源项目',
        allProjectsLink: 'https://github.com/zxpsuper',
        allProjectsText: '查看全部项目',
        projects: [
            {
                name: 'suporka-blog',
                description: '基于 VuePress 的个人博客系统',
                link: 'https://github.com/zxpsuper/zxpsuper.github.io',
                image: '/images/blog.webp',
            },
            {
                name: 'qrcode-with-logos',
                description: 'logo二维码生成工具',
                link: 'https://zxpsuper.github.io/',
                image: '/images/qrcode-logo.png',
            },
            {
                name: 'Suporka MD',
                description: '微信公众号 Markdown 编辑器',
                link: 'https://markdown.suporka.site/',
                image: '/images/suporka-md.webp',
            },
            {
                name: '皮咖驿站',
                description: '做你的资料百科库',
                link: 'https://resource.suporka.site/',
                image: '/images/suporka-resource.webp',
            },
            {
                name: '广州百晓生',
                description: '一个懂广州、懂吃喝玩乐、懂年轻人的本地生活号',
                link: 'https://resource.suporka.site/',
                image: '/images/guangzhou-baixiaosheng.webp',
            },
        ],
        postsTitle: '最新文章',
        postsDesc: '记录技术心得与生活感悟。',
        postsSectionTitle: '最新文章',
        allPostsText: '查看全部文章',
    },
    plugins: [
        [
            'sitemap',
            {
                hostname: 'https://zxpsuper.github.io',
                changefreq: 'daily',
                priority: 0.5,
                exclude: ['/404.html'],
            }
        ]
    ]
}

