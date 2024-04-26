<template>
  <el-drawer v-model="isPopupVisible" :modal="false" title="创建分组" class="drawer">
    <el-form label-position="top" label-width="auto" :model="groupAddParams" class="space-y-8">
      <el-form-item required label="分组名称">
        <el-input v-model="groupAddParams.name" />
      </el-form-item>

      <el-form-item required>
        <template #label>
          <div class="inline-flex space-x-1 justify-center items-center">
            <span>最大设备量</span>

            <ElTooltip content="目前最大设备数量固定为7" placement="right">
              <el-icon>
                <ElIconQuestionFilled />
              </el-icon>
            </ElTooltip>
          </div>
        </template>
        <el-input v-model="groupAddParams.limit" disabled />
      </el-form-item>
      <el-form-item label="分组描述">
        <el-input v-model="groupAddParams.description" type="textarea" rows="4" />
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
import { groupAddApi, isSafeResCode } from "~/alova";
import { useGroupStore } from "~/store";

const isPopupVisible = ref(false);
const groupAddParams = ref({
  name: "",
  description: "",
  limit: 7
});

const { send: groupAddApiSend, data: groupAddApiData } = useRequest(
  () =>
    groupAddApi({
      ...groupAddParams.value
    }),
  { immediate: false }
);
const groupStore = useGroupStore();

const clearFn = () => {
  groupAddParams.value.name = "";
  groupAddParams.value.description = "";

  isPopupVisible.value = false;
};

const checkFn = () => {
  return validator({
    title: "分组名称",
    value: groupAddParams.value.name,
    lengths: [4, 30],
    preset: validatorPreset.character,
    elNotificationOptions: {
      position: "top-left"
    }
  });
};

const groupAddFn = async () => {
  if (!checkFn()) return;

  await groupAddApiSend();

  if (isSafeResCode(groupAddApiData.value.code)) {
    ElMessage({
      message: "创建成功",
      offset: 60,
      type: "success"
    });
    clearFn();
    await groupStore.refreshGroupList();
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
