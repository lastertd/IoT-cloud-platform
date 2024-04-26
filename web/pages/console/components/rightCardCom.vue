<template>
  <div class="sticky right-0 flex flex-col items-center gap-4">
    <el-card class="flex-shrink-0 bg-gray-100 top-0" style="width: 270px; height: 400px">
      <template #header>
        <div class="flex justify-between items-center font-bold">
          <h1 v-if="!isVisibleIpt">{{ rightAsideData.title }}</h1>
          <el-input
            v-else
            v-model="rightAsideData.title"
            class="basis-1/2"
            @blur="editTitleFn"
          ></el-input>
          <el-icon @click="isVisibleIpt = true">
            <ElIconEditPen />
          </el-icon>
        </div>
      </template>

      <div class="space-y-2">
        <template v-for="item in rightAsideData.item" :key="item.name">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-1">
              <h1>{{ item.name }}</h1>
              <el-tooltip v-if="item.tip" placement="top">
                <template #content>
                  <span v-html="item.tip"></span>
                </template>
                <el-icon class="text-gray-300">
                  <ElIconQuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>

            <h1 class="font-bold">{{ item.value }}</h1>
          </div>
        </template>
      </div>

      <template #footer>
        <div class="flex flex-col justify-center items-center gap-2">
          <h1 class="font-bold text-xl">接入更多设备？beta</h1>
          <span class="text-center text-black text-opacity-70"
            >开通付费版项目，获得更多资源用量和高级功能</span
          >
          <el-tooltip content="加入 Chtholly beta计划">
            <el-button type="primary" size="large" class="rounded-xl w-full">了解详情</el-button>
          </el-tooltip>
        </div>
      </template>
    </el-card>

    <el-button size="large" type="primary" class="w-2/3 rounded" @click="emits('add')"
      >创建新分组
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import { useGroupStore } from "~/store";
import { groupPatchAliasApi } from "~/alova/methods/group/patch.alias";

const emits = defineEmits({
  add: () => true
});

const rightAsideData = ref({
  title: "dft title",
  item: [
    {
      name: "version",
      value: "beta",
      tip: undefined
    },
    {
      name: "设备数量",
      value: "0 / 3",
      tip: "如需扩容项目中的可创建设备数，<br />请升级版本或购买扩容服务。"
    },
    {
      name: "日消息数量",
      value: "0",
      tip:
        "日消息量是指项目中所有设备的当日总消息量，<br /> " +
        "若达到当日最大容量，将被平台限制通信或连接。<br /> " +
        "如需扩容日消息量，请升级版本或购买扩容服务。"
    },
    {
      name: "用户数量",
      value: "test"
    }
  ]
});
const groupStore = useGroupStore();
const { send: groupPatchAliasSend, data: groupPatchAliasData } = useRequest(
  () =>
    groupPatchAliasApi({
      groupId: groupStore.activeGroupId ?? "",
      alias: rightAsideData.value.title
    }),
  { immediate: false }
);

const isVisibleIpt = ref(false);

const editTitleFn = async () => {
  isVisibleIpt.value = false;

  await groupPatchAliasSend();

  if (groupPatchAliasData.value.code === 200) {
    ElMessage({
      message: "修改成功！",
      type: "success",
      offset: 60
    });
    await groupStore.refreshAll();
  }
};

watch(
  () => groupStore.info,
  (value) => {
    rightAsideData.value.title = value?.group.alias ?? "dft title";
    rightAsideData.value.item[1].value = `${value?.devices?.active} / ${value?.devices?.cnt}`;
    rightAsideData.value.item[2].value = String(value?.message.cnt ?? 0);
  }
);
</script>

<style scoped lang="scss"></style>
