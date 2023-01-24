<template>
  <n-grid class="login-wrap" cols="s:1 m:3 l:4 " item-responsive responsive="screen">
    <n-gi span=" l:3 m:2 s:1" class="login-left">
      <div class="px-10 sm:px-30">
        <div class="sm:text-4xl xl:text-5xl font-bold text-light-50 leading-tight mb-6">欢迎光临</div>
        <div class="sm:text-sm xl:text-md text-gray-200 font-normal">山东菏泽曹县牛逼666山东菏泽曹县牛逼666山东菏泽曹县牛逼666</div>
      </div>
    </n-gi>
    <n-gi span=" l:1 m:1 s:1" class="login-right">
      <h2 class="font-bold text-3xl mt-6">欢迎回来</h2>
      <div class="flex items-center justify-center space-x-2 mt-5 mb-8">
        <span class="h-px w-16 bg-gray-200"></span>
        <span class="text-gray-300 font-normal">账号密码登录</span>
        <span class="h-px w-16 bg-gray-200"></span>
      </div>
      <n-form ref="loginRef" :model="loginForm" :rules="loginRules" :show-label="false">
        <n-form-item path="username">
          <n-input v-model:value="loginForm.username" placeholder="请输入用户名">
            <template #prefix>
              <n-icon size="18" color="#808695">
                <PersonOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input type="password" showPasswordOn="click" v-model:value="loginForm.password" placeholder="请输入密码">
            <template #prefix>
              <n-icon size="18" color="#808695">
                <LockClosedOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <el-form-item>
          <n-button class="w-[250px]" :loading="loading" @click="onSubmit()" round color="#6172f5">登录</n-button>
          <n-button class="w-[250px]" :loading="loading">giao啊</n-button>
        </el-form-item>
      </n-form>
    </n-gi>
  </n-grid>

</template>

<script setup >
import { login } from "@/api/login";
import { useMessage, useDialog, useNotification,useLoadingBar  } from 'naive-ui';
import { PersonOutline, LockClosedOutline, } from '@vicons/ionicons5';
import useLoading from '@/hooks/useLoading';

const message = useMessage();
//挂载
window.$dialog = useDialog();
window.$message = useMessage();
window.$loadingBar  = useLoadingBar();
window.$notification = useNotification();
const bar = useLoadingBar();
const { loading, setLoading } = useLoading();

const loginForm = reactive({
  username: undefined,
  password: undefined
});

const loginRules = {
  username: { required: true, trigger: "blur", message: "请输入您的账号" },
  password: { required: true, trigger: "blur", message: "请输入您的密码" },
};

const loginRef = ref(null);

//登录按钮
const onSubmit = () => {
  loginRef.value?.validate(async (errors) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      bar.start();
      try {
        await login(loginForm);
        message.success("登录成功");
      } catch (error) {
      } finally {
        setLoading(false);
        bar.finish();
      }
    }
  });
}
</script>

<style lang="scss" scoped>

.login-wrap {
  @apply bg-indigo-500 min-h-screen;

  .login-left {
    @apply flex items-center justify-center;
  }

  .login-right {
    @apply bg-light-50 flex items-center justify-center flex-col;
  }
}
</style>