<template>
  <div class="bp-comment">
    <div class="bp-comment-inner">
      <div ref="giscus" class="giscus"></div>
    </div>
  </div>
</template>
<script>
function getGiscusTheme() {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

let giscusLoaded = false

export default {
  name: 'comment',
  mounted() {
    const theme = getGiscusTheme()
    if (!giscusLoaded) {
      const s = document.createElement('script')
      s.src = 'https://giscus.app/client.js'
      s.setAttribute('data-repo', 'zxpsuper/zxpsuper.github.io')
      s.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnk5NTMzMzM0OQ==')
      s.setAttribute('data-category', 'Announcements')
      s.setAttribute('data-category-id', 'DIC_kwDOBa6r5c4CevP1')
      s.setAttribute('data-mapping', 'pathname')
      s.setAttribute('data-strict', '0')
      s.setAttribute('data-reactions-enabled', '1')
      s.setAttribute('data-emit-metadata', '0')
      s.setAttribute('data-input-position', 'bottom')
      s.setAttribute('data-theme', theme)
      s.setAttribute('data-lang', 'zh-CN')
      s.setAttribute('crossorigin', 'anonymous')
      s.async = true
      this.$refs.giscus.appendChild(s)
      giscusLoaded = true
    } else {
      const iframe = document.querySelector('iframe.giscus-frame')
      if (iframe) {
        iframe.contentWindow.postMessage({
          giscus: { setConfig: { theme, term: location.pathname } }
        }, 'https://giscus.app')
      }
    }

    this._observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      const iframe = document.querySelector('iframe.giscus-frame')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
          giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } }
        }, 'https://giscus.app')
      }
    })
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  },
  beforeDestroy() {
    if (this._observer) this._observer.disconnect()
  },
}
</script>
<style scoped>
.bp-comment {
  margin-top: 32px;
}
.bp-comment-inner {
  min-height: 200px;
}
</style>
