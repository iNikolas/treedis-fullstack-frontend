import { HTMLMotionProps } from "motion/react";

export interface AnimatePresenceProps extends HTMLMotionProps<"div"> {
  show: boolean;
}
