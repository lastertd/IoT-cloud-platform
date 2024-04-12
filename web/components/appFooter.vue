<template>
  <el-footer v-show="router.currentRoute.value.meta.footer" class="app-footer">
    <div class="text-gray-600 flex flex-col items-center">
      <p>Released under the MIT License.</p>
      <p>Copyright © 2024-present {{ appName }}</p>
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

const router = useRouter();

const appName = inject("appName") as Ref<string>;
</script>

<style lang="scss">
.app-footer {
  @apply border-t border-black border-opacity-10;
  @apply flex justify-center items-center;
  @apply py-12;
}
</style>
