import React from "react";

import {
  useBuildSweepNavigationHandler,
  useCameraRotationHandler,
  useTagsListQueryData,
} from "@/utils/hooks";
import { useSdkInstanceStore } from "@/store";

import { buildPathMarkersNode } from "./helpers";

export function useTags() {
  const { data } = useTagsListQueryData();
  const { instance } = useSdkInstanceStore();

  React.useEffect(() => {
    if (instance && data) {
      instance.Tag.add(
        ...data.map(({ id, label, description, position, stemVector }) => ({
          id,
          label,
          description,
          anchorPosition: position,
          stemVector,
          enabled: true,
          stemVisible: true,
        }))
      );
    }
  }, [data, instance]);
}

export function useNavigateToSweepHandler() {
  const { instance } = useSdkInstanceStore();
  const handleCameraRotation = useCameraRotationHandler();
  const getSweepNavigation = useBuildSweepNavigationHandler();

  return React.useCallback(
    async (sweepId: string) => {
      if (!instance) {
        return;
      }

      const path = await getSweepNavigation(sweepId);

      const node = await buildPathMarkersNode({ instance, path });

      for (const step of path.slice(1)) {
        await handleCameraRotation(step.data.position.x, step.data.position.z);
        await instance.Sweep.moveTo(step.id, {
          transition: instance.Sweep.Transition.FLY,
        });
      }

      node?.stop();
    },
    [getSweepNavigation, handleCameraRotation, instance]
  );
}
