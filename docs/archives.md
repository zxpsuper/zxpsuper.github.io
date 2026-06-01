---
page: true
title: 时间线
description: 文章归档
aside: false
---

<div class="bp-section">
  <div class="bp-container">
    <div class="bp-card">
      <div class="bp-card-body">
        <h2 class="bp-section-title">时间线</h2>
        <div v-for="yearList in data" class="bp-year-group">
          <div class="bp-year-header">
            <span class="bp-year-number">{{ yearList[0].year }}</span>
            <span class="bp-year-count">{{ yearList.length }} 篇</span>
          </div>
          <div class="bp-timeline">
            <div class="bp-timeline-line"></div>
            <a
              :href="article.path"
              v-for="article in yearList"
              :key="article.path"
              class="bp-timeline-item"
            >
              <span class="bp-timeline-dot"></span>
              <div class="bp-timeline-content">
                <span class="bp-timeline-title">{{ article.title }}</span>
                <span class="bp-timeline-date">{{ article.date }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  export default {
    data() {
      return { data: [] }
    },
    mounted() {
      this.data = Object.values(this.$site.pages.filter(i => i.pid === 'post').reduce((result, item) => {
        const year = item.path.slice(1, 5)
        item.year = +year
        item.date = item.path.slice(1, 11)
        item.dateTime = new Date(item.date).getTime()
        if (!result[year]) result[year] = []
        result[year].push(item)
        return result
      }, {})).map(i => {
        i = i.sort((a, b) => b.dateTime - a.dateTime)
        return i
      }).sort((a, b) => b[0].year - a[0].year)
    }
  }
</script>

<style scoped>
.bp-section {
  padding: 48px 0;
}

.bp-container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.75rem;
}

.bp-card {
  position: relative;
  border: 1px dashed var(--border-dashed);
  border-radius: 16px;
  padding: 32px;
  background: var(--bg-card);
}

.bp-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px;
  line-height: 1.3;
}

.bp-section-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 32px;
  line-height: 1.6;
}

.bp-year-group {
  margin-bottom: 32px;
  padding-left: 28px;
  position: relative;
}

.bp-year-group:last-child {
  margin-bottom: 0;
}

.bp-year-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.bp-year-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.bp-year-count {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  background: var(--bg-subtle);
  padding: 2px 10px;
  border-radius: 999px;
  line-height: 1.5;
}

.bp-timeline {
  position: relative;
  padding-left: 20px;
}

.bp-timeline-line {
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.bp-timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 0;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.bp-timeline-item:hover {
  padding-left: 10px;
  margin-left: -10px;
  background: var(--bg-subtle);
}

.bp-timeline-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--text-tertiary);
  margin-top: 5px;
  position: relative;
  z-index: 1;
  transition: border-color 0.2s;
}

.bp-timeline-item:hover .bp-timeline-dot {
  border-color: var(--text);
}

.bp-timeline-content {
  flex: 1;
  min-width: 0;
}

.bp-timeline-title {
  display: block;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
  line-height: 1.4;
  transition: color 0.2s;
}

.bp-timeline-item:hover .bp-timeline-title {
  color: var(--text);
}

.bp-timeline-date {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  line-height: 1.4;
}

@media (max-width: 719px) {
  .bp-section {
    padding: 24px 0;
  }
  .bp-container {
    padding: 0 1rem;
  }
  .bp-card {
    padding: 20px;
  }
  .bp-year-group {
    padding-left: 20px;
  }
  .bp-year-number {
    font-size: 1.25rem;
  }
  .bp-timeline {
    padding-left: 16px;
  }
  .bp-timeline-dot {
    width: 8px;
    height: 8px;
  }
}
</style>
