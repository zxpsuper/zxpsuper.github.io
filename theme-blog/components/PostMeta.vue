<template>
  <div class="bp-post-meta">
    <div v-if="author" class="bp-meta-item" itemprop="publisher author" itemtype="http://schema.org/Person" itemscope>
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
      <span itemprop="name">{{ author }}</span>
      <span v-if="location" itemprop="address">&nbsp;· {{ location }}</span>
    </div>
    <div v-if="date" class="bp-meta-item">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
      <time pubdate itemprop="datePublished" :datetime="date">{{ resolvedDate }}</time>
    </div>
    <ul v-if="tags" class="bp-meta-tags" itemprop="keywords">
      <li v-for="tag in resolvedTags" :key="tag">
        <router-link :to="'/tag/' + tag + '/'" class="bp-meta-tag">{{ tag }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'

dayjs.extend(dayjsPluginUTC)

export default {
  name: 'PostMeta',
  props: {
    tags: { type: [Array, String] },
    author: { type: String },
    date: { type: String },
    location: { type: String },
  },
  computed: {
    resolvedDate() {
      return dayjs.utc(this.date).format(this.$themeConfig.dateFormat || 'YYYY-MM-DD')
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags
      return [this.tags]
    },
  },
}
</script>

<style scoped>
.bp-post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.bp-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1;
}

.bp-meta-item svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.bp-meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.bp-meta-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-subtle);
  padding: 3px 8px;
  border-radius: 4px;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}

.bp-meta-tag:hover {
  color: var(--text);
  background: var(--border);
}
</style>
