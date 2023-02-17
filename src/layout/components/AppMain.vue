<template>
  <router-view v-slot="{ Component, route }">
    <!-- <transition name="fade"> -->
      <KeepAlive :include="keepAliveRouteNames">
        <component :is="Component" v-if="appStore.reloadFlag" :key="appStore.aliveKeys[route.name] || route.fullPath" />
        </KeepAlive>
    <!-- </transition> -->
  </router-view>
</template>

<script setup>
import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
const appStore = useAppStore()
const router = useRouter()

const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter((route) => route.meta?.keepAlive).map((route) => route.name)
})
</script>
<style>
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-leave-from{
  opacity :1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.3s;
}
</style>