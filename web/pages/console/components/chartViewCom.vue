<template>
  <div class="w-full h-full">
    <div class="section-1 flex gap-4 mb-4">
      <client-only>
        <template v-for="item in section1List" :key="item.name">
          <div
            class="flex-1 flex justify-start gap-4 items-center h-20 rounded shadow bg-white bg-opacity-50 p-4"
          >
            <div class="h-12 w-12 rounded flex justify-center items-center" :class="item.bg">
              <el-icon class="text-3xl text-white">
                <component :is="item.icon"></component>
              </el-icon>
            </div>
            <div>
              <h1 class="text-opacity-70 text-black">{{ item.title }}</h1>
              <span class="font-bold font-dc text-3xl">{{ item.cnt }}</span>
            </div>
          </div>
        </template>
      </client-only>
    </div>

    <div class="flex justify-between items-center gap-4 flex-wrap">
      <client-only>
        <template v-for="option in chartOptionList" :key="option.value.title">
          <v-chart
            class="basis-2/5 flex-grow rounded shadow bg-white bg-opacity-50"
            style="height: 200px"
            :option="option.value"
            autoresize
          />
        </template>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import { useGroupStore } from "~/store";

const groupStore = useGroupStore();

const createChartOptionsFn = (options: {
  title: string;
  data: Array<{ name: string; value: number }>;
}) => {
  const keys = options.data.map((item) => item.name);

  return ref({
    title: {
      text: options.title,
      left: "left",
      top: "top"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "right",
      top: "center",
      data: keys
    },
    series: [
      {
        name: options.title,
        type: "pie",
        radius: ["25%", "45%"],
        center: ["40%", "50%"],
        data: [...options.data]
      }
    ]
  });
};
const section1List = ref([
  {
    title: "所有设备",
    cnt: 0,
    icon: ElIconElementPlus,
    bg: "bg-blue-500"
  },
  {
    title: "在线设备",
    cnt: 0,
    icon: ElIconEleme,
    bg: "bg-green-500"
  },
  {
    title: "活跃设备",
    cnt: 0,
    icon: ElIconElemeFilled,
    bg: "bg-rose-500"
  },
  {
    title: "告警设备",
    cnt: 0,
    icon: ElIconChromeFilled,
    bg: "bg-yellow-500"
  }
]);

const chartOptionList = [
  createChartOptionsFn({
    title: "设备接入类型",
    data: [
      {
        name: "mqtt接入",
        value: 3
      },
      {
        name: "网关",
        value: 0
      },
      {
        name: "http接入",
        value: 0
      }
    ]
  }),
  createChartOptionsFn({
    title: "设备在线率",
    data: [
      {
        name: "在线设备",
        value: 0
      },
      {
        name: "离线设备",
        value: 3
      }
    ]
  }),
  createChartOptionsFn({
    title: "设备活跃率",
    data: [
      {
        name: "5分钟内",
        value: 40
      },
      {
        name: "1小时内",
        value: 17
      },
      {
        name: "1天内",
        value: 3
      },
      {
        name: "1天以上",
        value: 7
      }
    ]
  }),
  createChartOptionsFn({
    title: "设备告警率",
    data: [
      {
        name: "正常",
        value: 20
      },
      {
        name: "普通告警",
        value: 17
      },
      {
        name: "重要告警",
        value: 3
      },
      {
        name: "紧急告警",
        value: 1
      }
    ]
  })
];

watch(
  () => groupStore.info,
  (value) => {
    // 修改设备状态
    section1List.value[0].cnt = value?.devices?.cnt ?? 0;
    section1List.value[1].cnt = value?.devices?.online ?? 0;
    section1List.value[2].cnt = value?.devices?.active ?? 0;
    section1List.value[3].cnt = 0;

    //   修改部分消息
    chartOptionList[0].value.series[0].data[0].value = value?.devices?.cnt ?? 0;
    chartOptionList[1].value.series[0].data[0].value = value?.devices?.online ?? 0;
    chartOptionList[2].value.series[0].data[0].value = value?.devices?.online ?? 0;
  }
);
</script>

<style scoped lang="scss">
.chart {
  width: 50%;
  height: 300px;
}
</style>
