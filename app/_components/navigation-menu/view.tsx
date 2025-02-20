"use client";

import React from "react";

import { cn } from "@/utils/helpers";
import { Menu } from "@/components/ui/menu";
import { useSdkInstanceStore } from "@/store";
import { useTagsListQueryData } from "@/utils/hooks";

export function NavigationMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
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

  return (
    <Menu className={cn("absolute top-4 right-4 z-10", className)} {...props}>
      {data && !!instance ? (
        data.map((record) => (
          <button key={record.id} type="button">
            Teleport to {record.label.toLocaleLowerCase()}
          </button>
        ))
      ) : (
        <button type="button" className="skeleton h-9" />
      )}
    </Menu>
  );
}
