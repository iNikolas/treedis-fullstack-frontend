import React from "react";

import { CommonMpSdk } from "@/types/sdk";
import { useCurrentSweepDataStore } from "@/store";

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
