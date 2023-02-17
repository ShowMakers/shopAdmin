<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>

    <article style="width:100%">
      <header>
        <AppHeader />
      </header>
      <section >
        <AppTags  />
      </section>
      <section >
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

<script setup>
import AppHeader from './components/header/index.vue';
import SideBar from './components/sidebar/index.vue';
import AppMain from './components/AppMain.vue';
import AppTags from './components/tags/index.vue';
import { useAppStore } from '@/store'
// import { header, tags } from '~/settings'

const appStore = useAppStore();
const header = reactive({
  height:"60"
});
const tags = reactive({
  visible: true,
  height: 50
})
</script>
