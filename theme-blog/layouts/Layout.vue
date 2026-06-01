<template>
  <div>
    <BaseListLayout v-if="$pagination || isPageOne" />
    <Content v-else />
  </div>
</template>

<script>
export default {
  computed: {
    isPageOne() {
      return this.$route.path === '/page/1/'
    },
  },
}
</script>
