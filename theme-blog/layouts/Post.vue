<template>
  <div class="bp-post-layout">
    <div class="bp-post-inner">
      <div class="bp-post-main">
        <article
          class="bp-card bp-post-card"
          itemscope
          itemtype="https://schema.org/BlogPosting"
        >
          <div class="bp-card-body">
            <header class="bp-post-header">
              <h1 class="bp-post-title" itemprop="name headline">
                {{ $frontmatter.title }}
              </h1>
              <PostMeta
                :tags="$frontmatter.tags"
                :author="$frontmatter.author"
                :date="$frontmatter.date"
                :location="$frontmatter.location"
              />
              <div class="bp-page-stats">
                <span class="bp-page-stat">
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span id="busuanzi_page_pv">{{ busuanzi.busuanzi_page_pv }}</span> 次阅读
                </span>
                <span class="bp-page-stat">
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  <span id="busuanzi_page_uv">{{ busuanzi.busuanzi_page_uv }}</span> 位访客
                </span>
              </div>
            </header>
            <div class="bp-post-content" itemprop="articleBody">
              <Content />
            </div>
            <footer class="bp-post-footer">
              <nav v-if="prevPost || nextPost" class="bp-post-nav">
                <a
                  v-if="prevPost"
                  :href="prevPost.path"
                  class="bp-nav-link bp-nav-prev"
                >
                  <span class="bp-nav-arrow">←</span>
                  <span class="bp-nav-text">
                    <span class="bp-nav-label">上一篇</span>
                    <span class="bp-nav-title">{{ prevPost.title }}</span>
                  </span>
                </a>
                <span v-else class="bp-nav-link bp-nav-disabled"></span>
                <a
                  v-if="nextPost"
                  :href="nextPost.path"
                  class="bp-nav-link bp-nav-next"
                >
                  <span class="bp-nav-text bp-nav-text-right">
                    <span class="bp-nav-label">下一篇</span>
                    <span class="bp-nav-title">{{ nextPost.title }}</span>
                  </span>
                  <span class="bp-nav-arrow">→</span>
                </a>
                <span v-else class="bp-nav-link bp-nav-disabled"></span>
              </nav>
              <Newsletter v-if="$service.email.enabled" />
              <Comment />
            </footer>
          </div>
        </article>
      </div>
      <aside class="bp-toc-col">
        <Toc />
      </aside>
    </div>
  </div>
</template>

<script>
import Toc from "@theme/components/Toc.vue";
import PostMeta from "@theme/components/PostMeta.vue";
import { Comment } from "@vuepress/plugin-blog/lib/client/components";

export default {
  components: {
    Toc,
    PostMeta,
    Comment,
    Newsletter: () => import("@theme/components/Newsletter.vue"),
  },
  data() {
    return {
      busuanzi: {
        busuanzi_today_pv: '-',
        busuanzi_today_uv: '-',
        busuanzi_site_pv: '-',
        busuanzi_site_uv: '-',
        busuanzi_page_pv: '-',
        busuanzi_page_uv: '-',
      },
    };
  },
  computed: {
    sortedPosts() {
      return this.$site.pages
        .filter((p) => /^\d{4}\/\d{2}\/\d{2}\//.test(p.path.replace(/^\//, "")))
        .sort(
          (a, b) =>
            new Date(b.frontmatter.date || 0) -
            new Date(a.frontmatter.date || 0),
        );
    },
    currentIndex() {
      return this.sortedPosts.findIndex((p) => p.path === this.$route.path);
    },
    prevPost() {
      return this.currentIndex < this.sortedPosts.length - 1
        ? this.sortedPosts[this.currentIndex + 1]
        : null;
    },
    nextPost() {
      return this.currentIndex > 0
        ? this.sortedPosts[this.currentIndex - 1]
        : null;
    },
  },
  mounted() {
    const u = new URL("https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js");
    fetch(u.protocol + "//" + u.host + "/api.php", {
      method: "POST",
      body: JSON.stringify({
        url: location.href,
        referrer: document.referrer,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        this.busuanzi = r;
      })
      .catch((e) => console.error(e));
  },
};
</script>

<style scoped>
.bp-post-layout {
  padding: 48px 0;
}

.bp-post-inner {
  display: flex;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.75rem;
  gap: 2rem;
  align-items: flex-start;
}

.bp-post-main {
  flex: 1;
  max-width: 900px;
  min-width: 0;
}

.bp-toc-col {
  width: 210px;
  flex-shrink: 0;
  display: none;
  position: sticky;
  top: 80px;
}

.bp-toc-col .sticker,
.bp-toc-col .vuepress-toc {
  position: static !important;
  display: block !important;
  padding-top: 0 !important;
  max-width: none !important;
  max-height: calc(100vh - 110px) !important;
  overflow-y: auto;
  z-index: 0;
}

@media (min-width: 1024px) {
  .bp-toc-col {
    display: block;
  }
}

.bp-post-card {
  cursor: default;
  padding: 40px;
  background: var(--bg);
}
.bp-post-card::before {
  display: none;
}
.bp-post-card:hover {
  transform: none;
  background: var(--bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02), 0 1px 6px rgba(0, 0, 0, 0.02);
}

.bp-post-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.bp-page-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
}

.bp-page-stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.bp-page-stat svg {
  flex-shrink: 0;
}

.bp-post-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
  line-height: 1.3;
  font-family: PT Serif, Serif;
  border: none;
  padding: 0;
}

.bp-post-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text);
}

.bp-post-content >>> h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--border);
  font-family: PT Serif, Serif;
}

.bp-post-content >>> h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.4rem;
  font-family: PT Serif, Serif;
}

.bp-post-content >>> p {
  margin: 0 0 1rem;
}

.bp-post-content >>> img {
  max-width: 100%;
  border-radius: 8px;
}

.bp-post-content >>> a {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.bp-post-content >>> a:hover {
  color: var(--text-secondary);
}

.bp-post-content >>> blockquote {
  border-left: 3px solid var(--border);
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.bp-post-content >>> code {
  font-size: 0.85em;
  padding: 0.15rem 0.4rem;
  background: var(--bg-subtle);
  border-radius: 4px;
  color: var(--text);
}

.bp-post-content >>> pre {
  background: #000;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  overflow: auto;
  margin: 1rem 0;
}

.bp-post-content >>> pre code {
  background: transparent;
  padding: 0;
  color: #fff;
}

.bp-post-content >>> ul,
.bp-post-content >>> ol {
  padding-left: 1.5em;
  margin: 0.5rem 0;
  line-height: 1.7;
}

.bp-post-content >>> li {
  margin-bottom: 0.25rem;
}

.bp-post-content >>> hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.5rem 0;
}

.bp-post-content >>> table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.bp-post-content >>> th,
.bp-post-content >>> td {
  border: 1px solid var(--border);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.bp-post-content >>> th {
  background: var(--bg-subtle);
  font-weight: 600;
}

.bp-post-footer {
  margin-top: 32px;
  padding-top: 20px;
}

.bp-post-nav {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.bp-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  text-decoration: none;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.bp-nav-link:hover {
  border-color: var(--text);
  background: var(--bg-subtle);
}

.bp-nav-next {
  text-align: right;
  justify-content: flex-end;
}

.bp-nav-disabled {
  visibility: hidden;
}

.bp-nav-arrow {
  font-size: 1.25rem;
  color: var(--text-tertiary);
  flex-shrink: 0;
  line-height: 1;
}

.bp-nav-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.bp-nav-text-right {
  align-items: flex-end;
}

.bp-nav-label {
  font-size: 11px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bp-nav-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
}

.bp-nav-link:hover .bp-nav-title {
  color: var(--text);
}

.bp-hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 20px 0;
}

@media (max-width: 719px) {
  .bp-post-layout {
    padding: 24px 0;
  }
  .bp-post-inner {
    padding: 0 1rem;
  }
  .bp-post-card {
    padding: 20px;
  }
  .bp-post-title {
    font-size: 1.5rem;
  }
  .bp-post-nav {
    flex-direction: column;
    gap: 12px;
  }
  .bp-nav-link {
    padding: 12px;
  }
}
</style>
