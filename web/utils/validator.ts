import type { AnyFunction } from "~/typings/type";

export interface ValidatorPresetItem {
  pattern: RegExp | AnyFunction<boolean>;
  message: string;
}

export interface ValidatorOptions {
  /* 校验值 */
  value?: string;
  message?: string;
  /* 长度限制， 请保证构成合法区间 */
  lengths?: [number, number];
  /* 提示词前缀 */
  title?: string;
  pattern?: RegExp | AnyFunction<boolean>;
  preset?: ValidatorPresetItem;
  elNotificationOptions?: {
    offset?: number;
    position?: "top-left" | "top-right";
    type?: "warning" | "success" | "info" | "error";
  };
}

/**
 * @description 一些常见的校验预设
 */
export const validatorPreset = {
  character: {
    pattern: /^[a-zA-Z0-9#$%_-]+$/,
    message: "只能是字母、数字或者 #、$、%、_、- 这些字符"
  },
  email: {
    pattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?/,
    message: "格式非法"
  }
};

export const validator = (options: ValidatorOptions) => {
  let ans: boolean = true;
  const pattern = options.pattern ?? options.preset?.pattern ?? /.*/;
  const message = options.message ?? options.preset?.message ?? "";

  // length check
  if (isArray<number>(options.lengths) && !isEmpty(options.value)) {
    const len = options.value.length;

    ans = options.lengths[0] <= len && len <= options.lengths[1];

    if (!ans) {
      ElNotification({
        title: `${options?.title ?? ""}校验失败`,
        message: `长度必须在 [${options.lengths[0]}, ${options.lengths[1]}] 之间`,
        type: options.elNotificationOptions?.type ?? "warning",
        offset: options.elNotificationOptions?.offset ?? 50,
        position: options.elNotificationOptions?.position ?? "top-right"
      });

      return false;
    }
  }

  // pattern check
  if (isFunction(pattern)) {
    ans = pattern();
  }
  if (isRegExp(pattern)) {
    ans = pattern.test(options?.value ?? "");
  }

  if (!ans) {
    ElNotification({
      title: `${options?.title ?? ""}校验失败`,
      message,
      type: options.elNotificationOptions?.type ?? "warning",
      offset: options.elNotificationOptions?.offset ?? 50,
      position: options.elNotificationOptions?.position ?? "top-right"
    });
  }

  return ans;
};
