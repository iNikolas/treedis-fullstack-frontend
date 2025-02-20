import { CommonMpSdk, Sweep } from "@/types/sdk";
import { transitionTimeMs } from "@/config/constants";

export async function moveToSweep(
  instance: CommonMpSdk,
  sweepId: string,
  options?: Sweep.MoveToOptions
) {
  await instance.Sweep.moveTo(sweepId, {
    transition: instance.Sweep.Transition.FLY,
    transitionTime: transitionTimeMs,
    ...options,
  });
}
