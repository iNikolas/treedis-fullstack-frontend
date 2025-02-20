import { CommonMpSdk } from "@/types/sdk";
import { transitionTimeMs } from "@/config/constants";

export function moveToSweep(instance: CommonMpSdk, sweepId: string) {
  instance.Sweep.moveTo(sweepId, {
    transition: instance.Sweep.Transition.FLY,
    transitionTime: transitionTimeMs,
  });
}
