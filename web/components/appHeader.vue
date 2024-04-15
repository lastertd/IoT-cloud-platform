<template>
  <el-header v-show="router.currentRoute.value.meta.header" class="app-header">
    <div class="flex items-center space-x-2">
      <img src="/public/favicon.ico" alt="" style="width: 1.75rem" class="rounded" />
      <div class="font-dc text-xl font-bold text-black">{{ appName }}</div>
    </div>

    <div class="flex items-center select-none">
      <el-menu
        :default-active="activeTab"
        class="el-menu-demo bg-transparent"
        mode="horizontal"
        :ellipsis="false"
        @select="handleClick"
      >
        <el-menu-item class="rounded" index="1">首页</el-menu-item>
        <el-menu-item class="rounded" index="2">开发者文档</el-menu-item>
        <el-menu-item class="rounded" index="3">联系我们</el-menu-item>
        <el-menu-item class="rounded" index="4">登录/注册</el-menu-item>
      </el-menu>
      <i class="iconfont icon--github px-4" />
      <el-switch
        v-model="isBlack"
        class="px-4"
        style="
          --el-switch-border-color: var(--el-color-primary-light-8);
          --el-switch-off-color: var(--el-color-primary-light-9);
        "
        :active-action-icon="ElIconMoon"
        :inactive-action-icon="ElIconSunny"
      />
    </div>
  </el-header>
</template>
<script setup lang="ts">
import type { Ref } from "vue";

const router = useRouter();
const activeTab = ref("首页");
const isBlack = ref(false);

const appName = inject("appName") as Ref<string>;

/**
 * @description 导航栏点击
 */
const handleClick = (idx: string) => {
  if (idx === "1") {
    router.push("/");
    return;
  }

  if (idx === "2") {
    router.push("/docs");
    return;
  }

  if (idx === "3") {
    // router.push("/docs");
    return;
  }

  if (idx === "4") {
    router.push("/login");
    return;
  }
};

onMounted(() => {
  const path = router.currentRoute.value.path;

  if (path === "/") {
    activeTab.value = "1";
    return;
  }

  if (path.includes("/docs")) {
    activeTab.value = "2";
    return;
  }

  if (path.includes("/user")) {
    activeTab.value = "4";
    return;
  }

  activeTab.value = "1";
});
</script>

<style lang="scss">
.app-header {
  @apply justify-between items-center border-b border-black border-opacity-10 transition-all;
  @apply sticky top-0 left-0 flex w-full;
  @apply bg-white bg-opacity-40;

  z-index: var(--infinity);
  background-image: radial-gradient(transparent 1px, rgb(249, 249, 249) 1px);
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  background-size: 4px 4px;
}
</style>
