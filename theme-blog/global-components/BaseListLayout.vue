<template>
  <div id="base-list-layout">
    <!-- Hero Section - only on homepage -->
    <section v-if="isHomepage" class="bp-hero">
      <div class="bp-container">
        <div class="bp-hero-inner">
          <div class="bp-hero-content">
            <h1 class="bp-hero-title">{{ heroGreeting }}</h1>
            <p v-if="heroIntro" class="bp-hero-text" v-html="heroIntro"></p>
            <p v-if="heroSubtitle" class="bp-hero-sub">{{ heroSubtitle }}</p>
            <ul v-if="heroSkills.length" class="bp-hero-skills">
              <li v-for="s in heroSkills" :key="s">{{ s }}</li>
            </ul>
            <a v-if="heroCtaLink" :href="heroCtaLink" class="bp-btn bp-btn-primary" target="_blank" rel="noopener">{{ heroCtaText }}</a>
          </div>
          <div v-if="heroAvatar" class="bp-hero-visual">
            <div class="bp-hero-frame"></div>
            <div class="bp-hero-img-wrap">
              <img :src="heroAvatar" :alt="$site.title" class="bp-hero-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section v-if="isHomepage && projects.length" class="bp-section">
      <div class="bp-container">
        <div class="bp-separator">
          <div class="bp-sep-line">
            <div class="bp-sep-gradient"></div>
            <div class="bp-sep-border"></div>
          </div>
          <div class="bp-sep-badge">
            <p class="bp-sep-text">{{ projectsSectionTitle }}</p>
            <div class="bp-sep-icon">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"/></svg>
            </div>
          </div>
        </div>
        <h2 class="bp-section-title">{{ projectsTitle }}</h2>
        <p v-if="projectsDesc" class="bp-section-desc">{{ projectsDesc }}</p>
        <div class="bp-grid">
          <a v-for="p in projects" :key="p.name" :href="p.link" target="_blank" rel="noopener" class="bp-card">
            <img v-if="p.image" :src="p.image" :alt="p.name" class="bp-card-img" />
            <div class="bp-card-body">
              <div class="bp-card-title-row">
                <span class="bp-card-title">{{ p.name }}</span>
                <svg class="bp-arrow" viewBox="0 0 13 15" fill="none"><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="5.3,0 10.8,5.5 5.3,11" class="bp-arrow-line"/><line x1="10.8" y1="5.5" x2="0.8" y2="5.2" class="bp-arrow-bar"/></g></svg>
              </div>
              <span class="bp-card-desc">{{ p.description }}</span>
            </div>
          </a>
        </div>
        <div v-if="allProjectsLink" class="bp-actions"><a :href="allProjectsLink" class="bp-btn bp-btn-primary" target="_blank" rel="noopener">{{ allProjectsText }}</a></div>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="bp-section" :class="{ 'bp-section-border': !isHomepage }">
      <div class="bp-container">
        <div v-if="isHomepage" class="bp-separator">
          <div class="bp-sep-line">
            <div class="bp-sep-gradient"></div>
            <div class="bp-sep-border"></div>
          </div>
          <div class="bp-sep-badge">
            <p class="bp-sep-text">{{ postsSectionTitle }}</p>
            <div class="bp-sep-icon">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"/></svg>
            </div>
          </div>
        </div>
        <h2 v-if="isHomepage" class="bp-section-title">{{ postsTitle }}</h2>
        <p v-if="isHomepage && postsDesc" class="bp-section-desc">{{ postsDesc }}</p>
        <div class="bp-posts-layout">
          <div class="bp-posts-main">
            <div class="bp-posts">
              <article v-for="page in pages" :key="page.key" class="bp-card" @click="goToPost(page.path)">
                <div class="bp-card-body">
                  <h3 class="bp-post-title">
                    <a :href="page.path" class="bp-post-link" @click.stop="goToPost(page.path)">{{ page.title }}</a>
                    <svg class="bp-arrow bp-post-arrow" viewBox="0 0 13 15" fill="none"><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="5.3,0 10.8,5.5 5.3,11" class="bp-arrow-line"/><line x1="10.8" y1="5.5" x2="0.8" y2="5.2" class="bp-arrow-bar"/></g></svg>
                  </h3>
                  <p class="bp-post-summary" v-html="page.frontmatter.summary || page.summary"></p>
                  <div class="bp-post-meta">
                    <time v-if="page.frontmatter.date" class="bp-post-date">{{ formatDate(page.frontmatter.date) }}</time>
                    <span v-if="page.frontmatter.tags" class="bp-post-tags">
                      <span v-for="tag in getTags(page.frontmatter.tags)" :key="tag" class="bp-tag">{{ tag }}</span>
                    </span>
                  </div>
                </div>
              </article>
            </div>
            <div v-if="allPostsLink && isHomepage" class="bp-actions"><a :href="allPostsLink" class="bp-btn bp-btn-primary">{{ allPostsText }}</a></div>
            <div v-if="!isHomepage && totalPages > 1" class="bp-page-nav">
              <a
                v-for="n in totalPages"
                :key="n"
                :href="getPageLink(n)"
                class="bp-page-btn"
                :class="{ active: n === currentPage }"
              >{{ n }}</a>
            </div>
          </div>
          <aside class="bp-sidebar">
            <div class="bp-card bp-subscribe-card">
              <div class="bp-card-body">
                <div class="bp-subscribe-header">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
                  <h3 class="bp-subscribe-title">订阅站点</h3>
                </div>
                <p class="bp-subscribe-desc">如果你想更轻松地追踪我的更新，可以通过 RSS 获取文章更新。</p>
                <div class="bp-subscribe-actions">
                  <a :href="rssLink" target="_blank" rel="noopener" class="bp-btn bp-btn-primary bp-btn-sm">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
                    订阅 RSS
                  </a>
                  <!-- <a :href="rssLink" target="_blank" rel="noopener" class="bp-btn bp-btn-outline bp-btn-sm">查看订阅</a> -->
                </div>
              </div>
            </div>

            <!-- WeChat Card -->
            <div class="bp-card bp-sidebar-card">
              <div class="bp-card-body">
                <div class="bp-sidebar-header">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/></svg>
                  <h3 class="bp-sidebar-title">关注公众号</h3>
                </div>
                <div class="bp-wechat-body">
                  <img src="/images/myqrcode.jpg" alt="微信公众号" class="bp-wechat-img" />
                  <p class="bp-wechat-desc">扫码关注「小皮咖」获取最新文章推送</p>
                </div>
              </div>
            </div>

            <!-- Stats Card -->
            <div class="bp-card bp-sidebar-card">
              <div class="bp-card-body">
                <div class="bp-sidebar-header">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
                  <h3 class="bp-sidebar-title">网站统计</h3>
                </div>
                <ul class="bp-stats-list">
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">文章总数</span>
                    <span class="bp-stat-value">{{ totalPostCount }}</span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">标签总数</span>
                    <span class="bp-stat-value">{{ totalTagCount }}</span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">总访问量</span>
                    <span class="bp-stat-value"><span id="busuanzi_site_pv">-</span></span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">总访客数</span>
                    <span class="bp-stat-value"><span id="busuanzi_site_uv">-</span></span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">今日访问</span>
                    <span class="bp-stat-value"><span id="busuanzi_today_pv">-</span></span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">今日访客</span>
                    <span class="bp-stat-value"><span id="busuanzi_today_uv">-</span></span>
                  </li>
                  <li class="bp-stat-item">
                    <span class="bp-stat-label">最后更新</span>
                    <span class="bp-stat-value">{{ lastUpdateDate }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  data() {
    return {}
  },
  computed: {
    isHomepage() { return this.$route.path === '/' },
    pages() {
      if (this.$pagination) return this.$pagination.pages
      return this.topPosts
    },
    topPosts() {
      return this.allPosts.slice(0, 10)
    },
    allPosts() {
      return this.$site.pages
        .filter(p => /^\d{4}\/\d{2}\/\d{2}\//.test(p.path.replace(/^\//, '')))
        .sort((a, b) => new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0))
    },
    totalPages() {
      if (this.$pagination) return this.$pagination.length
      return Math.ceil(this.allPosts.length / 10)
    },
    currentPage() {
      if (this.$pagination) return this.$pagination.paginationIndex + 1
      return 1
    },
    totalPostCount() {
      return this.$site.pages.filter(p => /^\d{4}\/\d{2}\/\d{2}\//.test(p.path.replace(/^\//, ''))).length
    },
    totalTagCount() {
      const tags = new Set()
      this.$site.pages.forEach(p => {
        if (p.frontmatter && p.frontmatter.tags) {
          const t = Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : [p.frontmatter.tags]
          t.forEach(tag => tags.add(tag))
        }
      })
      return tags.size
    },
    lastUpdateDate() {
      const dates = this.$site.pages
        .filter(p => /^\d{4}\/\d{2}\/\d{2}\//.test(p.path.replace(/^\//, '')))
        .map(p => p.frontmatter.date)
        .filter(Boolean)
        .sort()
        .reverse()
      return dates.length ? dates[0].slice(0, 10) : '-'
    },
    heroGreeting() { return (this.$themeConfig.hero && this.$themeConfig.hero.greeting) || '你好，我是' + this.$site.title },
    heroIntro() { return (this.$themeConfig.hero && this.$themeConfig.hero.intro) || '' },
    heroSubtitle() { return (this.$themeConfig.hero && this.$themeConfig.hero.subtitle) || '' },
    heroSkills() { return (this.$themeConfig.hero && this.$themeConfig.hero.skills) || [] },
    heroCtaText() { return (this.$themeConfig.hero && this.$themeConfig.hero.ctaText) || '关注我' },
    heroCtaLink() { return (this.$themeConfig.hero && this.$themeConfig.hero.ctaLink) || '' },
    heroAvatar() { return (this.$themeConfig.hero && this.$themeConfig.hero.avatar) || '' },
    projects() { return this.$themeConfig.projects || [] },
    projectsTitle() { return this.$themeConfig.projectsTitle || '我的项目' },
    projectsDesc() { return this.$themeConfig.projectsDesc || '' },
    projectsSectionTitle() { return this.$themeConfig.projectsSectionTitle || '我的项目' },
    allProjectsLink() { return this.$themeConfig.allProjectsLink || '' },
    allProjectsText() { return this.$themeConfig.allProjectsText || '查看全部项目' },
    postsTitle() { return this.$themeConfig.postsTitle || '最新文章' },
    postsDesc() { return this.$themeConfig.postsDesc || '' },
    postsSectionTitle() { return this.$themeConfig.postsSectionTitle || '最新文章' },
    allPostsLink() { return this.$themeConfig.allPostsLink || '/page/1/' },
    allPostsText() { return this.$themeConfig.allPostsText || '查看全部文章' },
    rssLink() {
      return (this.$themeConfig.feed && this.$themeConfig.feed.canonical_base)
        ? this.$themeConfig.feed.canonical_base + '/rss.xml'
        : '/rss.xml'
    },
  },
  mounted() {
    const s = document.createElement('script')
    s.src = '//cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js'
    s.defer = true
    document.body.appendChild(s)
  },
  methods: {
    getPageLink(n) {
      if (this.$pagination) return this.$pagination.getSpecificPageLink(n - 1)
      return n === 1 ? '/page/1/' : '/page/' + n + '/'
    },
    formatDate(date) {
      return dayjs.utc(date).format(this.$themeConfig.dateFormat || 'YYYY-MM-DD')
    },
    getTags(tags) {
      if (!tags) return []
      return Array.isArray(tags) ? tags : [tags]
    },
    goToPost(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style>
/* ============ Container ============ */
.bp-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 28px;
}
@media (min-width: 1024px) {
  .bp-container {
    padding: 0;
  }
}

/* ============ Hero ============ */
.bp-hero {
  padding: 60px 0 32px;
}
.bp-hero-inner {
  display: flex;
  align-items: flex-start;
  gap: 48px;
}
.bp-hero-content {
  flex: 1;
  min-width: 0;
}
.bp-hero-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
  margin: 0 0 16px;
  font-family: PT Serif, Serif;
}
.bp-hero-text {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0 0 8px;
  line-height: 1.7;
}
.bp-hero-sub {
  font-size: 16px;
  color: var(--text);
  margin: 0 0 8px;
  font-weight: 600;
}
.bp-hero-skills {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}
.bp-hero-skills li {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 2px 0 2px 16px;
  position: relative;
}
.bp-hero-skills li::before {
  content: "•";
  position: absolute;
  left: 4px;
  color: var(--text-tertiary);
}
.bp-hero-visual {
  flex: 0 0 320px;
  display: none;
  position: relative;
}
@media (min-width: 768px) {
  .bp-hero-visual {
    display: block;
  }
}
.bp-hero-frame {
  position: absolute;
  top: 24px;
  left: 24px;
  right: -24px;
  bottom: -24px;
  border: 1px dashed var(--border-dashed);
  border-radius: 16px;
  transition: all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.bp-hero-img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}
.bp-hero-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.4s ease;
}
.bp-hero-visual:hover .bp-hero-frame {
  border-color: var(--hover-border);
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
}
.bp-hero-visual:hover .bp-hero-img {
  transform: scale(1.04);
  box-shadow: 0 12px 28px rgba(0,0,0,0.1);
}

@media (max-width: 767px) {
  .bp-hero {
    padding: 32px 0 16px;
  }
  .bp-hero-title {
    font-size: 28px;
  }
}

/* ============ Section ============ */
.bp-section {
  padding: 48px 0;
}
.bp-section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
  padding: 0;
  border: none;
  font-family: PT Serif, Serif;
}
.bp-section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0 0 32px;
  line-height: 1.6;
}
.bp-actions {
  text-align: center;
  padding-top: 32px;
}

/* ============ Separator ============ */
.bp-separator {
  position: relative;
  margin: 80px 0;
}

.bp-sep-line {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-left: 1.25rem;
}

@media (min-width: 768px) {
  .bp-sep-line {
    padding-left: 0;
  }
}

.bp-sep-gradient {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--bg) 50%,
    transparent 100%
  );
}

html.dark .bp-sep-gradient {
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--bg) 50%,
    transparent 100%
  );
}

.bp-sep-border {
  width: 100%;
  height: 1px;
  border-top: 1px dashed var(--border-dashed);
}

.bp-sep-badge {
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: 1.25rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  white-space: nowrap;
  gap: 4px;
}

@media (min-width: 768px) {
  .bp-sep-badge {
    left: 50%;
    margin-left: 0;
    transform: translate(-50%, -50%);
  }
}

.bp-sep-text {
  margin: 0;
  line-height: 1;
}

.bp-sep-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border);
  border-radius: 50%;
  transform: translateX(4px);
}

.bp-sep-icon svg {
  width: 12px;
  height: 12px;
}

/* ============ Card ============ */
.bp-card {
  position: relative;
  display: block;
  padding: 28px;
  border-radius: 16px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border: 1px dashed var(--border-dashed);
  background: var(--bg-card);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 1px 6px rgba(0,0,0,0.02);
  transition: all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.bp-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border: 1px dashed transparent;
  border-radius: 16px;
  transition: all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
  pointer-events: none;
}
.bp-card:hover {
  transform: translate(-3px, -3px);
  border-color: var(--hover-border);
  background: var(--bg);
  box-shadow: 0 12px 28px rgba(0,0,0,0.06), 0 3px 10px rgba(0,0,0,0.03);
}
.bp-card:hover::before {
  transform: translate(6px, 6px);
  border-color: var(--border-dashed);
}

/* ============ Card Image ============ */
.bp-card-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
  display: block;
}

/* ============ Card Body ============ */
.bp-card-body {
  min-width: 0;
}
.bp-card-title-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}
.bp-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}
.bp-card-desc {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ============ Arrow ============ */
.bp-arrow {
  width: 10px;
  height: 12px;
  flex-shrink: 0;
  color: var(--text);
  transition: all 0.2s ease;
}
.bp-arrow-line {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.bp-arrow-bar {
  transform: translateX(-4px);
  opacity: 0;
  transition: all 0.2s ease;
}
.bp-card:hover .bp-arrow-line {
  opacity: 1;
}
.bp-card:hover .bp-arrow-bar {
  transform: translateX(0);
  opacity: 1;
}

/* ============ Projects Grid ============ */
.bp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
@media (min-width: 640px) {
  .bp-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .bp-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ============ Posts ============ */
.bp-posts > * + * {
  margin-top: 16px;
}
.bp-post-title {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  font-family: PT Serif, Serif;
}
.bp-post-link {
  color: var(--text);
  text-decoration: none;
  line-height: 1.3;
}
.bp-post-link:hover {
  color: var(--text);
}
.bp-post-arrow {
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  margin-top: 3px;
}
.bp-card:hover .bp-post-arrow {
  opacity: 1;
}
.bp-post-summary {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 10px;
  line-height: 1.6;
}
.bp-post-summary >>> p {
  margin: 0;
}
.bp-post-summary >>> a {
  color: inherit;
  text-decoration: underline;
}
.bp-post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.bp-post-date {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}
.bp-post-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.bp-tag {
  font-size: 11px;
  color: var(--text-secondary);
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: 4px;
}

/* ============ Button ============ */
.bp-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}
.bp-btn-primary {
  color: #fff;
  background: var(--text);
  border: 1px solid var(--text);
}
.bp-btn-primary:hover {
  background: transparent;
  color: var(--text);
}
html.dark .bp-btn-primary {
  color: var(--bg);
  background: var(--text);
  border-color: var(--text);
}
html.dark .bp-btn-primary:hover {
  background: transparent;
  color: var(--text);
}

.bp-btn-outline {
  color: var(--text);
  background: transparent;
  border: 1px solid var(--border);
}
.bp-btn-outline:hover {
  border-color: var(--text);
}
.bp-btn-sm {
  padding: 6px 16px;
  font-size: 12px;
  gap: 6px;
}

/* ============ Posts Layout (two-column) ============ */
.bp-posts-layout {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
@media (min-width: 768px) {
  .bp-posts-layout {
    flex-direction: row;
    align-items: flex-start;
  }
  .bp-posts-main {
    flex: 1;
    min-width: 0;
  }
  .bp-sidebar {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 100px;
  }
}

/* ============ Sidebar Subscribe Card ============ */
.bp-subscribe-card {
  cursor: default;
}
.bp-subscribe-card::before {
  display: none;
}
.bp-subscribe-card:hover {
  transform: none;
  border-color: var(--border-dashed);
  background: transparent;
}
.bp-subscribe-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.bp-subscribe-header svg {
  color: var(--text);
  flex-shrink: 0;
}
.bp-subscribe-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  font-family: PT Serif, Serif;
}
.bp-subscribe-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 16px;
  line-height: 1.6;
}
.bp-subscribe-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bp-subscribe-actions .bp-btn {
  justify-content: center;
}

/* ============ Sidebar Cards ============ */
.bp-sidebar-card {
  cursor: default;
  margin-top: 16px;
  background: var(--bg);
}
.bp-sidebar-card::before {
  display: none;
}
.bp-sidebar-card:hover {
  transform: none;
  border-color: var(--border-dashed);
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 1px 6px rgba(0,0,0,0.02);
}
.bp-sidebar-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.bp-sidebar-header svg {
  color: var(--text);
  flex-shrink: 0;
}
.bp-sidebar-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  font-family: PT Serif, Serif;
}
.bp-stats-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bp-stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}
.bp-stat-item:last-child {
  border-bottom: none;
}
.bp-stat-label {
  font-size: 13px;
  color: var(--text-secondary);
}
.bp-stat-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}
.bp-wechat-body {
  text-align: center;
}
.bp-wechat-img {
  width: 100%;
  max-width: 160px;
  border-radius: 8px;
  display: block;
  margin: 0 auto 10px;
}
.bp-wechat-desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* ============ Responsive ============ */
@media (max-width: 719px) {
  .bp-section {
    padding: 32px 0;
  }
  .bp-container {
    padding: 0 20px;
  }
  .bp-card {
    padding: 20px;
  }
}
.bp-page-nav {
  text-align: center;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.bp-page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid var(--border);
  text-decoration: none;
  transition: all .2s;
}
.bp-page-btn:hover {
  color: var(--text);
  border-color: var(--text);
  background: var(--bg-subtle);
}
.bp-page-btn.active {
  color: var(--accent-text);
  background: var(--text);
  border-color: var(--text);
}
@media (max-width: 719px) {
  .bp-page-nav {
    padding-top: 32px;
    gap: 6px;
  }
  .bp-page-btn {
    min-width: 32px;
    height: 32px;
    font-size: 13px;
    padding: 0 8px;
  }
}
</style>
