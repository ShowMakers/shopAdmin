<script setup>
import { useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui';
import { setupDialog } from '@/utils/naiveTools'
window.$dialog = setupDialog(useDialog());
window.$message = useMessage();
window.$loadingBar = useLoadingBar();
window.$notification = useNotification();
</script>

<style lang="scss" scoped>

</style>