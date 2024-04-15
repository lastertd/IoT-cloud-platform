<template>
  <div class="flex items-center justify-center gap-8">
    <div class="basis-2/5 select-none flex flex-col justify-center items-center gap-4">
      <h1 class="font-bold text-4xl">绝缘子云平台</h1>
      <img src="/public/images/symbol.png" alt="" class="drop-shadow-lg" />
    </div>
    <login-register-card class="basis-3/5" />
  </div>
</template>

<script setup lang="ts">
import LoginRegisterCard from "~/pages/login/components/loginRegisterCard.vue";

definePageMeta({
  name: "登录/注册",
  main: true,
  header: true,
  footer: true
});
</script>
