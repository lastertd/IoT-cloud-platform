import { useRequest } from "alova";
import type { Devices, Message } from "~/alova";
import { devicesGetAllApi, devicesGetBaseInfoApi, devicesGetMsgApi } from "~/alova";
import { useGroupStore } from "~/store/group.store";

export const useDevicesStore = defineStore("devices", () => {
  const { send: refreshList, data: devicesFindALLData } = useRequest(
    () =>
      devicesGetAllApi({
        groupId: groupStore.activeGroupId ?? ""
      }),
    {
      immediate: false
    }
  );
  const { send: refreshBaseInfo, data: devicesGetInfoData } = useRequest(
    () =>
      devicesGetBaseInfoApi({
        devicesId: activeDevicesId.value ?? ""
      }),
    { immediate: false }
  );
  const { send: refreshMsgInfo, data: devicesGetMsgData } = useRequest(
    () =>
      devicesGetMsgApi({
        devicesId: activeDevicesId.value ?? ""
      }),
    { immediate: false }
  );

  const groupStore = useGroupStore();

  const activeDevicesId = ref<string>();

  const list = ref<Array<Devices>>();

  const info = ref<{
    base: Devices | null;
    msg: Message[];
  }>({
    base: null,
    msg: []
  });

  watchEffect(() => {
    list.value = devicesFindALLData.value?.data;
    info.value.base = devicesGetInfoData.value?.data;
    info.value.msg = devicesGetMsgData.value?.data;
  });

  // 当活跃设备id改变时, 刷新info
  watch(
    () => activeDevicesId.value,
    async () => {
      await refreshBaseInfo();
      await refreshMsgInfo();
    }
  );
  // 活跃分组ID改变时，刷新list
  watch(
    () => groupStore.activeGroupId,
    async () => {
      await refreshList();
    }
  );

  return {
    // 当前被选中的group id
    activeDevicesId,
    // 当前被选择的group info
    info,
    // 当前用户的所有分组
    list,
    // 刷新
    refreshList,
    refreshBaseInfo,
    refreshMsgInfo,
    refreshAll: async () => {
      await Promise.all([refreshList(), refreshBaseInfo(), refreshMsgInfo()]);
    }
  };
});
