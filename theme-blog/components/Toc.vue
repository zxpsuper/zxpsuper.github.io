<template>
  <div v-if="visible" class="bp-toc-card">
    <div class="bp-toc-header">
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
      <span>目录</span>
    </div>
    <nav class="bp-toc-list">
      <a
        v-for="(item, index) in $page.headers"
        :key="index"
        :href="`#${item.slug}`"
        class="bp-toc-link"
        :class="[`bp-toc-h${item.level}`, { active: activeIndex === index }]"
      >{{ item.title }}</a>
    </nav>
  </div>
</template>

<script>
let initTop

function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0
}

export default {
  data() {
    return {
      activeIndex: 0,
    }
  },

  computed: {
    visible() {
      return (
        this.$frontmatter &&
        this.$frontmatter.toc !== false &&
        !!(this.$page && this.$page.headers && this.$page.headers.length)
      )
    },
  },

  watch: {
    activeIndex() {
      const dom = this.$el && this.$el.querySelector(`.bp-toc-link:nth-child(${this.activeIndex + 1})`)
      if (!dom) return
      const rect = dom.getBoundingClientRect()
      const wrapperRect = this.$el.getBoundingClientRect()
      const top = rect.top - wrapperRect.top
      if (top < 20) {
        this.$el.scrollTop = this.$el.scrollTop + top - 20
      } else if (top + rect.height > wrapperRect.height) {
        this.$el.scrollTop += rect.top - (wrapperRect.height - rect.height)
      }
    },
  },

  mounted() {
    setTimeout(() => this.triggerEvt(), 1000)
    this._onScroll = () => this.onScroll()
    window.addEventListener('scroll', this._onScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this._onScroll)
  },

  methods: {
    onScroll() {
      if (initTop === undefined) {
        initTop = getAbsoluteTop(this.$el)
      }
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      const headings = this.$page.headers || []
      let i = 0
      for (; i < headings.length; i++) {
        const dom = document.getElementById(headings[i].slug)
        const top = getAbsoluteTop(dom)
        if (top - 50 < scrollTop) {
          this.activeIndex = i
        } else {
          if (!i) this.activeIndex = i
          break
        }
      }
    },

    triggerEvt() {
      this.onScroll()
      const hash = decodeURIComponent(location.hash.substring(1))
      const index = (this.$page.headers || []).findIndex(h => h.slug === hash)
      if (index >= 0) this.activeIndex = index
    },
  },
}
</script>

<style>
.table-of-contents {
  display: none !important;
}

.bp-toc-card {
  border: 1px dashed var(--border);
  border-radius: 12px;
  background: var(--bg);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.bp-toc-card:hover {
  border-color: var(--text);
}

.bp-toc-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 14px 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.bp-toc-header svg {
  flex-shrink: 0;
}

.bp-toc-list {
  padding: 8px 0 10px;
  display: flex;
  flex-direction: column;
}

.bp-toc-link {
  display: block;
  padding: 4px 14px 4px 22px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-tertiary);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.15s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bp-toc-link:hover {
  color: var(--text);
}

.bp-toc-link.active {
  color: var(--text);
  border-left-color: var(--text);
  font-weight: 500;
}

.bp-toc-h3 {
  padding-left: 34px;
  font-size: 12px;
}

.bp-toc-h4 {
  padding-left: 46px;
  font-size: 11px;
}

.bp-toc-h5 {
  padding-left: 58px;
  font-size: 11px;
}

.bp-toc-h6 {
  padding-left: 70px;
  font-size: 11px;
}
</style>
