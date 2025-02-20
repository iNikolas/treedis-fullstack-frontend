import React from "react";

import { cn } from "@/utils/helpers";

export function Menu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("menu bg-base-200 rounded-box w-56", className)}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
}
