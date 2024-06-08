<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="font-roboto font-bold text-xl">waiting for check your email...</h1>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import { userValidateApi } from "~/alova";

definePageMeta({
  name: "email check"
});

const uid = useQuery("uid", "");

const { send, data } = useRequest(
  () =>
    userValidateApi({
      uid: uid.value
    }),
  { immediate: false }
);

onMounted(async () => {
  await send();

  if (data.value.data !== "ok") {
    ElMessage({
      message: `your email check is ${data.value.data} !`,
      type: "error"
    });
  }
  if (data.value.data === "ok") {
    ElMessage({
      message: "邮箱验证成功！ 请前往登录",
      type: "success"
    });
  }
});
</script>

<style scoped lang="scss"></style>
