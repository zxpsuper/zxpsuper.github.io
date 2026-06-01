<template>
  <div class="bp-search">
    <button class="bp-search-btn" @click="open" title="搜索 (Ctrl+K)">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
    </button>

    <transition name="search-fade">
      <div v-if="isOpen" class="bp-search-panel">
        <div class="bp-search-header">
          <div class="bp-search-input-wrap">
            <svg class="bp-search-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input
              ref="input"
              v-model="query"
              class="bp-search-input"
              placeholder="搜索文章内容…"
              @keydown.escape="close"
            />
            <button class="bp-search-clear" v-if="query" @click="query = ''">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <button class="bp-search-close-btn" @click="close" title="关闭">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div v-if="query" class="bp-search-results">
          <a
            v-for="r in results"
            :key="r.path"
            :href="r.path"
            class="bp-search-result"
            @click="close"
          >
            <div class="bp-search-result-title" v-html="r.titleHtml"></div>
            <div v-if="r.contentMatch" class="bp-search-result-excerpt" v-html="r.contentMatch"></div>
            <div class="bp-search-result-meta">
              <template v-if="r.date">{{ r.date }}</template>
              <template v-if="r.date && r.tags.length"> · </template>
              <template v-for="(t, i) in r.tags"><span class="bp-search-result-tag">{{ t }}</span><template v-if="i < r.tags.length - 1"> </template></template>
            </div>
          </a>
          <div v-if="!results.length" class="bp-search-empty">未找到匹配文章</div>
        </div>

        <div v-if="!query" class="bp-search-hint">
          <span>输入关键词搜索文章内容</span>
          <span class="bp-search-hint-key">Esc 关闭</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
function highlightMatch(text, query, regex) {
  if (!text) return ''
  const idx = text.toLowerCase().indexOf(query)
  if (idx === -1) return ''
  const start = Math.max(0, idx - 30)
  const end = Math.min(text.length, idx + query.length + 60)
  let snippet = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
  snippet = snippet.replace(regex, m => `<mark>${m}</mark>`)
  return snippet
}

export default {
  data() {
    return {
      isOpen: false,
      query: '',
      searchIndex: [],
      indexLoaded: false,
    }
  },
  computed: {
    results() {
      const q = this.query.trim().toLowerCase()
      if (!q || !this.searchIndex.length) return []
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const re = new RegExp(escaped, 'gi')
      return this.searchIndex
        .filter(p =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.content && p.content.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        )
        .map(p => ({
          path: p.path,
          title: p.title,
          date: p.date,
          tags: p.tags,
          titleHtml: p.title.replace(re, m => `<mark>${m}</mark>`),
          contentMatch: highlightMatch(p.content, q, re),
        }))
    },
  },
  mounted() {
    this._keydown = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        this.isOpen ? this.close() : this.open()
      }
      if (e.key === 'Escape') this.close()
    }
    document.addEventListener('keydown', this._keydown)
    fetch('/search.json').then(r => r.json()).then(data => {
      this.searchIndex = data
      this.indexLoaded = true
    }).catch(() => {})
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keydown)
  },
  methods: {
    open() {
      this.isOpen = true
      this.query = ''
      this.$nextTick(() => {
        if (this.$refs.input) this.$refs.input.focus()
      })
    },
    close() {
      this.isOpen = false
      this.query = ''
    },
  },
}
</script>

<style>
.bp-search-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.bp-search-btn:hover {
  color: var(--text);
  background: var(--bg-subtle);
}

.bp-search-panel {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 520px;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.2);
  overflow: hidden;
  z-index: 1000;
}
.bp-search-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
.bp-search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  flex: 1;
  min-width: 0;
}
.bp-search-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  border-radius: 8px;
  margin-right: 8px;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.bp-search-close-btn:hover {
  color: var(--text);
  background: var(--bg-subtle);
}
.bp-search-icon {
  flex-shrink: 0;
  color: var(--text-tertiary);
}
.bp-search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text);
  outline: none;
  font-family: inherit;
}
.bp-search-input::placeholder {
  color: var(--text-tertiary);
}
.bp-search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: var(--bg-subtle);
  color: var(--text-tertiary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}
.bp-search-clear:hover {
  color: var(--text);
  background: var(--border);
}

.bp-search-results {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}
.bp-search-result {
  display: block;
  padding: 10px 18px;
  text-decoration: none;
  transition: background 0.15s;
}
.bp-search-result:hover {
  background: var(--bg-subtle);
}
.bp-search-result-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bp-search-result-title mark,
.bp-search-result-excerpt mark {
  background: transparent;
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.bp-search-result-excerpt {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.5;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.bp-search-result-meta {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}
.bp-search-result-tag {
  display: inline;
}
.bp-search-empty {
  text-align: center;
  padding: 32px 18px;
  font-size: 14px;
  color: var(--text-tertiary);
}

.bp-search-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  font-size: 13px;
  color: var(--text-tertiary);
}
.bp-search-hint-key {
  padding: 2px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 11px;
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.search-fade-enter,
.search-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
.search-fade-enter-to,
.search-fade-leave {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (max-width: 719px) {
  .bp-search-modal {
    padding-top: 10vh;
    padding-left: 12px;
    padding-right: 12px;
  }
  .bp-search-panel {
    max-height: 70vh;
  }
}
</style>
