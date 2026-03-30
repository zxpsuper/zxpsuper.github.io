<template>
  <el-popover
    placement="right"
    trigger="hover"
  >
    <template #reference>
      <span
        style="font-weight: 500; color: #d05dd2; text-decoration: underline; cursor: pointer;"
      >
        <slot>点击下载</slot>
      </span>
    </template>

    <img src="/images/myqrcode.jpg" alt="" style="width: 260px; height: 260px;" />
    <div style="text-align: center;">扫码关注回复 “{{ code }}” 获取相关链接</div>
  </el-popover>
</template>
<script>
export default {
  name: "myqrcode",
  props: {
    code: {
      type: String,
      default: "code",
    },
  }
};
</script>

