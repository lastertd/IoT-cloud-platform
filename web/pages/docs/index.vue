<template>
  <div class="main">
    test
    <transition name="tra-slideLeftIn" appear>
      <div>1111222</div>
    </transition>
    <el-button v-if="true" type="success">click test</el-button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "开发者文档",
  header: true,
  aside: true,
  footer: true
});
</script>
