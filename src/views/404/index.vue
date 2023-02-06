<template>
    <n-result
        status="404"
        title="您要找的页面丢失了"
        description="在它变成错误以前一般不会有人管它"
      >
        <template #footer>
          <a-button  @click="$router.push('/')">返回首页</a-button>
        </template>
      </n-result>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>