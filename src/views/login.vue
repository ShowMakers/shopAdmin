<template>
  <n-grid class="h-full login-wrap" cols="s:1 m:3 l:4 " item-responsive responsive="screen">
    <n-gi span=" l:3 m:2 s:1" class="login-left">
      <div class="px-10 sm:px-30">
        <div class="mb-6 font-bold leading-tight sm:text-4xl xl:text-5xl text-light-50">欢迎光临</div>
        <div class="font-normal text-gray-200 sm:text-sm xl:text-md">山东菏泽曹县牛逼666山东菏泽曹县牛逼666山东菏泽曹县牛逼666</div>
      </div>
    </n-gi>
    <n-gi span=" l:1 m:1 s:1" class="login-right">
      <h2 class="mt-6 text-3xl font-bold">欢迎回来</h2>
      <div class="flex items-center justify-center mt-5 mb-8 space-x-2">
        <span class="w-16 h-px bg-gray-200"></span>
        <span class="font-normal text-gray-300">账号密码登录</span>
        <span class="w-16 h-px bg-gray-200"></span>
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
          <n-input type="password" showPass wordOn="click" v-model:value="loginForm.password" placeholder="请输入密码">
            <template #prefix>
              <n-icon size="18" color="#808695">
                <LockClosedOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button class="w-[250px]" :loading="loading" @click="onSubmit()" round color="#6172f5">登录</n-button>
        </n-form-item>
      </n-form>
    </n-gi>
  </n-grid>

</template>

<script setup >
import { useUserStore } from '@/store';
import useLoading from '@/hooks/useLoading';
import { PersonOutline, LockClosedOutline, } from '@vicons/ionicons5';
// import { useMessage } from 'naive-ui';

console.log("这是", import.meta.env.MODE == "development" ? "开发" : "线上", "环境");

const router = useRouter();
const store = useUserStore();
// const message = useMessage();
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
/**
 * onSubmit 提交登录表单
 * 当用户点击提交按钮时，此函数将被调用
 * 此函数首先验证表单数据，如果验证通过，则尝试登录
 * 如果登录成功，将显示一条成功消息，并跳转到主页
 * 无论登录是否成功，都将停止显示加载指示器
 */
const onSubmit = async () => {
  // 如果正在加载，直接返回
  if (loading.value) return;

  // 验证表单数据
  const errors = await loginRef.value?.validate();
  
  // 如果没有错误，尝试登录
  if (!errors) {
    setLoading(true);
    try {
      await store.Login(loginForm);
      $message.success("登录成功");
      router.push('/');
    } finally {
      setLoading(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.myclass {
  /**
    这里是全局定义的颜色，可直接使用
    参考https://juejin.cn/post/7058201396113309703#heading-11
  */
  color: $theme-color;
}
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