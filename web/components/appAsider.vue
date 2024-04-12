<template>
  <transition name="tra-slideLeftIn" appear>
    <el-aside v-if="router.currentRoute.value.meta.aside" class="app-aside">
      <div class="app-aside__item">我的组</div>
      <div class="app-aside__item">我的组</div>
    </el-aside>
  </transition>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style lang="scss">
.app-aside {
  width: 232px;
  @apply p-4 bg-white bg-opacity-40 space-y-1 border-r border-black border-opacity-10;
  @apply sticky left-0;
  @apply select-none;
  height: calc(100vh - 60px);
  top: 60px;

  .app-aside__item {
    @apply flex justify-center items-center rounded py-2;

    &:hover {
      @apply bg-gray-100;
    }
  }
}
</style>
