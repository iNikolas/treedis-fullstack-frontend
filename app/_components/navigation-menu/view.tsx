"use client";

import React from "react";

import { cn } from "@/utils/helpers";
import { Menu } from "@/components/ui/menu";
import { useSdkInstanceStore } from "@/store";
import { useTagsListQueryData } from "@/utils/hooks";
import { moveToSweep } from "@/utils/matterport-sdk";

import { useTags } from "./utils/hooks";

export function NavigationMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  const { data } = useTagsListQueryData();

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
    </Menu>
  );
}
