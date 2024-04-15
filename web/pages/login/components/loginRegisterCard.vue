<template>
  <div ref="cardRef" class="lr-card">
    <div class="flex-1 p-10 z-10">
      <my-transition name="tra-slideLeftIn--30px" mode="out-in">
        <div v-if="!flag" class="flex flex-col justify-center items-center gap-4 h-full">
          <h1 class="font-bold text-3xl">登录个人账户</h1>
          <el-input placeholder="邮箱" size="large"></el-input>
          <el-input placeholder="密码" size="large"></el-input>
          <el-button type="primary" class="w-1/2" size="large" round>点击登录</el-button>
        </div>
        <div v-else class="flex flex-col justify-center items-center gap-6 h-full text-white">
          <h1 class="font-bold text-3xl">Welcome Back!</h1>
          <p class="text-center">To keep connected with us please login with your personal info</p>
          <button class="lr-button" @click="toggle()">Sign in</button>
        </div>
      </my-transition>
    </div>
    <div class="flex-1 p-10 z-10">
      <my-transition name="tra-slideRightIn--30px" mode="out-in">
        <div v-if="flag" class="flex flex-col justify-center items-center gap-4 h-full">
          <h1 class="font-bold text-3xl">注册新用户</h1>
          <el-input placeholder="邮箱" size="large"></el-input>
          <el-input placeholder="用户名" size="large"></el-input>
          <el-input placeholder="密码" size="large"></el-input>
          <el-input placeholder="确认密码" size="large"></el-input>
          <el-button type="primary" class="w-1/2" size="large" round>点击注册</el-button>
        </div>
        <div v-else class="flex flex-col justify-center items-center gap-6 h-full text-white">
          <h1 class="font-bold text-3xl">Hello, Friend!</h1>
          <p class="text-center">Enter your personal details and start journey with us</p>
          <button class="lr-button" @click="toggle()">Sign up</button>
        </div>
      </my-transition>
    </div>
    <!--    mark-->
    <div
      class="h-full w-1/2 absolute top-0 z-0 left-0"
      style="background: linear-gradient(135deg, #343333, #151414); transition: all 0.4s linear"
      :style="flag ? '' : 'left:100%;transform: translateX(-100%);'"
    ></div>
  </div>
</template>

<script setup lang="ts">
const [flag, toggle] = useToggle(false);
const cardRef = ref<HTMLDivElement>();

useCardEffect(cardRef);
</script>

<style lang="scss">
.lr-button {
  @apply rounded-full py-2 w-1/2 transition-all select-none;
  @apply border border-gray-500;
  &:hover {
    @apply text-black bg-white bg-opacity-90;
  }

  &:active {
    @apply bg-opacity-80;
  }
}

.lr-card {
  @apply h-full bg-white bg-opacity-50 flex rounded-xl drop-shadow-xl overflow-hidden relative;

  height: 430px;
}
</style>
