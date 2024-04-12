<template>
  <div>
    <first-section />
  </div>
</template>

<script setup lang="ts">
import FirstSection from "~/pages/index/components/firstSection.vue";

definePageMeta({
  name: "首页",
  main: true,
  header: true,
  footer: true
});
</script>
