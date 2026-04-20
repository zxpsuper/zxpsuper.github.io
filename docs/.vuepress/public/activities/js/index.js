let activities = []

function loadActivities() {
  const storedActivities = getActivities()
  if (storedActivities.length > 0) {
    renderActivities(storedActivities)
  } else {
    loadRemoteActivities(renderActivities)
  }
}

function renderActivities(data) {
  activities = data
  const listEl = document.getElementById('activity-list')
  const emptyEl = document.getElementById('empty-tip')

  if (activities.length === 0) {
    listEl.style.display = 'none'
    emptyEl.style.display = 'block'
    return
  }

  listEl.style.display = 'flex'
  emptyEl.style.display = 'none'

  listEl.innerHTML = activities.map(item => `
    <div class="activity-card card" onclick="goToDetail('${item.id}')">
      <div class="card-image">
        ${item.images && item.images.length > 0 
          ? `<img src="${item.images[0]}" class="activity-image" alt="">`
          : `<div class="image-placeholder"><span>暂无图片</span></div>`
        }
        <div class="like-section" onclick="event.stopPropagation(); toggleLike('${item.id}')">
          <span class="like-icon ${item.liked ? 'liked' : ''}">❤</span>
          <span class="like-count">${item.likeCount}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.description}</div>
      </div>
    </div>
  `).join('')
}

function goToDetail(id) {
  navigateTo(`activity-detail.html?id=${id}`)
}

function toggleLike(id) {
  toggleActivityLike(id)
  
  activities = activities.map(item => {
    if (item.id === id) {
      return {
        ...item,
        liked: !item.liked,
        likeCount: item.liked ? item.likeCount - 1 : item.likeCount + 1
      }
    }
    return item
  })
  
  saveActivities(activities)
  renderActivities(activities)
}

function initTabBar() {
  const tabItems = document.querySelectorAll('.tab-item')
  tabItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page
      if (page === 'index') {
        navigateTo('index.html')
      } else if (page === 'mine') {
        navigateTo('mine.html')
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadActivities()
  initTabBar()
})
