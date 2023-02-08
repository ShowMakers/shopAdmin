<template>
</template>

<script setup>
import { useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui';
window.$dialog = useDialog();
window.$message = useMessage();
window.$loadingBar = useLoadingBar();
window.$notification = useNotification();
</script>

<style lang="scss" scoped>

</style>