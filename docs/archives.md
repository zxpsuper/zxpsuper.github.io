---
page: true
title: Archive
description: Archive
aside: false
---

<div class="archives-wrapper">
  <div class="archives-title">
    <span class="archives-icon">📅</span>
    <span>时间线</span>
  </div>
  <div v-for="yearList in data" class="year-container">
    <div class="year">
      <span class="year-number">{{ yearList[0].year }}</span>
      <span class="year-count">{{ yearList.length }} 篇</span>
    </div>
    <div class="timeline-line"></div>
    <a :href="article.path" v-for="(article, index) in yearList" :key="index" class="posts">
      <div class="post-dot"></div>
      <div class="post-content">
        <div class="post-title">{{ article.title }}</div>
        <div class="post-date">{{ article.date }}</div>
      </div>
    </a>
  </div>
</div>

<script>
  export default {
    data() {
      return {
        data: []
      }
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
.archives-wrapper {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e3e8f7;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.archives-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.archives-icon {
  font-size: 28px;
}

.year-container {
  position: relative;
  margin-bottom: 32px;
  padding-left: 32px;
}

.year-container:last-child {
  margin-bottom: 0;
}

.year {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color: #374151;
}

.year-number {
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
}

.year-count {
  font-size: 14px;
  font-weight: 400;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 2px 10px;
  border-radius: 12px;
}

.timeline-line {
  position: absolute;
  left: 10px;
  top: 40px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #2563eb, #dbeafe);
}

.posts {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.posts:hover {
  background: #f8fafc;
  padding-left: 12px;
  margin-left: -12px;
}

.post-dot {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #2563eb;
  margin-top: 4px;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.post-content {
  flex: 1;
}

.post-title {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  transition: color 0.3s ease;
}

.posts:hover .post-title {
  color: #2563eb;
}

.post-date {
  font-size: 13px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 6px;
}

.post-date::before {
  content: '';
  width: 4px;
  height: 4px;
  background: #d1d5db;
  border-radius: 50%;
}

@media (max-width: 640px) {
  .archives-wrapper {
    padding: 16px;
  }
  
  .year-container {
    padding-left: 24px;
  }
  
  .timeline-line {
    left: 6px;
  }
  
  .post-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
