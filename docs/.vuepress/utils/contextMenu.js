import { openImageViewer } from './imageViewer'
import { downloadImageByUrl } from './index'

const NS = 'bp-context-menu'
const isClient = typeof window !== 'undefined'

// ── State ──────────────────────────────────────────────────────
let menu = null
let visible = false
let activeTarget = null

// ── SVG Icons (16x16, stroke="currentColor") ──────────────────

const icons = {
  copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="10" height="12" rx="1"/><path d="M5 1h7a1 1 0 0 1 1 1v8"/></svg>',
  search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg>',
  speak: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h2l3-3v10L5 10H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/><path d="M10 5.5a4 4 0 0 1 0 5"/><path d="M12 3.5a7 7 0 0 1 0 9"/></svg>',
  eye: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>',
  download: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1v10"/><path d="M4 7l4 4 4-4"/><path d="M2 13h12"/></svg>',
  link: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9a3 3 0 0 0 4.24 0l2.12-2.12a3 3 0 0 0-4.24-4.24L8 3.76"/><path d="M9 7a3 3 0 0 0-4.24 0L2.64 9.12a3 3 0 0 0 4.24 4.24L8 12.24"/></svg>',
  external: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3"/><path d="M9 2h5v5"/><path d="M14 2 8 8"/></svg>',
  share: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="4" cy="8" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><path d="M6 9l4 2"/><path d="M10 5l-4 2"/></svg>',
  arrowUp: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14V3"/><path d="M4 7l4-4 4 4"/></svg>',
  baidu: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M8 12a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2Z"/><path d="M3.5 7.5c-.8-1.5-2-2-2.5-1.5S.5 8 1.5 9"/><path d="M12.5 7.5c.8-1.5 2-2 2.5-1.5s.5 2-.5 3"/><path d="M8 2.5c-.5-.8-1.5-1-2-.5s-.3 1.8.5 2.3"/><path d="M8 2.5c.5-.8 1.5-1 2-.5s.3 1.8-.5 2.3"/></svg>',
  shuffle: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12h3l2-3 2 3h3"/><path d="M1 4h3l2 3 2-3h3"/><path d="M13 2l2 2-2 2"/><path d="M13 10l2 2-2 2"/></svg>',
  list: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="4" x2="14" y2="4"/><line x1="5" y1="8" x2="14" y2="8"/><line x1="5" y1="12" x2="14" y2="12"/><circle cx="2.5" cy="4" r=".5" fill="currentColor"/><circle cx="2.5" cy="8" r=".5" fill="currentColor"/><circle cx="2.5" cy="12" r=".5" fill="currentColor"/></svg>',
  tag: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h5l7 7-5 5-7-7V2z"/><circle cx="4.5" cy="4.5" r=".8" fill="currentColor"/></svg>',
  clock: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5V8l2.5 2"/></svg>',
}

// ── Menu Item Definitions ─────────────────────────────────────
// Each group is an array of items. A separator is rendered between groups.
// condition() determines if the item should show in current context.

function getActiveTarget() { return activeTarget }

const ITEM_GROUPS = [
  // Group 0: Text selection
  [
    { id: 'copy-text', label: '复制文本', icon: icons.copy, condition: () => hasSelection(), action: () => copySelectedText() },
    { id: 'search-baidu', label: '百度搜索', icon: icons.baidu, condition: () => hasSelection(), action: () => searchSelected('baidu') },
    { id: 'search-google', label: 'Google 搜索', icon: icons.search, condition: () => hasSelection(), action: () => searchSelected('google') },
    { id: 'read-aloud', label: '朗读文本', icon: icons.speak, condition: () => hasSelection() && 'speechSynthesis' in window, action: () => readAloud() },
  ],
  // Group 1: Images
  [
    { id: 'view-image', label: '查看图片', icon: icons.eye, condition: () => isImage(), action: () => viewImage() },
    { id: 'download-image', label: '下载图片', icon: icons.download, condition: () => isImage(), action: () => downloadActiveImage() },
    { id: 'copy-image-url', label: '复制图片链接', icon: icons.link, condition: () => isImage(), action: () => copyImageUrl() },
    { id: 'open-image-tab', label: '在新标签页打开', icon: icons.external, condition: () => isImage(), action: () => openInNewTab(activeTarget.currentSrc || activeTarget.src) },
  ],
  // Group 2: Links
  [
    { id: 'open-link-tab', label: '在新标签页打开', icon: icons.external, condition: () => isLink(), action: () => openInNewTab(getLinkHref()) },
    { id: 'copy-link-url', label: '复制链接地址', icon: icons.link, condition: () => isLink(), action: () => copyToClipboard(getLinkHref()) },
  ],
  // Group 3: Article header
  [
    { id: 'copy-article-link', label: '复制文章链接', icon: icons.link, condition: () => isInArticleHeader(), action: () => copyToClipboard(window.location.href) },
    { id: 'share-article', label: '分享文章', icon: icons.share, condition: () => isInArticleHeader(), action: () => shareArticle() },
  ],
  // Group 4: Global (always shown as the last group)
  [
    { id: 'back-to-top', label: '返回顶部', icon: icons.arrowUp, action: () => backToTop() },
    { id: 'random-article', label: '随机文章', icon: icons.shuffle, action: () => goToRandomArticle() },
    { id: 'go-to-tags', label: '标签列表', icon: icons.tag, action: () => goToTags() },
    { id: 'go-to-timeline', label: '时间线', icon: icons.clock, action: () => goToTimeline() },
    { id: 'go-to-posts', label: '文章列表', icon: icons.list, action: () => goToPosts() },
    { id: 'copy-page-url', label: '复制页面链接', icon: icons.link, action: () => copyPageUrl() },
  ],
]

// ── Context Detection ─────────────────────────────────────────

function hasSelection() {
  const sel = window.getSelection()
  return sel && sel.toString().trim().length > 0
}

function isImage() {
  return activeTarget && activeTarget.tagName === 'IMG' && activeTarget.closest('.bp-post-content')
}

function isLink() {
  if (!activeTarget) return false
  // Check if the target is inside an <a>, but NOT in article header
  const link = activeTarget.closest('a')
  if (!link || !link.href) return false
  // If the link is inside article header, prefer header context
  if (link.closest('.bp-post-header')) return false
  return true
}

function isInArticleHeader() {
  return activeTarget && activeTarget.closest('.bp-post-header')
}

function getContextType() {
  if (!activeTarget) return 'global'

  // Priority: image inside link → link (if link is not in header)
  // We check link first since images can be inside <a>
  const link = activeTarget.closest('a')
  if (link && link.href && !link.closest('.bp-post-header')) {
    return 'link'
  }

  if (isImage()) return 'image'
  if (isInArticleHeader()) return 'header'
  if (hasSelection()) return 'text'
  return 'global'
}

// ── Helpers ───────────────────────────────────────────────────

function getLinkHref() {
  const link = activeTarget && activeTarget.closest('a')
  return link ? link.href : ''
}

// ── Menu DOM ──────────────────────────────────────────────────

function createMenu() {
  if (!isClient) return null
  if (menu) return menu

  menu = document.createElement('div')
  menu.className = NS
  menu.setAttribute('role', 'menu')
  menu.innerHTML = `<div class="${NS}-inner"></div>`
  document.body.appendChild(menu)
  return menu
}

function buildMenuItems() {
  const inner = menu.querySelector(`.${NS}-inner`)
  inner.innerHTML = ''

  const contextType = getContextType()

  // Determine which groups to show based on context type
  const groupIndices = {
    text: [0, 4],
    image: [1, 4],
    link: [2, 4],
    header: [3, 4],
    global: [4],
  }

  const indicesToShow = groupIndices[contextType] || [4]
  let firstGroup = true

  indicesToShow.forEach((gi) => {
    const group = ITEM_GROUPS[gi]
    const visibleItems = group.filter((item) => !item.condition || item.condition())
    if (visibleItems.length === 0) return

    if (!firstGroup) {
      const hr = document.createElement('hr')
      hr.className = `${NS}-separator`
      inner.appendChild(hr)
    }
    firstGroup = false

    visibleItems.forEach((item) => {
      const btn = document.createElement('button')
      btn.className = `${NS}-item`
      btn.setAttribute('data-bp-action', item.id)
      btn.setAttribute('role', 'menuitem')
      btn.type = 'button'

      if (item.icon) {
        const iconWrap = document.createElement('span')
        iconWrap.className = `${NS}-icon`
        iconWrap.innerHTML = item.icon
        btn.appendChild(iconWrap)
      }

      const label = document.createElement('span')
      label.className = `${NS}-label`
      label.textContent = item.label
      btn.appendChild(label)

      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        closeMenu()
        item.action(e, activeTarget)
      })

      inner.appendChild(btn)
    })
  })
}

// ── Positioning ───────────────────────────────────────────────

function positionMenu(x, y) {
  if (!menu) return

  // Force layout to get dimensions
  menu.style.left = '0'
  menu.style.top = '0'
  menu.style.visibility = 'hidden'
  menu.classList.add('is-active')

  const menuWidth = menu.offsetWidth
  const menuHeight = menu.offsetHeight
  const vw = window.innerWidth
  const vh = window.innerHeight

  menu.style.visibility = ''
  menu.classList.remove('is-active')

  const gap = 8
  let left = x
  let top = y

  // Flip horizontally if too close to right edge
  if (left + menuWidth > vw - gap) {
    left = x - menuWidth
  }

  // Flip vertically if too close to bottom edge
  if (top + menuHeight > vh - gap) {
    top = y - menuHeight
  }

  // Clamp to viewport
  left = Math.max(gap, Math.min(left, vw - menuWidth - gap))
  top = Math.max(gap, Math.min(top, vh - gap))

  menu.style.left = `${left}px`
  menu.style.top = `${top}px`
}

// ── Event Handlers ────────────────────────────────────────────

function onContextMenu(e) {
  if (!isClient) return

  activeTarget = e.target

  // Prevent default browser menu
  e.preventDefault()
  e.stopPropagation()

  createMenu()
  buildMenuItems()

  const inner = menu.querySelector(`.${NS}-inner`)
  if (!inner || inner.children.length === 0) {
    activeTarget = null
    return
  }

  positionMenu(e.clientX, e.clientY)

  // Show with animation
  menu.classList.add('is-active')
  visible = true
}

function onDocumentClick(e) {
  if (!visible || !menu) return
  if (menu.contains(e.target)) return
  closeMenu()
}

function onKeyDown(e) {
  if (!visible) return
  if (e.key === 'Escape') {
    closeMenu()
    e.preventDefault()
  }
}

function onScroll() {
  if (visible) closeMenu()
}

function onResize() {
  if (visible) closeMenu()
}

// ── Open / Close ──────────────────────────────────────────────

function closeMenu() {
  if (!menu || !visible) return
  menu.classList.remove('is-active')
  visible = false
  activeTarget = null
}

// ── Action Functions ──────────────────────────────────────────

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
  } else {
    fallbackCopy(text)
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  ta.style.pointerEvents = 'none'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } catch (e) {
    // ignore
  }
  document.body.removeChild(ta)
}

function copySelectedText() {
  const sel = window.getSelection()
  if (sel) copyToClipboard(sel.toString())
}

function searchSelected(engine) {
  const sel = window.getSelection()
  if (!sel || !sel.toString().trim()) return
  const q = encodeURIComponent(sel.toString().trim())
  const url = engine === 'baidu'
    ? `https://www.baidu.com/s?wd=${q}`
    : `https://www.google.com/search?q=${q}`
  window.open(url, '_blank', 'noopener')
}

function readAloud() {
  if (!('speechSynthesis' in window)) return
  const sel = window.getSelection()
  if (!sel || !sel.toString().trim()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(sel.toString().trim())
  utterance.lang = 'zh-CN'
  utterance.rate = 1.0
  window.speechSynthesis.speak(utterance)
}

function viewImage() {
  if (!activeTarget || activeTarget.tagName !== 'IMG') return
  const container = activeTarget.closest('.bp-post-content')
  if (!container) return
  const imgs = Array.from(container.querySelectorAll('img'))
    .filter((img) => !img.closest('a'))
  const idx = imgs.indexOf(activeTarget)
  if (idx === -1) return
  openImageViewer(
    imgs.map((img) => img.currentSrc || img.src),
    idx,
  )
}

function downloadActiveImage() {
  if (!activeTarget || activeTarget.tagName !== 'IMG') return
  const src = activeTarget.currentSrc || activeTarget.src
  const name = src.split('/').pop() || 'image.png'
  downloadImageByUrl(src, name)
}

function copyImageUrl() {
  if (!activeTarget || activeTarget.tagName !== 'IMG') return
  copyToClipboard(activeTarget.currentSrc || activeTarget.src)
}

function openInNewTab(url) {
  if (!url) return
  window.open(url, '_blank', 'noopener')
}

function shareArticle() {
  const titleEl = document.querySelector('.bp-post-title')
  const title = titleEl ? titleEl.textContent.trim() : ''
  const text = title
    ? `${title} - 分享自小皮咖博客`
    : '分享自小皮咖博客'
  copyToClipboard(`${text}\n${window.location.href}`)
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToRandomArticle() {
  // Fetch the search index to get all article links
  fetch('/search.json')
    .then(function (r) { return r.json() })
    .then(function (data) {
      // search.json is an array of { path, title, ... }
      if (data && data.length > 0) {
        var random = data[Math.floor(Math.random() * data.length)]
        window.location.href = random.path || '/'
      } else {
        window.location.href = '/archives/'
      }
    })
    .catch(function () {
      window.location.href = '/archives/'
    })
}

function goToTags() {
  window.location.href = '/tag/'
}

function goToTimeline() {
  window.location.href = '/archives/'
}

function goToPosts() {
  window.location.href = '/page/1/'
}

function copyPageUrl() {
  copyToClipboard(window.location.href)
}

// ── Event Registration / Teardown ─────────────────────────────

function registerEvents() {
  if (!isClient) return
  document.addEventListener('contextmenu', onContextMenu, false)
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('keydown', onKeyDown, false)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, false)
}

function unregisterEvents() {
  if (!isClient) return
  document.removeEventListener('contextmenu', onContextMenu)
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
}

// ── Public API ────────────────────────────────────────────────

export function initContextMenu() {
  if (!isClient) return
  registerEvents()
}

export function destroyContextMenu() {
  if (!isClient) return
  unregisterEvents()
  if (menu) {
    menu.remove()
    menu = null
  }
  visible = false
  activeTarget = null
}
