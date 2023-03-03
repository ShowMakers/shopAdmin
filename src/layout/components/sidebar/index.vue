<template>
  <!-- <n-menu
    ref="menu"
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    :value="activeKey"
    @update:value="handleMenuSelect"
  /> -->
  <router-link class="flex justify-center content-center" to="/">
    <!-- <icon-custom-logo text-36 color-primary></icon-custom-logo> -->
    <h2 v-show="!appStore.collapsed" class="text-2xl  font-bold max-w-140 flex-shrink-0">
      {{ 'VUE ADMIN' }}
    </h2>
  </router-link>
  <n-menu class="side-menu" :indent="18" accordion :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
</template>

<script setup>
import { useAppStore } from '@/store';
import { isExternal } from '@/utils/is';
import { renderIcon } from '@/utils/icon';
const router = useRouter()

const appStore = useAppStore()

const menuOptions = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon('mdi:home', { size: 18 })
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon('eos-icons:cluster-management'),
    children: [
      {
        label: "鼠",
        key: "rat"
      }
    ]
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    icon: renderIcon()
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon(),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon()
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon()
          }
        ]
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon(),
        children: [
          {
            label: "威士忌",
            key: "whisky"
          }
        ]
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich"
          }
        ]
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes"
      }
    ]
  }
];
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }

    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
