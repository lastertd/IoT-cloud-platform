<template>
  <my-transition name="tra-slideLeftIn--30px" appear>
    <el-aside v-if="router.currentRoute.value.meta.asider" class="app-aside">
      <h1 class="font-bold font-roboto text-black text-opacity-80 my-1">分组选择：</h1>
      <el-select v-model="groupStore.activeGroupId" size="large">
        <template v-for="data in groupStore.list" :key="data?.id">
          <el-option :label="data?.alias" :value="data?.id" />
        </template>
      </el-select>

      <div>
        <h1 class="font-bold font-roboto text-black text-opacity-80 my-1">选项：</h1>
      </div>

      <el-menu :default-active="activeItemIdx" class="app-aside__inner" @select="selectFn">
        <el-menu-item index="1">
          <el-icon>
            <ElIconPieChart />
          </el-icon>
          <span>概要</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <ElIconPieChart />
          </el-icon>
          <span>设备</span>
        </el-menu-item>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <ElIconPlatform />
            </el-icon>
            <span>可视化</span>
          </template>
          <el-menu-item index="3-1">看板</el-menu-item>
          <el-menu-item index="3-2">大屏</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <ElIconList />
            </el-icon>
            <span>任务</span>
          </template>
          <el-menu-item index="4-1">所有任务</el-menu-item>
          <el-menu-item index="4-2">任务日志</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </my-transition>
</template>

<script setup lang="ts">
import { useGroupStore } from "~/store";

const router = useRouter();

const activeItemIdx = ref("1");

const groupStore = useGroupStore();

// 两者确认侧边栏和path相互控制
const selectFn = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);

  if (key === "1") {
    navManager.push("/console");
  }
  if (key === "2") {
    navManager.push("/console/devices");
  }
};
watchEffect(() => {
  const path = router.currentRoute.value.fullPath;

  if (path.startsWith("/console")) {
    if (path.startsWith("/console/devices")) {
      activeItemIdx.value = "2";
      return;
    }
    activeItemIdx.value = "1";
    return;
  }

  console.log(router.currentRoute.value);
});

onMounted(async () => {
  // 挂载后请求所有分组并选择第一个分组
  await groupStore.refreshGroupList();
  if (isArray(groupStore.list)) {
    groupStore.activeGroupId = groupStore.list[0].id;
  }
});
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

.app-aside__inner {
  @apply bg-transparent border-none;

  .el-menu-item {
    @apply my-2;
    &.is-active {
      @apply font-bold bg-black bg-opacity-10;
    }
  }

  & * {
    @apply bg-transparent rounded;
  }
}
</style>
