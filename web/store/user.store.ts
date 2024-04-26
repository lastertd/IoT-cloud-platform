export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string>("");
    const test = ref<string>("1231");

    return {
      token,
      test
    };
  },
  {
    persist: {
      storage: persistedState.localStorage
    }
  }
);
