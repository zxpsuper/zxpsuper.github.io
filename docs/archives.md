---
page: true
title: Archive
description: Archive
aside: false
---

<div v-for="yearList in data" class="year-container">
    <div class="year">
        {{ yearList[0].year }}
    </div>
    <a :href="article.path" v-for="(article, index) in yearList" :key="index" class="posts">
        <div class="post-container">
            <div class="post-dot"></div>
            {{ article.title }}
        </div>
        <div class="date">{{ article.date }}</div>
    </a>
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
.year {
  padding: 14px 0 8px 0;
  font-size: 1.25rem;
  font-weight: 500;
  font-family: var(--date-font-family),serif;
}
.posts {
  padding: 4px 0 4px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a.posts {
  color: rgba(60, 60, 67, 0.78);
}

.year-container {
  background-color: #fff;
  padding: 16px 32px 16px 16px
}

.post-dot {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #2563eb;
}
</style>
