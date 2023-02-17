<template>
  <div class="Fheader">
    <n-icon size="20" cursor-pointer @click="appStore.switchCollapsed">
      <icon-mdi:format-indent-increase v-if="appStore.collapsed" />
      <icon-mdi:format-indent-decrease v-else />
    </n-icon>
    <n-breadcrumb class="ml-4">
      <n-breadcrumb-item v-for="item in route.matched.filter((item) => !!item.meta?.title)" :key="item.path"
                         @click="handleBreadClick(item.path)">
        <component :is="getIcon(item.meta)" />
        {{ item.meta.title }}
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="flex items-center cursor-pointer ml-auto mr-4">
      <n-icon class="mr-5" size="18" style="cursor: pointer" @click="toggle">
        <icon-ant-design:fullscreen-exit-outlined v-if="isFullscreen" />
        <icon-ant-design:fullscreen-outlined v-else />
      </n-icon>
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <div class="flex items-center cursor-pointer">
          <img :src="userStore.userInfo.avatar" class="mr-2 w-9 h-9 rounded-full" />
          <span>
            {{ userStore.userInfo.username }}
          </span>
        </div>
      </n-dropdown>
    </div>
</div>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/store';
import { renderIcon } from '@/utils/icon'
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

function handleBreadClick(path) {
  if (path === route.path) return
  router.push(path)
}

function getIcon(meta) {
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
  return null
}
const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        userStore.LogOut();
        $message.success('已退出登录');
        location.href = '/login';
      },
      onNegativeClick: () => {
        $message.error('不确定')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.Fheader {
  // width: 80vw;
  height: 64px;
  @apply flex items-center bg-indigo-500 text-light-50;
}
</style>