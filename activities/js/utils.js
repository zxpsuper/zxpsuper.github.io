const STORAGE_KEYS = {
  ACTIVITIES: 'h5_activities',
  LIKED_ACTIVITIES: 'h5_likedActivities'
}

function getStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (e) {
    return null
  }
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Storage save error:', e)
  }
}

function getActivities() {
  return getStorage(STORAGE_KEYS.ACTIVITIES) || []
}

function saveActivities(activities) {
  setStorage(STORAGE_KEYS.ACTIVITIES, activities)
}

function getLikedActivities() {
  return getStorage(STORAGE_KEYS.LIKED_ACTIVITIES) || {}
}

function saveLikedActivities(likedActivities) {
  setStorage(STORAGE_KEYS.LIKED_ACTIVITIES, likedActivities)
}

function isActivityLiked(activityId) {
  const likedActivities = getLikedActivities()
  return !!likedActivities[activityId]
}

function toggleActivityLike(activityId) {
  const likedActivities = getLikedActivities()
  if (likedActivities[activityId]) {
    delete likedActivities[activityId]
  } else {
    likedActivities[activityId] = true
  }
  saveLikedActivities(likedActivities)
}

function loadRemoteActivities(callback) {
  const timestamp = Date.now()
  fetch(`https://zxpsuper.netlify.app/activities.json?t=${timestamp}`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const likedActivities = getLikedActivities()
        const activities = data.map(item => ({
          ...item,
          liked: !!likedActivities[item.id],
          likeCount: (item.likeCount || 0) + (likedActivities[item.id] ? 1 : 0)
        }))
        saveActivities(activities)
        if (callback) callback(activities)
      }
    })
    .catch(err => {
      console.error('Load remote activities failed:', err)
      const activities = getActivities()
      if (callback) callback(activities)
    })
}

function getUrlParams() {
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(params)
}

function navigateTo(url) {
  window.location.href = url
}
