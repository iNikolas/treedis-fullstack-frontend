"use client";

import React from "react";

import { mapModelId } from "@/config/constants";
import { useCurrentSweepData } from "@/utils/hooks";
import { MapFrame } from "@/components/containers/map-frame";
import { useSdkInstanceStore } from "@/store/matterport-sdk";

export function MapView(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const { instance, instanceChanged } = useSdkInstanceStore();

  useCurrentSweepData(instance);

  return <MapFrame modelId={mapModelId} onInit={instanceChanged} {...props} />;
}
