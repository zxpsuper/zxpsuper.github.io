<template>
  <div id="vuepress-theme-blog__global-layout" v-image-preview v-context-menu>
    <div class="bp-bg-pattern" aria-hidden="true">
      <div class="bp-bg-side bp-bg-left"></div>
      <div class="bp-bg-side bp-bg-right"></div>
    </div>

    <Header />
    <div class="content-wrapper">
      <DefaultGlobalLayout />
    </div>
    <Footer />
  </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout.vue'
import Header from '@theme/components/Header.vue'
import Footer from '@theme/components/Footer.vue'

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Header,
    Footer,
  },
}
</script>

<style lang="stylus">
#vuepress-theme-blog__global-layout
  word-wrap break-word
  display flex
  flex-direction column
  min-height 100vh

.content-wrapper
  flex 1
  padding-top 56px

  @media (max-width: $MQMobile)
    &
      padding-top 48px
</style>

<!-- kai.bi background pattern -->
<style>
.bp-bg-pattern {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}
.bp-bg-side {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
}
.bp-bg-left { left: 0; background: var(--bg-subtle); }
.bp-bg-right { right: 0; background: var(--bg-subtle); }

/* Gradient fade to center */
.bp-bg-left::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to left, var(--bg) 0%, var(--bg) 15%, transparent 55%);
}
.bp-bg-right::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to right, var(--bg) 0%, var(--bg) 15%, transparent 55%);
}

/* Grid pattern */
.bp-bg-left::after,
.bp-bg-right::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.4;
}
.bp-bg-left::after,
.bp-bg-right::after {
  background-image:
    /* vertical lines */
    repeating-linear-gradient(
      to right,
      transparent,
      transparent 29px,
      var(--border) 29px,
      var(--border) 30px
    ),
    /* horizontal lines */
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 29px,
      var(--border) 29px,
      var(--border) 30px
    );
}

@media (min-width: 640px) {
  .bp-bg-left::after,
  .bp-bg-right::after {
    background-image:
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 44px,
        var(--border) 44px,
        var(--border) 45px
      ),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 44px,
        var(--border) 44px,
        var(--border) 45px
      );
  }
}
@media (min-width: 768px) {
  .bp-bg-left::after,
  .bp-bg-right::after {
    background-image:
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 59px,
        var(--border) 59px,
        var(--border) 60px
      ),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 59px,
        var(--border) 59px,
        var(--border) 60px
      );
  }
}
@media (min-width: 1280px) {
  .bp-bg-left::after,
  .bp-bg-right::after {
    background-image:
      repeating-linear-gradient(
        to right,
        transparent,
        transparent 87px,
        var(--border) 87px,
        var(--border) 88px
      ),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 87px,
        var(--border) 87px,
        var(--border) 88px
      );
  }
}
</style>
