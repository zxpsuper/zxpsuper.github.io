function loadActivityCount() {
  const activities = getActivities()
  document.getElementById('activity-count').textContent = `${activities.length} 个`
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
  loadActivityCount()
  initTabBar()
})
