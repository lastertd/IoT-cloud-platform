<template>
  <el-table :data="data?.data" class="w-full">
    <el-table-column prop="name" label="属性标识符" width="180" />
    <el-table-column prop="alias" label="属性别名" width="180" />
    <el-table-column prop="value" label="属性值" />
    <el-table-column prop="createTime" label="更新时间" />
  </el-table>
</template>
<script setup lang="ts">
import { useRequest } from "alova";
import { devicesGetMsgAllApi } from "~/alova";
import { useDevicesStore } from "~/store/devices.store";

const { send, data } = useRequest(
  () =>
    devicesGetMsgAllApi({
      devicesId: devicesStore.activeDevicesId ?? "",
      page: pages.value
    }),
  { immediate: false }
);
onMounted(async () => {
  await send();
  console.log(data);
});

const pages = ref(1);
const devicesStore = useDevicesStore();
</script>

<style scoped lang="scss"></style>
