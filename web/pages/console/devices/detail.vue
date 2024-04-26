<template>
  <div class="mb-2">
    <h1 class="text-2xl font-bold">{{ devicesStore.info.base?.alias }}</h1>
    <div class="flex mt-4 gap-10 text-gray-500">
      <p>设备ID：{{ devicesStore.info.base?.symbol ?? "未设置" }}</p>
      <p>设备类型：{{ devicesStore.info.base?.type ?? "未设置" }}</p>
      <div>
        <div
          v-if="devicesStore.info.base?.isActive"
          class="flex justify-center items-center gap-2 text-green-500 font-bold"
        >
          <el-icon>
            <ElIconSunny />
          </el-icon>
          <p>在线</p>
        </div>
        <div v-else class="flex justify-center items-center gap-2 text-gray-500 font-bold">
          <el-icon>
            <ElIconMoon />
          </el-icon>
          <div class="divide-x divide-black">离线</div>
        </div>
      </div>
      <p>无警告</p>
    </div>
  </div>
  <el-menu :default-active="activeTab" class="devices-menu" mode="horizontal" :ellipsis="false">
    <el-menu-item index="1">概览</el-menu-item>
    <el-menu-item index="2">连接</el-menu-item>
    <el-menu-item index="3">属性</el-menu-item>
    <el-menu-item index="4">事件</el-menu-item>
    <el-menu-item index="5">命令</el-menu-item>
    <el-menu-item index="6">设置</el-menu-item>
  </el-menu>

  <detail-main-sec />
</template>

<script setup lang="ts">
import { useDevicesStore } from "~/store/devices.store";
import DetailMainSec from "~/pages/console/devices/components/detail-main-sec.vue";

definePageMeta({
  name: "控制台 | 设备详情",
  asider: true,
  header: true,
  footer: true
});

const devicesStore = useDevicesStore();
const devicesId = useQuery<string>("devicesId", "");
const activeTab = ref("1");

onMounted(() => {
  devicesStore.activeDevicesId = devicesId.value;
});
</script>

<style lang="scss">
.devices-menu {
  @apply bg-transparent;
  height: 40px;

  .el-menu-item {
    &:hover,
    &:focus {
      background: transparent !important;
      @apply font-bold;
    }
  }
}
</style>
