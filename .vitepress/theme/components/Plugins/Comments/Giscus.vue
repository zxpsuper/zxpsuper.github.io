<template>
  <div id="giscusWrapper">
    <div class="giscus" :class="['comment-content', 'twikoo']"></div>
  </div>
</template>

<script setup>


onMounted(() => {
  // 创建 script 元素
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'zxpsuper/zxpsuper.github.io');
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnk5NTMzMzM0OQ==');
  script.setAttribute('data-category', 'Announcements');
  script.setAttribute('data-category-id', 'DIC_kwDOBa6r5c4CevP1');
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', 'https://gw.alipayobjects.com/os/k/t/comment.css');
  script.setAttribute('data-lang', 'zh-CN');
  script.crossOrigin = 'anonymous';
  script.async = true;
  document.querySelector('.giscus').appendChild(script);
});
</script>
