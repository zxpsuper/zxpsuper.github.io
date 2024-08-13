import "./styles/element-ui.css"
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  if (!isServer) {
    // 首页加入百度统计
    if (location.pathname === '/') {
      var _hmt = _hmt || []
        ; (function () {
          var hm = document.createElement('script')
          hm.src = 'https://hm.baidu.com/hm.js?5476893575cc17cb81fd52c64959696f'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(hm, s)
        })()
    }
    import('./components/element-ui').then(elementUi => {
      console.log(elementUi)
      Vue.use(elementUi)
    })
  }
}