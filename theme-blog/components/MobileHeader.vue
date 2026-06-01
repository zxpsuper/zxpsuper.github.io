<template>
  <div>
    <div class="mobile-header-bar">
      <div class="mobile-header-inner">
        <a href="/" class="mobile-logo">
          <span class="mobile-logo-icon">✦</span>
          <span class="mobile-logo-text">{{ $site.title }}</span>
        </a>
        <button class="mobile-menu-btn" @click="$emit('toggle-sidebar')">
          <svg v-if="isOpen" class="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <svg v-else class="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="mobile-menu-overlay" :class="{ open: isOpen }" @click="$emit('toggle-sidebar')"></div>
    <div class="mobile-menu" :class="{ open: isOpen }">
      <nav class="mobile-nav">
        <a
          v-for="item in $themeConfig.nav"
          :key="item.text"
          :href="item.link"
          class="mobile-nav-link"
          @click="$emit('toggle-sidebar')"
        >{{ item.text }}</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.mobile-header-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 60px;
  background: var(--header-bg);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.mobile-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1.25rem;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  font-size: 1rem;
}

.mobile-logo-icon {
  font-size: 1.25rem;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text);
  padding: 0;
}

.mobile-menu-icon {
  width: 24px;
  height: 24px;
}

.mobile-menu-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
}

html.dark .mobile-menu-overlay {
  background: rgba(10,10,10,0.9);
}

.mobile-menu-overlay.open {
  display: block;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 45;
  padding: 1rem 1.25rem 1.5rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  display: block;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-nav-link {
  display: block;
  padding: 10px 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.mobile-nav-link:hover {
  color: var(--text);
  background: var(--bg-subtle);
}

@media (max-width: 719px) {
  .mobile-header-bar {
    display: block;
  }
}
</style>
