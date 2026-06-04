const NS = 'bp-image-viewer'

let viewer = null
let images = []
let currentIndex = 0
let scale = 1
let translateX = 0
let translateY = 0
let isDragging = false
let dragStartX = 0
let dragStartY = 0
let translateStartX = 0
let translateStartY = 0

const SCALE_MIN = 0.2
const SCALE_MAX = 6
const SCALE_STEP = 0.2

function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

function createViewer() {
  if (viewer) return viewer

  viewer = document.createElement('div')
  viewer.className = NS
  viewer.setAttribute('role', 'dialog')
  viewer.setAttribute('aria-modal', 'true')
  viewer.innerHTML = `
    <div class="${NS}-mask" data-bp-action="close"></div>
    <button class="${NS}-btn ${NS}-close" data-bp-action="close" aria-label="关闭" type="button">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <button class="${NS}-btn ${NS}-prev" data-bp-action="prev" aria-label="上一张" type="button">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button class="${NS}-btn ${NS}-next" data-bp-action="next" aria-label="下一张" type="button">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
    <div class="${NS}-counter" aria-live="polite"></div>
    <div class="${NS}-stage">
      <div class="${NS}-img-wrap">
        <img class="${NS}-img" alt="" draggable="false" />
      </div>
    </div>
    <div class="${NS}-hint">
      <span>← → 切换</span>
      <span>滚轮缩放</span>
      <span>ESC 关闭</span>
    </div>
  `

  document.body.appendChild(viewer)

  viewer.addEventListener('click', onViewerClick)
  viewer.addEventListener('wheel', onWheel, { passive: false })
  viewer.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('resize', onResize)

  return viewer
}

function getImgWrap() {
  return viewer.querySelector(`.${NS}-img-wrap`)
}

function getImg() {
  return viewer.querySelector(`.${NS}-img`)
}

function getCounter() {
  return viewer.querySelector(`.${NS}-counter`)
}

function getStage() {
  return viewer.querySelector(`.${NS}-stage`)
}

function applyTransform() {
  const wrap = getImgWrap()
  if (!wrap) return
  wrap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
}

function resetTransform() {
  scale = 1
  translateX = 0
  translateY = 0
  applyTransform()
}

function fitToStage() {
  const img = getImg()
  const stage = getStage()
  if (!img || !stage || !img.naturalWidth) return
  const sw = stage.clientWidth
  const sh = stage.clientHeight
  const ratio = Math.min(sw / img.naturalWidth, sh / img.naturalHeight, 1)
  scale = ratio
  translateX = 0
  translateY = 0
  applyTransform()
}

function updateCounter() {
  const counter = getCounter()
  if (!counter) return
  if (images.length <= 1) {
    counter.textContent = ''
    counter.style.display = 'none'
  } else {
    counter.style.display = ''
    counter.textContent = `${currentIndex + 1} / ${images.length}`
  }
}

function show(index) {
  const img = getImg()
  if (!img) return
  if (index < 0) index = images.length - 1
  if (index >= images.length) index = 0
  currentIndex = index
  img.src = images[currentIndex]
  img.alt = `图片 ${currentIndex + 1}`
  resetTransform()
  updateCounter()
  const prevBtn = viewer.querySelector(`.${NS}-prev`)
  const nextBtn = viewer.querySelector(`.${NS}-next`)
  if (images.length <= 1) {
    prevBtn.style.display = 'none'
    nextBtn.style.display = 'none'
  } else {
    prevBtn.style.display = ''
    nextBtn.style.display = ''
  }
  if (img.complete && img.naturalWidth) {
    fitToStage()
  } else {
    img.onload = () => fitToStage()
  }
}

function onKeyDown(e) {
  if (!viewer || !viewer.classList.contains('is-active')) return
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
    e.preventDefault()
    show(currentIndex - 1)
  } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
    e.preventDefault()
    show(currentIndex + 1)
  } else if (e.key === '+' || e.key === '=' || e.keyCode === 187) {
    e.preventDefault()
    zoomBy(SCALE_STEP)
  } else if (e.key === '-' || e.keyCode === 189) {
    e.preventDefault()
    zoomBy(-SCALE_STEP)
  } else if (e.key === '0' || e.keyCode === 48) {
    e.preventDefault()
    fitToStage()
  }
}

function onViewerClick(e) {
  if (!viewer.classList.contains('is-active')) return
  const target = e.target
  const action = target.closest('[data-bp-action]')
  if (!action) return
  const type = action.getAttribute('data-bp-action')
  if (type === 'close') {
    e.preventDefault()
    close()
  } else if (type === 'prev') {
    e.preventDefault()
    show(currentIndex - 1)
  } else if (type === 'next') {
    e.preventDefault()
    show(currentIndex + 1)
  }
}

function zoomBy(delta) {
  const newScale = clamp(scale + delta, SCALE_MIN, SCALE_MAX)
  if (newScale === scale) return
  scale = newScale
  applyTransform()
}

function onWheel(e) {
  if (!viewer.classList.contains('is-active')) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP
  zoomBy(delta)
}

function onMouseDown(e) {
  if (!viewer.classList.contains('is-active')) return
  if (e.button !== 0) return
  const img = getImg()
  if (!img || !img.contains(e.target)) return
  if (scale <= 1.01) return
  isDragging = true
  dragStartX = e.clientX
  dragStartY = e.clientY
  translateStartX = translateX
  translateStartY = translateY
  viewer.classList.add('is-dragging')
}

function onMouseMove(e) {
  if (!isDragging) return
  translateX = translateStartX + (e.clientX - dragStartX)
  translateY = translateStartY + (e.clientY - dragStartY)
  applyTransform()
}

function onMouseUp() {
  if (!isDragging) return
  isDragging = false
  if (viewer) viewer.classList.remove('is-dragging')
}

function onResize() {
  if (viewer && viewer.classList.contains('is-active')) {
    fitToStage()
  }
}

function onImgDoubleClick(e) {
  if (!viewer.classList.contains('is-active')) return
  e.preventDefault()
  if (scale > 1.01) {
    scale = 1
    translateX = 0
    translateY = 0
  } else {
    scale = 2
  }
  applyTransform()
}

function open(imageList, index) {
  if (!Array.isArray(imageList) || !imageList.length) return
  images = imageList
  createViewer()
  viewer.classList.add('is-active')
  document.body.classList.add('bp-viewer-open')
  show(typeof index === 'number' ? index : 0)
  document.addEventListener('keydown', onKeyDown)
  const img = getImg()
  if (img) img.addEventListener('dblclick', onImgDoubleClick)
}

function close() {
  if (!viewer || !viewer.classList.contains('is-active')) return
  viewer.classList.remove('is-active')
  document.body.classList.remove('bp-viewer-open')
  document.removeEventListener('keydown', onKeyDown)
  const img = getImg()
  if (img) {
    img.removeEventListener('dblclick', onImgDoubleClick)
    img.src = ''
  }
  isDragging = false
  scale = 1
  translateX = 0
  translateY = 0
  images = []
  currentIndex = 0
}

export function openImageViewer(imageList, index) {
  open(imageList, index)
}

export function closeImageViewer() {
  close()
}
