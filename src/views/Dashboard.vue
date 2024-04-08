<template>
  <div class="overflow-hidden">
    {{ generateRandomText(500) }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const generateRandomText = (length) => {
  // 生成随机字符串
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';
  for (let i = 0; i < length; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomText;
};
</script>

<style>
/* Add your styles here */

</style>
