import { CommonMpSdk } from "@/types/sdk";
import { create } from "zustand";

export const useSdkInstanceStore = create<{
  instance: CommonMpSdk | null;
  instanceChanged: (val: CommonMpSdk | null) => void;
}>((set) => ({
  instance: null,
  instanceChanged: (instance) => set({ instance }),
}));
