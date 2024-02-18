<template>
  <div>
    <n-button id="giao" type="info" @click="handleClick">
      {{ content  }}
    </n-button>
  </div>
</template>

<script setup>
const content = ref("讲解")
const handleClick = () => {
  $message.success(
    'This is a success message',
      {duration:10000}
    );
  content.value="取消讲解";
  setTimeout(() => {
    content.value="讲解";
  }, 15000);
  console.log('clicked')
}
</script>

<style>
/* Add your styles here */

</style>
