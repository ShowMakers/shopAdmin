<template>
  <div>
    <el-result
        icon="error"
        title="404"
        sub-title="您要找的页面丢失了"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>