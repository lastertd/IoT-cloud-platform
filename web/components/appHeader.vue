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
        <el-menu-item class="rounded" index="首页">首页</el-menu-item>
        <el-menu-item class="rounded" index="开发者文档">开发者文档</el-menu-item>
        <el-menu-item class="rounded" index="联系我们">联系我们</el-menu-item>
        <el-menu-item class="rounded" index="登录/注册">登录/注册</el-menu-item>
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
  console.log(idx, typeof idx);

  if (idx === "首页") {
    router.push("/");
    return;
  }

  if (idx === "开发者文档") {
    router.push("/docs");
  }
};

onMounted(() => {
  activeTab.value = router.currentRoute.value.meta.name ?? "首页";
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
