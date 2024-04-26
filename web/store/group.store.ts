import { useRequest } from "alova";
import type { DevicesCnt, Group } from "~/alova";
import { groupFindALLApi, groupGetInfoApi } from "~/alova";

export const useGroupStore = defineStore("group", () => {
  const { send: refreshGroupList, data: groupFindALLData } = useRequest(() => groupFindALLApi(), {
    immediate: false
  });
  const { send: refreshGroupInfo, data: groupGetInfoData } = useRequest(
    () =>
      groupGetInfoApi({
        groupId: activeGroupId.value
      }),
    { immediate: false }
  );

  const activeGroupId = ref<string>();

  const list = ref<Array<Group>>();

  const info = ref<{
    group: Group;
    devices: DevicesCnt;
    message: {
      cnt: number;
    };
  }>();

  watchEffect(() => {
    list.value = groupFindALLData.value?.data;
    info.value = groupGetInfoData.value?.data;
  });

  // 当活跃id改变时, 刷新info
  watch(
    () => activeGroupId.value,
    async () => {
      await refreshGroupInfo();
      console.log("hello world!");
    }
  );

  return {
    // 当前被选中的group id
    activeGroupId,
    // 当前被选择的group info
    info,
    // 当前用户的所有分组
    list,
    // 刷新
    refreshGroupList,
    refreshGroupInfo,
    refreshAll: async () => {
      await Promise.all([refreshGroupList(), refreshGroupInfo()]);
    }
  };
});
