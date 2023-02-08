<template>
  <n-config-provider :theme="lightTheme" :locale="zhCN" :date-locale="dateZhCN"
                     :theme-override="{ common: { primaryColor: '#409EFE' } }">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <useMessageComponent />
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { lightTheme, zhCN, dateZhCN } from 'naive-ui';
import useMessageComponent from '@/components/useMessageComponent.vue' 

</script>

<style scoped>
.btn {
  @apply bg-purple-500 text-light-500 px-4 py-2 rounded-full duration-500 hover: (bg-purple-900) focus:(ring-8 ring-purple-900);
}
</style>
