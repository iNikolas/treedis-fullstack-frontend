import React from "react";

import { useSdkInstanceStore } from "@/store";
import { useTagsListQueryData } from "@/utils/hooks";

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
