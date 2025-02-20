import React from "react";

import {
  useCameraDataStore,
  useCurrentSweepDataStore,
  useSdkInstanceStore,
} from "@/store";
import { CommonMpSdk } from "@/types/sdk";

import { getAngleWithYAxis } from "../helpers";

export function useCurrentSweepData(instance: CommonMpSdk | null) {
  const { dataChanged } = useCurrentSweepDataStore();

  React.useEffect(() => {
    if (instance) {
      instance.Sweep.current.subscribe((sweep) => {
        dataChanged(sweep);
      });
    }
  }, [dataChanged, instance]);
}

export function useCameraData(instance: CommonMpSdk | null) {
  const { dataChanged } = useCameraDataStore();

  React.useEffect(() => {
    if (instance) {
      instance.Camera.pose.subscribe((pose) => {
        dataChanged(pose);
      });
    }
  }, [dataChanged, instance]);
}

export function useCameraRotationHandler() {
  const { data: cameraData } = useCameraDataStore();

  const { instance } = useSdkInstanceStore();

  const callback = React.useCallback(
    async (stepX: number, stepY: number) => {
      if (!cameraData || !instance) {
        return;
      }

      const { x, z } = cameraData.position;
      const angle = getAngleWithYAxis(x, z, stepX, stepY);

      await instance.Camera.rotate(
        cameraData.rotation.y - angle,
        -cameraData.rotation.x
      );
    },
    [cameraData, instance]
  );

  return callback;
}

export function useBuildSweepNavigationHandler() {
  const { data } = useCurrentSweepDataStore();

  const { instance } = useSdkInstanceStore();

  const callback = React.useCallback(
    async (sweepId: string) => {
      if (!data || !instance) {
        return [];
      }

      const sweepGraph = await instance.Sweep.createGraph();

      const startSweep = sweepGraph.vertex(data.id);
      const endSweep = sweepGraph.vertex(sweepId);

      if (!startSweep || !endSweep) {
        return [];
      }

      const { path } = instance.Graph.createAStarRunner(
        sweepGraph,
        startSweep,
        endSweep
      ).exec();

      return path;
    },
    [data, instance]
  );

  return callback;
}
