const path = require('path')
// .vuepress/config.js
console.log(path.resolve(__dirname, 'fonts'))
module.exports = {
  theme: '@vuepress/blog',
  title: '小皮咖',
  description: 'This is a blog example built by VuePress',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    // 请参考文档来查看所有可用的选项。
    directories: [
      {
        id: 'post',
        dirname: '_posts',
        path: '/',
      },
      {
        id: 'writing', // Unique id for current classifier
        dirname: '_writings', // Matched directory name
        path: '/writings/', // Entry page for current classifier
        title: '隨筆', // Entry and pagination page titles for current classifier.
        layout: 'IndexWriting', // Layout component name for entry page.
        frontmatter:{ //Front matter for entry page.
          tag: 'vuepress'
        },
        itemLayout: 'Writing', // Layout for matched pages.
        itemPermalink: '/writings/:year/:month/:day/:slug', // Permalink for matched pages.
        pagination: { // Pagination behavior
          lengthPerPage: 2,
        },
      }
    ],
    frontmatters: [
      {
        id: 'tag',
        keys: ['tags'],
        path: '/tag/',
      },
    ],
    globalPagination: {
      lengthPerPage: 5,
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
        {
          type: 'juejin',
          link: 'mailto:zxpscau@163.com',
        }
      ],
      copyright: [
        {
          text: 'MIT Licensed | Copyright © 2024 小皮咖',
        },
      ],
    },
    feed: {
      canonical_base: 'https://zxpsuper.github.io/',
    },
  }
}