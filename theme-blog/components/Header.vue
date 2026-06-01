<template>
  <header id="header" class="header">
    <div class="header-inner">
      <a href="/" class="header-logo">
        <span class="header-logo-icon">✦</span>
        <span class="header-logo-text">{{ $site.title }}</span>
      </a>

      <nav class="header-nav">
        <a
          v-for="item in $themeConfig.nav"
          :key="item.text"
          :href="item.link"
          class="header-nav-link"
          :class="{ active: isActive(item.link) }"
        >{{ item.text }}</a>
      </nav>

      <div class="header-actions">
        <Search />
        <button class="theme-toggle" @click="toggleDarkMode">
          <svg class="theme-sun" :class="{ hidden: isDark }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <svg class="theme-moon" :class="{ hidden: !isDark }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
          <span class="theme-label">{{ isDark ? '夜间模式' : '日间模式' }}</span>
        </button>
        <button class="header-mobile-btn" @click="toggleMobile" aria-label="菜单">
          <svg v-if="isMobileOpen" class="mobile-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <svg v-else class="mobile-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"/>
          </svg>
        </button>
      </div>
    </div>

    <transition name="mobile-fade">
      <div v-if="isMobileOpen" class="mobile-menu-wrap">
        <div class="mobile-menu-overlay" @click="closeMobile"></div>
        <div class="mobile-menu">
          <nav class="mobile-nav">
            <a
              v-for="item in $themeConfig.nav"
              :key="item.text"
              :href="item.link"
              class="mobile-nav-link"
              @click="closeMobile"
            >{{ item.text }}</a>
          </nav>
          <div class="mobile-search">
            <Search />
          </div>
          <div class="mobile-theme">
            <button class="theme-toggle" @click="toggleDarkMode">
              <svg class="theme-sun" :class="{ hidden: isDark }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <svg class="theme-moon" :class="{ hidden: !isDark }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
              <span class="theme-label">{{ isDark ? '夜间模式' : '日间模式' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import Search from './Search.vue'

export default {
  components: { Search },
  data() {
    return {
      isDark: false,
      isMobileOpen: false,
    }
  },
  mounted() {
    if (typeof Storage !== 'undefined') {
      const stored = localStorage.getItem('dark_mode')
      if (stored === 'true') {
        this.isDark = true
        document.documentElement.classList.add('dark')
      }
    }
    this.$router.afterEach(() => {
      this.isMobileOpen = false
    })
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('dark_mode', this.isDark)
      }
    },
    isActive(link) {
      return this.$route.path === link
    },
    toggleMobile() {
      this.isMobileOpen = !this.isMobileOpen
    },
    closeMobile() {
      this.isMobileOpen = false
    },
  },
}
</script>

<style scoped>
.hidden{
  display: none;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 56px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .header {
    border-bottom: none;
  }
  .header-inner {
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    border-radius: 0 0 12px 12px;
    padding: 0 1.5rem;
  }
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  font-size: 1rem;
}

.header-logo-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.header-logo:hover .header-logo-icon {
  transform: rotate(-12deg) scale(1.2);
}

.header-logo-text {
  transform: translateY(-1px);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0;
}

@media (max-width: 719px) {
  .header-nav {
    display: none;
  }
}

.header-nav-link {
  padding: 0 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  letter-spacing: 0.02em;
}

.header-nav-link:hover,
.header-nav-link.active {
  color: var(--text);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1;
}

.theme-toggle:hover {
  color: var(--text);
  background: var(--bg-subtle);
}

.theme-sun,
.theme-moon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.theme-label {
  white-space: nowrap;
}

@media (max-width: 719px) {
  .theme-label {
    display: none;
  }
}

.header-mobile-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text);
  padding: 0;
  margin-left: 4px;
}

.mobile-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 719px) {
  .header-mobile-btn {
    display: flex;
  }
}

/* Mobile menu */
.mobile-menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.mobile-menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
}

html.dark .mobile-menu-overlay {
  background: rgba(10,10,10,0.9);
}

.mobile-menu {
  position: absolute;
  top: 52px;
  left: 12px;
  right: 12px;
  background: var(--bg);
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
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

.mobile-theme {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}

.mobile-theme .theme-toggle {
  width: 100%;
  justify-content: center;
}

/* Transition */
.mobile-fade-enter-active,
.mobile-fade-leave-active {
  transition: opacity 0.25s ease;
}

.mobile-fade-enter-from,
.mobile-fade-leave-to {
  opacity: 0;
}

@media (max-width: 719px) {
  .header {
    height: 48px;
  }
  .header-inner {
    padding: 0 1rem;
  }
}

@media (min-width: 720px) {
  .mobile-menu-wrap {
    display: none !important;
  }
}
</style>
