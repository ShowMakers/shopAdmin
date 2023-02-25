<template>
  <div class="Fheader">
    <n-icon size="20" class="cursor-pointer" @click="appStore.switchCollapsed">
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
      <n-icon class="mr-5 cursor-pointer" size="18" @click="toggleDark">
        <icon-mdi-moon-waning-crescent v-if="isDark" />
        <icon-mdi-white-balance-sunny v-else />
      </n-icon>
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
    <n-drawer v-model:show="active" style="width:30%" :placement="'right'">
      <n-drawer-content title="修改密码">
        <n-form ref="passwordRef" :model="passwordForm" :rules="passwordRules" label-placement="left"  :label-width="80">
        <n-form-item path="old" label="旧密码">
          <n-input type="password" showPasswordOn="click" v-model:value="passwordForm.old" placeholder="请输入密码" />
        </n-form-item>
         <n-form-item path="new" label="新密码">
          <n-input type="password" showPasswordOn="click" v-model:value="passwordForm.new" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item path="confirm" label="确认密码">
          <n-input type="password" showPasswordOn="click" v-model:value="passwordForm.confirm" placeholder="请输入密码" />
        </n-form-item>
      </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/store';
import { renderIcon } from '@/utils/icon'
import { useFullscreen, useDark, useToggle } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
//是否展示抽屉
const active = ref(false);

//芜湖
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
    label: '修改密码',
    key: 'password',
    icon: renderIcon('mdi-form-textbox-password', { size: '14px' }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]

//下拉选择
function handleSelect(key) {
  switch (key) {
    case 'logout':
      $dialog.confirm({
        type:"info",
        title:"警告",
        content: '确认退出？',
        confirm() {
              userStore.LogOut();
          $message.success('已退出登录');
          location.href = '/login';
        },
        cancel() {
          $message.warning('已取消')
        },
      })
      break
    case 'password':
      active.value = true;
      break
  }
}

//切换模式
const isDark = useDark();
const toggleDark = () => {
  appStore.toggleDark();
  useToggle(isDark)();
}

const passwordRef = ref(null);
const passwordForm = reactive({
  new: undefined,
  old:undefined,
  confirm:undefined
});
const passwordRules = {
  new: { required: true, trigger: "blur", message: "请输入您的密码" },
  old: { required: true, trigger: "blur", message: "请输入您的密码" },
  confirm: { required: true, trigger: "blur", message: "请输入您的密码" },
};
</script>

<style lang="scss" scoped>
.Fheader {
  height: 64px;
  @apply flex items-center;
}
</style>