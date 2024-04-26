<template>
  <div class="min-h-screen set-bg flex flex-col">
    <app-header />

    <div class="flex flex-1">
      <app-asider />

      <div class="flex-1 flex flex-col">
        <el-main class="flex-1" :class="{ 'px-40 py-20': router.currentRoute.value.meta.main }">
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </el-main>

        <app-footer />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/appHeader.vue";
import AppAsider from "~/components/appAsider.vue";
import AppFooter from "~/components/appFooter.vue";

const router = useRouter();

const appName = ref("Chtholly");

provide("appName", appName);

onMounted(() => {
  useHead({
    title: `Chtholly | ${router.currentRoute.value.meta.name}`
  });

  console.log(router.currentRoute.value);
});
</script>

<style lang="scss">
.set-bg {
  background-image: url("/images/bg.png");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay; /* 设置混合模式为叠加 */
  background-attachment: fixed; /* 背景图像固定不动 */
}
</style>
