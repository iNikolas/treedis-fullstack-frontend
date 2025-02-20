"use client";

import React from "react";

import { cn } from "@/utils/helpers";
import { Menu } from "@/components/ui/menu";
import { useTagsListQueryData } from "@/utils/hooks";
import { moveToSweep } from "@/utils/matterport-sdk";
import { useCurrentSweepDataStore, useSdkInstanceStore } from "@/store";

import { useTags } from "./utils/hooks";

export function NavigationMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  const { data } = useTagsListQueryData();

  const { data: currentSweepData } = useCurrentSweepDataStore();

  const { instance } = useSdkInstanceStore();

  useTags();

  return (
    <Menu className={cn("absolute top-4 right-4 z-10", className)} {...props}>
      {data && !!instance ? (
        data.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={() => moveToSweep(instance, record.sweepId)}
          >
            Teleport to {record.label.toLocaleLowerCase()}
          </button>
        ))
      ) : (
        <button type="button" className="skeleton h-9" />
      )}
      {data && !!instance ? (
        data.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={async () => {
              if (!currentSweepData) {
                return;
              }

              const sweepGraph = await instance.Sweep.createGraph();

              const startSweep = sweepGraph.vertex(currentSweepData.id);
              const endSweep = sweepGraph.vertex(record.sweepId);

              if (!startSweep || !endSweep) {
                return;
              }

              const { path } = instance.Graph.createAStarRunner(
                sweepGraph,
                startSweep,
                endSweep
              ).exec();

              for (const step of path) {
                await instance.Sweep.moveTo(step.id, {
                  transition: instance.Sweep.Transition.FLY,
                });
              }
            }}
          >
            Navigate to {record.label.toLocaleLowerCase()}
          </button>
        ))
      ) : (
        <button type="button" className="skeleton h-9" />
      )}
    </Menu>
  );
}
