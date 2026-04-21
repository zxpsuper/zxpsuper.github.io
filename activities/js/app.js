let currentActivity = null
let currentPage = 'index'
let previousPage = 'index'

function updateUrl(page, id = null) {
  let hash = page
  if (page === 'detail' && id) {
    hash = `detail/${id}`
  }
  window.location.hash = hash
}

function parseUrl() {
  const hash = window.location.hash.slice(1) || 'index'
  const parts = hash.split('/')
  const page = parts[0]
  const id = parts[1] || null
  return { page, id }
}

function switchPage(page, id = null, updateHash = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'))
  
  document.getElementById(`page-${page}`).classList.add('active')
  
  if (page === 'index' || page === 'mine') {
    const tabItem = document.querySelector(`.tab-item[data-page="${page}"]`)
    if (tabItem) tabItem.classList.add('active')
  }
  
  currentPage = page
  
  if (updateHash) {
    updateUrl(page, id)
  }
  
  if (page === 'index') {
    loadActivities()
  } else if (page === 'mine') {
    loadActivityCount()
  } else if (page === 'detail' && id) {
    loadActivity(id)
  }
}

function goBack() {
  if (previousPage === 'detail') {
    switchPage('index')
  } else {
    switchPage(previousPage)
  }
}

function goToDetail(id) {
  previousPage = currentPage
  switchPage('detail', id)
}

function handleHashChange() {
  const { page, id } = parseUrl()
  
  if (page === 'detail' && id) {
    previousPage = 'index'
    switchPage('detail', id, false)
  } else if (page === 'mine' || page === 'index') {
    switchPage(page, null, false)
  } else {
    switchPage('index', null, false)
  }
}

function loadActivities() {
  const activities = getActivities()
  renderActivities(activities)
}

function renderActivities(activities) {
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

function loadActivity(id) {
  const activities = getActivities()
  const activity = activities.find(item => item.id === id)
  if (activity) {
    currentActivity = {
      ...activity,
      liked: isActivityLiked(id)
    }
    renderActivity()
  }
}

function renderActivity() {
  const activity = currentActivity

  const swiperEl = document.getElementById('image-swiper')
  const noImageEl = document.getElementById('no-image')
  
  if (activity.images && activity.images.length > 0) {
    swiperEl.style.display = 'block'
    noImageEl.style.display = 'none'
    swiperEl.innerHTML = activity.images.map(img => `
      <img src="${img}" class="swiper-image" alt="">
    `).join('')
  } else {
    swiperEl.style.display = 'none'
    noImageEl.style.display = 'flex'
  }

  document.getElementById('detail-title').textContent = activity.title
  document.getElementById('like-icon').className = `like-icon ${activity.liked ? 'liked' : ''}`
  document.getElementById('like-count').textContent = activity.likeCount
  document.getElementById('detail-desc').textContent = activity.description
}

function toggleLike(id) {
  if (id) {
    toggleActivityLike(id)
    
    const activities = getActivities().map(item => {
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
  } else if (currentActivity) {
    toggleActivityLike(currentActivity.id)
    
    currentActivity = {
      ...currentActivity,
      liked: !currentActivity.liked,
      likeCount: currentActivity.liked ? currentActivity.likeCount - 1 : currentActivity.likeCount + 1
    }

    const activities = getActivities().map(item => {
      if (item.id === currentActivity.id) {
        return currentActivity
      }
      return item
    })
    saveActivities(activities)
    
    renderActivity()
  }
}

function loadActivityCount() {
  const activities = getActivities()
  document.getElementById('activity-count').textContent = `${activities.length} 个`
}

function openPhoneModal() {
  document.getElementById('nickname-input').value = ''
  document.getElementById('phone-input').value = ''
  document.getElementById('phone-modal').style.display = 'flex'
}

function closePhoneModal() {
  document.getElementById('phone-modal').style.display = 'none'
}

function confirmReservation() {
  const nickname = document.getElementById('nickname-input').value.trim()
  const phone = document.getElementById('phone-input').value.trim()

  if (!nickname && !phone) {
    alert('昵称和手机号码至少填写一个')
    return
  }

  let content = '## 活动预约信息\n\n'
  content += `### 活动信息：${currentActivity.title}\n`
  content += `- 描述：${currentActivity.description}\n`
  content += `- 点赞数：${currentActivity.likeCount}\n\n`
  content += `### 预约用户：\n`
  content += `- 昵称：${nickname || '未填写'}\n`
  content += `- 手机：${phone || '未填写'}\n`
  content += `- 时间：${new Date().toLocaleString()}`

  const targetUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=40c4694c-10b2-4016-9851-98f9bafe2665'
  
  fetch(`https://cors.eu.org/${targetUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: {
        content: content
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.errcode === 0) {
      console.log('发送成功')
      alert('预约成功！')
      closePhoneModal()
    } else {
      throw new Error(data.errmsg || '未知错误')
    }
  })
  .catch(error => {
    console.error('发送失败:', error)
    alert('预约失败，请稍后重试')
  })
}

function openFeedbackModal() {
  document.getElementById('feedback-contact').value = ''
  document.getElementById('feedback-content').value = ''
  document.getElementById('feedback-modal').style.display = 'flex'
}

function closeFeedbackModal() {
  document.getElementById('feedback-modal').style.display = 'none'
}

function submitFeedback() {
  const contact = document.getElementById('feedback-contact').value.trim()
  const content = document.getElementById('feedback-content').value.trim()

  if (!contact && !content) {
    alert('联系方法和想说的话至少填写一个')
    return
  }

  let messageContent = '## 用户反馈\n\n'
  messageContent += `### 联系方法：${contact || '未填写'}\n`
  messageContent += `### 想说的话：\n${content || '未填写'}\n\n`
  messageContent += `- 时间：${new Date().toLocaleString()}`

  const targetUrl = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=40c4694c-10b2-4016-9851-98f9bafe2665'
  
  fetch(`https://cors.eu.org/${targetUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: {
        content: messageContent
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.errcode === 0) {
      console.log('发送成功')
      alert('提交成功！')
      closeFeedbackModal()
    } else {
      throw new Error(data.errmsg || '未知错误')
    }
  })
  .catch(error => {
    console.error('发送失败:', error)
    alert('提交失败，请稍后重试')
  })
}

function initEventListeners() {
  document.getElementById('like-section').addEventListener('click', () => toggleLike())
  document.getElementById('reserve-btn').addEventListener('click', openPhoneModal)
  document.getElementById('cancel-btn').addEventListener('click', closePhoneModal)
  document.getElementById('confirm-btn').addEventListener('click', confirmReservation)
  document.getElementById('phone-modal').addEventListener('click', (e) => {
    if (e.target.id === 'phone-modal') {
      closePhoneModal()
    }
  })
  document.getElementById('feedback-cancel-btn').addEventListener('click', closeFeedbackModal)
  document.getElementById('feedback-confirm-btn').addEventListener('click', submitFeedback)
  document.getElementById('feedback-modal').addEventListener('click', (e) => {
    if (e.target.id === 'feedback-modal') {
      closeFeedbackModal()
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadRemoteActivities((activities) => {
    handleHashChange()
  })
  initEventListeners()
  
  window.addEventListener('hashchange', handleHashChange)
})
