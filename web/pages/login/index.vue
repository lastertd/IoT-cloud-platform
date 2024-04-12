<template>
  <div>
    <div class="lr-left">11</div>
    <login-register-card class="lr-right" />
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
