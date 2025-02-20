import React from "react";

import {
  useBuildSweepNavigationHandler,
  useCameraRotationHandler,
  useTagsListQueryData,
} from "@/utils/hooks";
import { useSdkInstanceStore } from "@/store";

export function useTags() {
  const { data } = useTagsListQueryData();

  const { instance } = useSdkInstanceStore();

  React.useEffect(() => {
    if (instance) {
      if (data) {
        instance.Tag.add(
          ...data.map((tag) => ({
            id: tag.id,
            label: tag.label,
            description: tag.description,
            anchorPosition: tag.position,
            stemVector: tag.stemVector,
            enabled: true,
            stemVisible: true,
          }))
        );
      }
    }
  }, [data, instance]);
}

export function useNavigateToSweepHandler() {
  const { instance } = useSdkInstanceStore();

  const handleCameraRotation = useCameraRotationHandler();

  const getSweepNavigation = useBuildSweepNavigationHandler();

  const handler = React.useCallback(
    async (sweepId: string) => {
      if (!instance) {
        return;
      }

      const path = await getSweepNavigation(sweepId);

      for (const step of path.slice(1)) {
        await handleCameraRotation(step.data.position.x, step.data.position.z);

        await instance.Sweep.moveTo(step.id, {
          transition: instance.Sweep.Transition.FLY,
        });
      }
    },
    [getSweepNavigation, handleCameraRotation, instance]
  );

  return handler;
}
