"use client";

import React from "react";
import { AnimatePresence as MotionAnimatePresence, motion } from "motion/react";

import { AnimatePresenceProps } from "./types";

export function AnimatePresence({
  className,
  children,
  show,
  ...props
}: AnimatePresenceProps) {
  return (
    <MotionAnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </MotionAnimatePresence>
  );
}
