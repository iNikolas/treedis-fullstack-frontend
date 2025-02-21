import React from "react";

import { cn } from "@/utils/helpers";
import { mapSdkKey } from "@/config/constants";

import { MapFrameProps } from "./types";
import { useSdkInit } from "./utils/hooks";

export function MapFrame({
  className,
  modelId,
  onInit,
  autoplay = true,
  ...props
}: MapFrameProps) {
  const { ref, error } = useSdkInit(onInit);

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <iframe
      ref={ref}
      className={cn("w-full h-full", className)}
      src={`/matterport-bundle/showcase.html?m=${modelId}&play=${autoplay}&applicationKey=${mapSdkKey}`}
      allowFullScreen
      {...props}
    />
  );
}
