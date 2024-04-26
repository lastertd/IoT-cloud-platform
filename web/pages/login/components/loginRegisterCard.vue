<template>
  <div ref="cardRef" class="lr-card">
    <div class="flex-1 p-10 z-10">
      <my-transition name="tra-slideLeftIn--30px" mode="out-in">
        <div v-if="!flag" class="flex flex-col justify-center items-center gap-4 h-full">
          <h1 class="font-bold text-3xl">登录个人账户</h1>
          <el-input
            v-model="loginParams.contactOrName"
            placeholder="邮箱/用户名"
            size="large"
            :prefix-icon="ElIconMessage"
          ></el-input>
          <el-input
            v-model="loginParams.password"
            placeholder="密码"
            size="large"
            :prefix-icon="ElIconEditPen"
            type="password"
            show-password
          ></el-input>
          <el-button type="primary" class="w-1/2" size="large" round @click="loginFn"
            >点击登录
          </el-button>
        </div>
        <div v-else class="flex flex-col justify-center items-center gap-6 h-full text-white">
          <h1 class="font-bold text-3xl">Welcome Back!</h1>
          <p class="text-center">To keep connected with us please login with your personal info</p>
          <button class="lr-button" @click="toggle()">Sign in</button>
        </div>
      </my-transition>
    </div>
    <!--    register-->
    <div class="flex-1 p-10 z-10">
      <my-transition name="tra-slideRightIn--30px" mode="out-in">
        <div v-if="flag" class="flex flex-col justify-center items-center gap-4 h-full">
          <h1 class="font-bold text-3xl">注册新用户</h1>
          <el-input
            v-model="registerParams.contact"
            placeholder="邮箱"
            size="large"
            :prefix-icon="ElIconMessage"
          ></el-input>
          <el-input
            v-model="registerParams.name"
            placeholder="用户名"
            size="large"
            :prefix-icon="ElIconUser"
          ></el-input>
          <el-input
            v-model="registerParams.password"
            placeholder="密码"
            size="large"
            :prefix-icon="ElIconEditPen"
            type="password"
            show-password
          ></el-input>
          <el-input
            v-model="registerParams.rePassword"
            placeholder="确认密码"
            size="large"
            :prefix-icon="ElIconCircleCheck"
            type="password"
            show-password
          ></el-input>
          <el-button type="primary" class="w-1/2" size="large" round @click="registerFn"
            >点击注册
          </el-button>
        </div>
        <div v-else class="flex flex-col justify-center items-center gap-6 h-full text-white">
          <h1 class="font-bold text-3xl">Hello, Friend!</h1>
          <p class="text-center">Enter your personal details and start journey with us</p>
          <button class="lr-button" @click="toggle()">Sign up</button>
        </div>
      </my-transition>
    </div>
    <!--    mark-->
    <div
      class="h-full w-1/2 absolute top-0 z-0 left-0"
      style="background: linear-gradient(135deg, #343333, #151414); transition: all 0.4s linear"
      :style="flag ? '' : 'left:100%;transform: translateX(-100%);'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import { userLoginApi, userRegisterApi } from "@/alova";
import { useUserStore } from "~/store";
import { validatorPreset } from "~/utils/validator";

const [flag, toggle] = useToggle(false);
const cardRef = ref<HTMLDivElement>();

const registerParams = ref({
  name: "",
  contact: "",
  password: "",
  rePassword: ""
});

const loginParams = ref({
  contactOrName: "",
  password: ""
});

useCardEffect(cardRef);
const { send: registerSend, data: registerData } = useRequest(
  () => {
    return userRegisterApi({
      ...registerParams.value
    });
  },
  { immediate: false }
);

const { send: loginSend, data: loginData } = useRequest(
  () => {
    return userLoginApi({
      ...loginParams.value
    });
  },
  { immediate: false }
);

const userStore = useUserStore();

const check = (type: "register" | "login") => {
  if (type === "register") {
    return (
      validator({
        value: registerParams.value.contact,
        title: "邮箱",
        preset: validatorPreset.email
      }) &&
      validator({
        value: registerParams.value.name,
        lengths: [4, 30],
        title: "用户名",
        preset: validatorPreset.character
      }) &&
      validator({
        value: registerParams.value.password,
        lengths: [4, 30],
        title: "密码",
        preset: validatorPreset.character
      }) &&
      validator({
        pattern: () => registerParams.value.password === registerParams.value.rePassword,
        message: "两次密码输入不一致"
      })
    );
  }

  if (type === "login") {
    return (
      validator({
        pattern: () => !isEmptyString(loginParams.value.contactOrName),
        title: "用户名 / 邮箱",
        message: "不能为空"
      }) &&
      validator({
        pattern: () => !isEmptyString(loginParams.value.password),
        title: "密码",
        message: "不能为空"
      })
    );
  }

  return true;
};

const loginFn = async () => {
  if (!check("login")) return;

  const a = await userLoginApi({
    contactOrName: loginParams.value.contactOrName,
    password: loginParams.value.password
  });

  await loginSend();

  if (loginData.value.code === 200) {
    userStore.token = loginData.value.data.token;

    ElNotification({
      title: "登录成功！",
      message: "请等待重定向...",
      type: "success",
      offset: 50,
      duration: 2000,
      onClose: () => {
        navManager.push("/console");
      }
    });
  }
};

const registerFn = async () => {
  if (!check("register")) return;

  await registerSend();

  if (registerData.value.code === 200) {
    ElNotification({
      title: "注册成功！",
      message: "验证邮件已发往您的邮箱中， 请注意查收",
      type: "success",
      offset: 50
    });
  }

  console.log(registerData.value);
};
</script>

<style lang="scss">
.lr-button {
  @apply rounded-full py-2 w-1/2 transition-all select-none;
  @apply border border-gray-500;
  &:hover {
    @apply text-black bg-white bg-opacity-90;
  }

  &:active {
    @apply bg-opacity-80;
  }
}

.lr-card {
  @apply h-full bg-white bg-opacity-50 flex rounded-xl drop-shadow-xl overflow-hidden relative;

  height: 430px;
}
</style>
