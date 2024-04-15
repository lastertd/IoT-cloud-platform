<template>
  <section>
    <div class="flex justify-between pr-48 items-center">
      <div>
        <h1 class="text-primary text-5xl leading-tight font-bold">{{ appName }}</h1>
        <p class="text-5xl text-slate-900 leading-tight font-bold">绝缘子物联网云平台</p>
        <p class="text-2xl text-black text-opacity-50 font-bold mt-2 max-w-xl">
          {{ appName }}
          数据采集、实时控制、数据可视化、零代码应用开发、开放 API，构建灵活强大的物联网应用。
        </p>
        <div class="flex pt-4">
          <el-button type="primary" round size="large">登录/注册</el-button>
          <el-button type="primary" plain round size="large">开始探索之旅</el-button>
        </div>
      </div>
      <div class="relative flex-shrink-0">
        <div class="img-bg" style="height: 260px; width: 260px"></div>
        <img
          src="/public/favicon.ico"
          alt=""
          class="rounded-2xl w-full h-ful relative"
          style="height: 240px; width: 240px"
        />
      </div>
    </div>
    <div class="w-full mt-20 flex flex-wrap gap-y-2">
      <template v-for="data in dataList" :key="data.title">
        <div ref="testRef" class="basis-1/3">
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
const appName = inject("appName") as Ref<string>;

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

const testRef = ref<HTMLDivElement[]>([]);

</script>

<style scoped lang="scss">
.img-bg {
  @apply rounded-full;
  @apply absolute top-0 left-0;

  filter: blur(72px);
  background-image: linear-gradient(
    15deg,
    var(--el-color-primary) 65%,
    var(--el-color-primary) 30%
  );
}
</style>
