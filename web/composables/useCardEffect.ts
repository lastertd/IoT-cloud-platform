import type { Ref } from "vue";
import { throttle } from "~/utils/decorator";

/**
 * @description 卡片hover
 * @link https://juejin.cn/post/7356240651040636943?searchId=2024041318155981E2BE04846295997A0D
 */
export const useCardEffect = (
  target: HTMLElement | Ref<HTMLElement | undefined> | undefined,
  options?: {
    rotate?: number;
    scale?: number;
  }
) => {
  const rotate = options?.rotate ?? 1;
  const scale = options?.scale ?? 1.0;

  /**
   * @description 设置旋转变量
   */
  const setElementRotate = (rotateX: number, rotateY: number, scale3d: number) => {
    const el = unrefElement(target);
    if (isEmpty(el)) return;

    el.style.setProperty("--rotateX", rotateX + "deg");
    el.style.setProperty("--rotateY", rotateY + "deg");
    el.style.setProperty("--scale3d", scale3d.toString());
  };

  /**
   * @description 给元素添加鼠标事件
   */
  const rotateElement = (event: MouseEvent) => {
    const el = unrefElement(target);
    if (isEmpty(el)) return;

    const x = event.clientX;
    // clientX 鼠标指针相对于当前窗口的水平坐标
    // offsetX 鼠标指针相对于目标元素边缘位置的水平坐标
    // 如果元素不在窗口左上角，建议使用 offsetX
    // event.offsetX
    const y = event.clientY;
    // event.offsetY

    const middleX = el.clientWidth / 2;
    const middleY = el.clientHeight / 2;

    const offsetX = ((x - middleX) / middleX) * rotate;
    const offsetY = ((y - middleY) / middleY) * rotate;

    setElementRotate(offsetX, -1 * offsetY, scale);
  };

  const styles = {
    "--rotateX": " 0deg",
    "--rotateY": "0deg",
    "--scale3d": "1",
    transition: "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
    "transform-style": "preserve-3d",
    transform:
      "perspective(3000px) rotateY(var(--rotateX)) rotateX(var(--rotateY))\n" +
      "  scale3d(var(--scale3d), var(--scale3d), var(--scale3d))"
  } as any;

  useEventListener(target, "mouseenter", rotateElement);
  useEventListener(target, "mousemove", throttle(rotateElement, 15));
  useEventListener(target, "mouseleave", () => setElementRotate(0, 0, 1));

  onMounted(() => {
    const el = unrefElement(target);

    if (!isEmpty(el)) {
      Object.assign(el.style, styles);
    }
  });
};
