<template>
  <div class="p-3">
    <n-tag type="success" closable @close="handleClose">
      不该啊
    </n-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  //接下来使用unocss来代替windicss
  $message.success("tags");
  console.log(window);
}
</script>

<style lang="scss" scoped>

</style>