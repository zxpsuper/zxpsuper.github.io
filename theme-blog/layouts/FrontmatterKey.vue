<template>
  <div class="bp-section">
    <div class="bp-container">
      <div class="bp-card">
        <div class="bp-card-body">
          <h2 class="bp-section-title">标签</h2>
          <p class="bp-section-desc">按标签浏览文章</p>
          <div class="bp-tags-list">
            <router-link
              v-for="tag in $frontmatterKey.list"
              :key="tag.name"
              :to="tag.path"
              class="bp-tag"
            >
              <span class="bp-tag-name">{{ tag.name }}</span>
              <span class="bp-tag-count">{{ tag.pages.length }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  border: 1px dashed var(--border-dashed);
  border-radius: 16px;
  padding: 32px;
  background: var(--bg-card);
  cursor: default;
}
.bp-card::before {
  display: none;
}

.bp-card-body {
  position: relative;
  z-index: 1;
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
  margin: 0 0 24px;
  line-height: 1.6;
}

.bp-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bp-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  background: transparent;
}

.bp-tag:hover {
  color: var(--text);
  border-color: var(--hover-border);
  background: var(--bg-subtle);
}

.bp-tag-name {
  line-height: 1;
}

.bp-tag-count {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: 999px;
  line-height: 1.4;
}

@media (max-width: 719px) {
  .bp-section {
    padding: 24px 0;
  }
  .bp-card {
    padding: 20px;
  }
  .bp-tag {
    padding: 6px 12px;
    font-size: 0.8125rem;
  }
}
</style>
