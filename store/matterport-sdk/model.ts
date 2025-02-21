import { create } from "zustand";

import { Camera, MpSdk, Sweep } from "@/types/sdk";

export const useSdkInstanceStore = create<{
  instance: MpSdk | null;
  instanceChanged: (val: MpSdk | null) => void;
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

export const useCameraDataStore = create<{
  data: Camera.Pose | null;
  dataChanged: (val: Camera.Pose | null) => void;
}>((set) => ({
  data: null,
  dataChanged: (data) => set({ data }),
}));
