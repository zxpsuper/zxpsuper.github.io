<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="footer-logo">✦</span>
        <span class="footer-text" v-if="copyrightText">{{ copyrightText }}</span>
      </div>
      <div class="footer-right">
        <a
          v-for="item in contact"
          :key="item.type"
          :href="item.link"
          class="footer-link"
          target="_blank"
          rel="noopener"
          :title="item.type === 'github' ? 'GitHub' : item.type === 'mail' ? '邮件' : item.type"
        >
          <svg v-if="item.type === 'github'" class="footer-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <svg v-else-if="item.type === 'mail'" class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M22 4l-10 8L2 4"/>
          </svg>
          <span v-else>{{ item.type }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    contact() {
      const contact = (this.$themeConfig.footer && this.$themeConfig.footer.contact) || []
      return contact
    },
    copyrightText() {
      const copyright = (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []
      return copyright.map(c => c.text).join(' | ')
    },
  },
}
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem 1.75rem;
  gap: 1rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  font-size: 1rem;
  color: var(--text);
}

.footer-text {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  padding: 6px;
  border-radius: 6px;
}

.footer-link:hover {
  color: var(--text);
  background: var(--bg-subtle);
}

.footer-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 719px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    padding: 1rem 1.25rem;
  }
}
</style>
