import { CommonMpSdk, Sweep } from "@/types/sdk";
import { create } from "zustand";

export const useSdkInstanceStore = create<{
  instance: CommonMpSdk | null;
  instanceChanged: (val: CommonMpSdk | null) => void;
}>((set) => ({
  instance: null,
  instanceChanged: (instance) => set({ instance }),
}));

export const useCurrentSweepDataStore = create<{
  data: Sweep.ObservableSweepData | null;
  dataChanged: (val: Sweep.ObservableSweepData | null) => void;
}>((set) => ({
  data: null,
  dataChanged: (data) => set({ data }),
}));
