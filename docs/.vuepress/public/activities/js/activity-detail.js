let currentActivity = null
let showPhoneModal = false
let inputNickname = ''
let phoneNumber = ''

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

function toggleLike() {
  if (!currentActivity) return

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

function openPhoneModal() {
  showPhoneModal = true
  inputNickname = ''
  phoneNumber = ''
  document.getElementById('nickname-input').value = ''
  document.getElementById('phone-input').value = ''
  document.getElementById('phone-modal').style.display = 'flex'
}

function closePhoneModal() {
  showPhoneModal = false
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

function initEventListeners() {
  document.getElementById('like-section').addEventListener('click', toggleLike)
  document.getElementById('reserve-btn').addEventListener('click', openPhoneModal)
  document.getElementById('cancel-btn').addEventListener('click', closePhoneModal)
  document.getElementById('confirm-btn').addEventListener('click', confirmReservation)
  document.getElementById('phone-modal').addEventListener('click', (e) => {
    if (e.target.id === 'phone-modal') {
      closePhoneModal()
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const params = getUrlParams()
  if (params.id) {
    loadActivity(params.id)
  }
  initEventListeners()
})
