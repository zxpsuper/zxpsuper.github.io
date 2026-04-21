<template>
  <div>
    <div class="giscus" style="margin-top: 16px"></div>
    <script
      src="https://giscus.app/client.js"
      data-repo="zxpsuper/zxpsuper.github.io"
      data-repo-id="MDEwOlJlcG9zaXRvcnk5NTMzMzM0OQ=="
      data-category="Announcements"
      data-category-id="DIC_kwDOBa6r5c4CevP1"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="https://gw.alipayobjects.com/os/k/t/comment.css"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async
    ></script>
    <div class="card">
      <div class="card-header">
        <div class="card-icon"><i class="fas fa-chart-line"></i></div>
        <h2 class="card-title">站点统计</h2>
      </div>
      <div class="examples">
        <div class="example-item">
          <i class="fa-solid fa-eye example-img"></i>今日访问量<e
            class="example-count"
            ><span id="busuanzi_today_pv">加载中...</span></e
          >
        </div>
        <div class="example-item">
          <i class="fa-solid fa-user example-img"></i>今日访客数<e
            class="example-count"
            ><span id="busuanzi_today_uv">加载中...</span></e
          >
        </div>
        <div class="example-item">
          <i class="fa-solid fa-eye example-img"></i>本站访问量<e
            class="example-count"
            ><span id="busuanzi_site_pv">加载中...</span></e
          >
        </div>
        <div class="example-item">
          <i class="fa-solid fa-user example-img"></i>本站访客数<e
            class="example-count"
            ><span id="busuanzi_site_uv">加载中...</span></e
          >
        </div>
        <div class="example-item">
          <i class="fa-solid fa-server example-img"></i>本页总阅读量<e
            class="example-count"
            ><span id="busuanzi_page_pv">加载中...</span></e
          >
        </div>
        <div class="example-item">
          <i class="fa-solid fa-calendar-days example-img"></i>本页总访客数<e
            class="example-count"
            ><span id="busuanzi_page_uv">加载中...</span></e
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {
      showScript: false,
    };
  },
  mounted() {
    fetch("https://" + "cdn.busuanzi.cc" + "/api.php", {
      method: "POST",
      body: JSON.stringify({
        url: location.href,
        referrer: document.referrer,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        for (const k in r)
          document
            .querySelectorAll("#" + k)
            .forEach((e) => (e.innerText = r[k]));
      })
      .catch((e) => console.error(e));
  },
};
</script>
<style scoped>
.examples {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.example-item {
  background: rgba(28, 192, 136, 0.1);
  padding: 8px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: var(--text-dark);
  transition: all 0.3s;
}
.example-count {
  margin-left: auto;
  background: rgba(28, 192, 136, 0.15);
  padding: 0px 6px;
  border-radius: 5px;
  word-break: break-all;
  font-size: 0.9rem;
}
@media (min-width: 768px) {
  .examples {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
