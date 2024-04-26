<template>
  <el-page-header class="mb-4" title="返回上一级" @back="navManager.back()">
    <template #content>
      <span class="text-large font-600 mr-3"> 我的设备 </span>
    </template>
    <template #extra>
      <el-button type="primary" size="large" @click="openFn">创建新设备</el-button>
    </template>
  </el-page-header>

  <el-empty
    v-if="!devicesStore.list || devicesStore.list?.length === 0"
    description="No Data 请先创建设备"
  ></el-empty>

  <div class="flex flex-wrap gap-4">
    <template v-for="devices in devicesStore.list" :key="devices.id">
      <div
        class="rounded shadow bg-white bg-opacity-50 p-4 space-y-2 transition-all hover:shadow-xl"
        style="width: 350px"
        @click="gotoDetailFn(devices.id)"
      >
        <div class="flex justify-start items-center gap-4">
          <div
            class="rounded bg-blue-500 text-4xl flex justify-center items-center text-white"
            style="height: 50px; width: 50px"
          >
            <el-icon>
              <ElIconElementPlus />
            </el-icon>
          </div>

          <h1 class="font-bold font-roboto text-xl">{{ devices?.alias }}</h1>
        </div>

        <div class="flex text-xs justify-start items-start gap-2">
          <span class="text-gray-500">设备描述信息: </span>
          <p>{{ devices?.description }}</p>
        </div>

        <div class="flex justify-between items-center pt-4">
          <div>
            <div
              v-if="devices?.isActive"
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
              <p>{{ devices?.updateTime?.slice(0, 10) }}</p>
            </div>
          </div>
          <div class="text-gray-500">无告警</div>
        </div>
      </div>
    </template>
  </div>

  <devices-add-com ref="devicesAddComRef" />
</template>
<script setup lang="ts">
import DevicesAddCom from "~/pages/console/components/devices-add-com.vue";
import { useDevicesStore } from "~/store/devices.store";
import type { Devices } from "~/alova";

const devicesAddComRef = ref();
const devicesStore = useDevicesStore();

devicesStore.refreshList();

onMounted(() => {
  setTimeout(() => {}, 2000);
});

const gotoDetailFn = (devicesId: Devices["id"]) => {
  navManager.push("/console/devices/detail", {
    query: {
      devicesId
    }
  });
};

const openFn = () => {
  devicesAddComRef.value.isPopupVisible = true;
};
</script>

<style scoped lang="scss"></style>
