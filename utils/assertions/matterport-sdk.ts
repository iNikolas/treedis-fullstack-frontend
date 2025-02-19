import { ShowcaseEmbedWindow } from "@/types/sdk";

export function assertIsShowcaseEmbedWindow(
  window: Window
): asserts window is ShowcaseEmbedWindow {
  if (!("MP_SDK" in window)) {
    throw new Error("Expected window.MP_SDK to be defined");
  }
}
