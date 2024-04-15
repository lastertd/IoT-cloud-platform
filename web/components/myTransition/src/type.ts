import type { TransitionProps } from "vue";

type Animate1 =
  | "slideUpIn"
  | "slideLeftIn"
  | "slideRightIn"
  | "slideUpScaleIn"
  | "slideDownIn"
  | "slideDownScaleIn";

type Animate2 = "fadeIn" | "scaleIn";

type modifier = "30px" | "1/2";

export type TransitionName =
  | `tra-${Animate2}`
  | `tra-${Animate1}`
  | `tra-${Animate1}--${modifier}`
  | "";

export interface MyTransitionProps extends /* @vue-ignore */ Omit<TransitionProps, "name"> {
  name: TransitionName;
}
