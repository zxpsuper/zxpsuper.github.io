import "./styles/element-ui.css";
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  if (!isServer) {
    // 首页加入百度统计
    if (location.pathname === "/") {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5476893575cc17cb81fd52c64959696f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      !(function (p) {
        "use strict";
        !(function (t) {
          var s = window,
            e = document,
            i = p,
            c = "".concat(
              "https:" === e.location.protocol ? "https://" : "http://",
              "suporka.site/js/js-sdk-pro.min.js",
            ),
            n = e.createElement("script"),
            r = e.getElementsByTagName("script")[0];
          (n.type = "text/javascript"),
            n.setAttribute("charset", "UTF-8"),
            (n.async = !0),
            (n.src = c),
            (n.id = "LA_COLLECT"),
            (i.d = n);
          var o = function () {
            s.LA.ids.push(i);
          };
          s.LA ? s.LA.ids && o() : ((s.LA = p), (s.LA.ids = []), o()),
            r.parentNode.insertBefore(n, r);
        })();
      })({ id: "3PzSZE57tRx5JUqt", ck: "3PzSZE57tRx5JUqt", hashMode: true });
    }
    import("./components/element-ui").then((elementUi) => {
      Vue.use(elementUi);
      setTimeout(() => {
        if (router.app._vnode) {
          router.app._vnode.key = "updated";
          router.app.$forceUpdate();
        }
      }, 0);
    });
  }
};
