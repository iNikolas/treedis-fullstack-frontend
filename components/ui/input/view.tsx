import React from "react";

import { cn } from "@/utils/helpers";

import { InputProps } from "./types";

export function Input({
  className,
  children,
  elementEnd,
  ...props
}: InputProps) {
  return (
    <label
      className={cn(
        "input input-bordered flex items-center gap-2.5",
        className
      )}
    >
      {children && (
        <div className="flex items-center text-[15px] text-secondary-content min-h-[19px] pr-2.5 border-r border-secondary-content/15 text-nowrap">
          {children}
        </div>
      )}
      <input type="text" className="grow min-w-0" {...props} />
      <div className="[&>*]:text-[15px] [&>*]:text-secondary-content/60">
        {elementEnd}
      </div>
    </label>
  );
}
