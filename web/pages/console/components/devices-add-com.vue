<template>
  <el-drawer v-model="isPopupVisible" :modal="false" title="创建设备" class="drawer">
    <el-form label-position="top" label-width="auto" :model="devicesAddParams" class="space-y-8">
      <el-form-item required label="设备名称">
        <el-input v-model="devicesAddParams.name" />
      </el-form-item>

      <el-form-item>
        <template #label>
          <div class="inline-flex space-x-1 justify-center items-center">
            <span>设备标识符</span>

            <ElTooltip content="设备在使用mqtt传输时的唯一标识符" placement="top">
              <el-icon>
                <ElIconQuestionFilled />
              </el-icon>
            </ElTooltip>
          </div>
        </template>
        <el-input v-model="devicesAddParams.symbol" />
      </el-form-item>
      <el-form-item>
        <template #label>
          <div class="inline-flex space-x-1 justify-center items-center">
            <span>设备类型</span>

            <ElTooltip content="暂时不支持设置" placement="top">
              <el-icon>
                <ElIconQuestionFilled />
              </el-icon>
            </ElTooltip>
          </div>
        </template>
        <el-input v-model="devicesAddParams.type" disabled />
      </el-form-item>
      <el-form-item label="设备描述">
        <el-input v-model="devicesAddParams.description" type="textarea" rows="4" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button class="px-7" size="large" @click="clearFn">取消</el-button>
      <el-button class="px-7" type="primary" size="large" @click="groupAddFn">确认</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import { devicesAddApi, groupAddApi, isSafeResCode } from "~/alova";
import { useGroupStore } from "~/store";
import { useDevicesStore } from "~/store/devices.store";

const isPopupVisible = ref(false);
const devicesAddParams = ref({
  name: "",
  symbol: "",
  type: "",
  description: ""
});

const groupStore = useGroupStore();
const devicesStore = useDevicesStore();

const { send: devicesAddApiSend, data: devicesAddApiData } = useRequest(
  () =>
    devicesAddApi({
      ...devicesAddParams.value,
      groupId: groupStore.activeGroupId ?? ""
    }),
  { immediate: false }
);

const clearFn = () => {
  devicesAddParams.value.name = "";
  devicesAddParams.value.description = "";
  devicesAddParams.value.symbol = "";

  isPopupVisible.value = false;
};

const checkFn = () => {
  return (
    validator({
      title: "设备名称",
      value: devicesAddParams.value.name,
      lengths: [4, 30],
      preset: validatorPreset.character,
      elNotificationOptions: {
        position: "top-left"
      }
    }) &&
    validator({
      title: "设备标识符",
      value: devicesAddParams.value.symbol,
      lengths: [0, 30],
      elNotificationOptions: {
        position: "top-left"
      }
    })
  );
};

const groupAddFn = async () => {
  if (!checkFn()) return;

  await devicesAddApiSend();

  if (isSafeResCode(devicesAddApiData.value.code)) {
    ElMessage({
      message: "创建成功",
      offset: 60,
      type: "success"
    });
    clearFn();
    devicesStore.refreshList().catch();
  }
};

defineExpose({
  isPopupVisible
});
</script>

<style lang="scss">
.drawer {
  top: 60px !important;
  height: calc(100% - 60px) !important;
}
</style>
