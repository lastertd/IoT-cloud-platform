<template>
  <!--  page header-->
  <el-page-header class="mb-4" title="返回上一级">
    <template #content>
      <span class="text-large font-600 mr-3"> 控制台 </span>
    </template>
  </el-page-header>
  <!--  empty status-->
  <el-empty v-if="!groupStore.activeGroupId" description="No Data 请先创建分组">
    <el-button type="primary" size="large" @click="openFn">点击创建分组</el-button>
  </el-empty>

  <div v-else class="flex justify-center gap-4 w-full relative">
    <chart-view-com />
    <group-add-com ref="groupAddViewRef" />
    <right-card-com @add="openFn" />
  </div>
</template>

<script setup lang="ts">
import GroupAddCom from "./components/GroupAddCom.vue";
import ChartViewCom from "~/pages/console/components/chartViewCom.vue";
import RightCardCom from "~/pages/console/components/rightCardCom.vue";
import { useGroupStore } from "~/store";

definePageMeta({
  name: "控制台",
  asider: true,
  header: true,
  footer: true
});

const groupAddViewRef = ref();
const groupStore = useGroupStore();

const openFn = () => {
  groupAddViewRef.value.isPopupVisible = true;
};
</script>

<style lang="scss"></style>
