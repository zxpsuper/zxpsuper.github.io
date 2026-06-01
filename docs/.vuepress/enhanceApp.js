import "./styles/element-ui.css";
import ElementUI from "./components/element-ui";

export default ({
  Vue,
  options,
  router,
  siteData,
  isServer,
}) => {
  Vue.use(ElementUI)

  if (!isServer) {
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
  }
};
