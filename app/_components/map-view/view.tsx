"use client";

import React from "react";

import { mapModelId } from "@/config/constants";
import { MapFrame } from "@/components/containers/map-frame";
import { useSdkInstanceStore } from "@/store/matterport-sdk";
import { useCameraData, useCurrentSweepData } from "@/utils/hooks";

import { useInitializeSceene } from "./utils/hooks";

export function MapView(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const { instance, instanceChanged } = useSdkInstanceStore();

  useCurrentSweepData(instance);
  useCameraData(instance);
  useInitializeSceene();

  return <MapFrame modelId={mapModelId} onInit={instanceChanged} {...props} />;
}
