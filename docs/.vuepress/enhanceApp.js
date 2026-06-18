import "./styles/element-ui.css";
import ElementUI from "./components/element-ui";
import { openImageViewer } from "./utils/imageViewer";
import { initContextMenu, destroyContextMenu } from "./utils/contextMenu";

const IMG_SELECTOR = "img";

function isPreviewableImg(node, container) {
  if (!node || node.nodeType !== 1) return false;
  if (node.tagName !== "IMG") return false;
  if (node.closest("a")) return false;
  if (!container || !container.contains(node)) return false;
  if (!node.getAttribute("src")) return false;
  return true;
}

export default ({
  Vue,
  options,
  router,
  siteData,
  isServer,
}) => {
  Vue.use(ElementUI);

  Vue.directive("image-preview", {
    bind(el, binding) {
      const containerSelector =
        (binding && binding.value) || ".bp-post-content";
      const handler = (event) => {
        const container = el.querySelector(containerSelector) || el;
        const target = event.target;
        if (!isPreviewableImg(target, container)) return;
        const imgs = Array.from(container.querySelectorAll(IMG_SELECTOR)).filter(
          (n) => isPreviewableImg(n, container),
        );
        if (!imgs.length) return;
        const idx = imgs.indexOf(target);
        if (idx === -1) return;
        event.preventDefault();
        event.stopPropagation();
        openImageViewer(
          imgs.map((n) => n.currentSrc || n.src),
          idx,
        );
      };
      el.__bpImagePreviewHandler = handler;
      el.addEventListener("click", handler, true);
    },
    unbind(el) {
      if (el.__bpImagePreviewHandler) {
        el.removeEventListener("click", el.__bpImagePreviewHandler, true);
        delete el.__bpImagePreviewHandler;
      }
    },
  });

  Vue.directive("context-menu", {
    bind() {
      if (isServer) return;
      initContextMenu();
    },
    unbind() {
      if (isServer) return;
      destroyContextMenu();
    },
  });

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
