import { ShowcaseBundleWindow } from "@/types/sdk";

export function assertIsShowcaseEmbedWindow(
  window: Window | ShadowRoot
): asserts window is ShowcaseBundleWindow {
  if (!("MP_SDK" in window)) {
    throw new Error("Expected window.MP_SDK to be defined");
  }
}
