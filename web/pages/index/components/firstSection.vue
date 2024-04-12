<template>
  <section class="h-screen px-48 py-20">
    <div class="flex justify-between pr-48 items-center">
      <div>
        <h1 class="text-primary text-5xl leading-tight font-bold">{{ appName }}</h1>
        <p class="text-5xl text-slate-900 leading-tight font-bold">绝缘子物联网云平台</p>
        <p class="text-3xl leading-tight text-black text-opacity-50 font-bold mt-2">test 测试</p>
        <div class="flex pt-4">
          <el-button type="primary" round size="large">登录/注册</el-button>
          <el-button type="primary" plain round size="large">开始探索之旅</el-button>
        </div>
      </div>
      <img src="/public/favicon.ico" alt="" class="rounded-2xl" style="height: 240px" />
    </div>
    <div class="w-full mt-10 flex flex-wrap gap-y-2">
      <template v-for="data in dataList" :key="data.title">
        <div class="basis-1/3">
          <div
            class="h-44 mx-1 bg-black bg-opacity-5 rounded-xl border border-gray-200 p-6 space-y-1"
          >
            <div
              class="bg-black bg-opacity-10 h-10 w-10 rounded text-2xl flex justify-center items-center mb-4"
              v-html="data.icon"
            ></div>
            <h1 class="text-xl font-bold text-black text-opacity-80" v-html="data.title"></h1>
            <p class="text-gray-600" v-html="data.info"></p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
const appName = inject("appName") as ref<string>;

const dataList = ref<{ icon: string; title: string; info: string }[]>([
  {
    icon: "✨",
    title: "支持多种连接方式",
    info: "设备可以通过&nbsp; MQTT3.0 &nbsp; / &nbsp; HTTPS&nbsp;的形式连接云平台"
  },
  {
    icon: "🔒",
    title: "支持设备分组",
    info: "创建设备分组, 不同分组之间的设备消息隔离"
  },
  {
    icon: "🥇",
    title: "可视化数据",
    info: "定制你喜欢的数据可视化，数据更加直观"
  },
  {
    icon: "🎈",
    title: "支持命令下发",
    info: "可以下发命令到设备中"
  },
  {
    icon: "🎨",
    title: "数据存储",
    info: "支持数据上传并存储"
  }
]);
</script>

<style scoped lang="scss"></style>
