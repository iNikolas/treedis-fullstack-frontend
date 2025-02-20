"use client";

import React from "react";

import { cn } from "@/utils/helpers";
import { Menu } from "@/components/ui/menu";
import { useSdkInstanceStore } from "@/store";
import { moveToSweep } from "@/utils/matterport-sdk";
import { useTagsListQueryData } from "@/utils/hooks";

import { useNavigateToSweepHandler, useTags } from "./utils/hooks";

export function NavigationMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  const { data } = useTagsListQueryData();

  const { instance } = useSdkInstanceStore();

  const navigateToSweepHandler = useNavigateToSweepHandler();

  useTags();

  return (
    <Menu className={cn("absolute top-4 right-4 z-10", className)} {...props}>
      {data && !!instance ? (
        data.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={() =>
              moveToSweep(instance, record.sweepId, {
                transition: instance.Sweep.Transition.INSTANT,
              })
            }
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
            onClick={() => navigateToSweepHandler(record.sweepId)}
          >
            Navigate to {record.label.toLowerCase()}
          </button>
        ))
      ) : (
        <button type="button" className="skeleton h-9 mt-0.5" />
      )}
    </Menu>
  );
}
