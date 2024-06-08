<template>
  <div class="my-10">
    <div class="mb-4 flex justify-between">
      <h1 class="text-xl font-bold">当前属性</h1>
      <el-button
        class="px-8 rounded-full"
        type="primary"
        :icon="ElIconRefresh"
        @click="refreshMsgFn"
        >刷新
      </el-button>
    </div>
    <div class="flex justify-start items-center gap-4">
      <template v-for="msg in devicesStore.info.msg">
        <div
          class="shadow rounded p-4 flex flex-col gap-3 transition-all hover:shadow-xl"
          style="width: 350px"
        >
          <header class="flex justify-between items-start">
            <h1 class="text-xs font-bold">{{ msg?.name }}</h1>
            <div class="gap-3 flex">
              <div
                class="hover:bg-gray-300 flex justify-center items-center rounded transition-all"
                style="height: 22px; width: 22px"
              >
                <el-icon>
                  <ElIconClock />
                </el-icon>
              </div>
              <div
                class="hover:bg-gray-300 flex justify-center items-center rounded transition-all"
                style="height: 22px; width: 22px"
              >
                <el-icon @click="openPopupFn">
                  <ElIconGuide />
                </el-icon>
              </div>

              <div
                class="hover:bg-gray-300 flex justify-center items-center rounded transition-all"
                style="height: 22px; width: 22px"
              >
                <el-icon>
                  <ElIconMore />
                </el-icon>
              </div>
            </div>
          </header>
          <div class="text-2xl font-roboto font-bold">
            {{ msg?.value }}
          </div>
          <footer class="flex justify-end text-xs text-gray-500">{{ new Date(msg?.createTime).toLocaleString() }}</footer>
        </div>
      </template>
    </div>
  </div>
  <div class="my-10">
    <h1 class="text-xl font-bold">活跃时间</h1>
    <div class="text-xs text-gray-500 divide-y divide-gray-300">
      <div class="flex py-3 hover:bg-gray-200 transition-all">
        <span class="basis-1/6">属性上报</span>
        <span>{{ devicesStore.info.base?.attrPostTime }}</span>
      </div>
      <div class="flex py-3 hover:bg-gray-200 transition-all">
        <span class="basis-1/6">属性获取</span>
        <span>---</span>
      </div>
      <div class="flex py-3 hover:bg-gray-200 transition-all">
        <span class="basis-1/6">属性下发</span>
        <span>---</span>
      </div>
      <div class="flex py-3 hover:bg-gray-200 transition-all">
        <span class="basis-1/6">命令下发</span>
        <span>---</span>
      </div>
    </div>
  </div>
  <div class="my-10">
    <client-only>
      <v-chart class="rounded shadow" style="height: 400px" :option="option" autoresize></v-chart>
    </client-only>
  </div>

  <el-dialog v-model="isPopupVisible"  style="min-width: 70vw" title="属性时序图表">
    <div class="w-full flex justify-between">
      <div class="m-4">
        <span class="pr-1">选择属性</span>
        <el-select
          v-model="value4"
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
          placeholder="请选择属性"
          style="width: 220px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="m-4 text-2xl space-x-2">
        <el-icon @click="openPopupFn" class="border p-1 bg-gray-200">
          <ElIconShare />
        </el-icon>
        <el-icon @click="openPopupFn" class="border p-1">
          <ElIconHistogram />
        </el-icon>
        <el-icon @click="openPopupFn" class="border p-1">
          <ElIconRefresh />
        </el-icon>
      </div>
    </div>
    <img src="/images/test.png">
  </el-dialog>

</template>

<script setup lang="ts">
import { useDevicesStore } from "~/store/devices.store";
import VChart from "vue-echarts";

const devicesStore = useDevicesStore();
const isPopupVisible = ref(false);

const option = ref({
  title: {
    text: "使用统计",
    left: "left"
  },
  tooltip: {
    trigger: "item"
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line"
    }
  ]
});

const value4 = ref([])
const options = [
  {
    value: 'BinFillingDegree',
    label: '深度',
  },
  {
    value: 'AmmoniaConcentration',
    label: '二氧化碳浓度',
  },
]

const refreshMsgFn = async () => {
  console.log("debug", "refresh");
  await devicesStore.refreshMsgInfo();
};

const openPopupFn = () => {
  isPopupVisible.value = true;
}

</script>

<style scoped lang="scss"></style>
