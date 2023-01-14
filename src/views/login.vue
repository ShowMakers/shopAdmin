<template>
  <el-row class="login-wrap">
    <el-col :lg="16" :md="12" class="login-left" style="display:flex;">
      <div>
        <div class="text-light-50 font-bold text-5xl mb-4">欢迎光临</div>
        <div class="text-gray-200">山东菏泽曹县牛逼666山东菏泽曹县牛逼666山东菏泽曹县牛逼666</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right" style="display:flex;">
      <h2 class="font-bold text-3xl mt-6">欢迎回来</h2>
      <div class="flex items-center justify-center space-x-2 mt-5 mb-8">
        <span class="h-px w-16 bg-gray-200"></span>
        <span class="text-gray-300 font-normal">账号密码登录</span>
        <span class="h-px w-16 bg-gray-200"></span>
      </div>
      <el-form :model="form" class="w-[250px]">
        <el-form-item>
          <el-input v-model="form.userName" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" show-password v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" @click="onSubmit()" round color="#6172f5">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script setup>
const form = reactive({
  userName: undefined,
  password: undefined
});

//登录
const onSubmit = () =>{
  console.log(1123);
}
</script>

<style lang="scss" scoped>
.login-wrap{
  @apply bg-indigo-500 min-h-screen;
  .login-left{
    @apply flex items-center justify-center; 
  }
  .login-right{
    @apply bg-light-50 flex items-center justify-center flex-col; 
  }
}
</style>