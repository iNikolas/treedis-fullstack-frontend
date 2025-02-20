import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAngleWithYAxis(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const angleWithXAxis = Math.atan2(dy, dx);
  const angleWithYAxis = Math.PI / 2 - angleWithXAxis;

  return (
    -angleWithYAxis * (180 / Math.PI) + (Math.abs(dy) > Math.abs(dx) ? -90 : 0)
  );
}
