// link:https://meta.feishu.cn/wiki/XOuTwGAW7iCbeNkcdqJcoO6Rnwb

/**
 * @description 获取时间
 */
export const useTime = (
  /* 默认值, 在set up阶段将会赋值 */
  dft: number = 0,
  options?: {
    /* 解析形式， ss为秒， mm为分钟， hh为小时  */
    parser?: "ms" | "ss" | "mm" | "hh";
    /* 时间是否会自动更新, 设置为true则每秒更新一次, 设置为number则 */
    update?: boolean | number;
  }
) => {
  const valRef = ref<number>(dft);

  const parser = options?.parser ?? "ms";
  const update = options?.update ?? false;
  let timer: NodeJS.Timeout;

  // eslint-disable-next-line require-jsdoc
  const getTime = () => {
    if (parser === "ms") {
      valRef.value = new Date().getTime();
    }
    if (parser === "ss") {
      valRef.value = new Date().getTime() / 1000;
    }
    if (parser === "mm") {
      valRef.value = new Date().getMinutes();
    }
    if (parser === "hh") {
      valRef.value = new Date().getHours();
    }
  };

  onMounted(() => {
    getTime();

    if (update) {
      const timout = isBoolean(update) ? 1000 : update;

      timer = setInterval(() => {
        getTime();
      }, timout);
    }
  });

  onBeforeMount(() => {
    clearInterval(timer);
  });

  return valRef;
};
