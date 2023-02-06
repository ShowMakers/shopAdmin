<template>
    <div>
      后台首页
    {{ store.userInfo }}
    </div>
</template>

<script setup>
import { useUserStore } from '@/store';

const store = useUserStore();
</script>

<style lang="scss" scoped>

</style>