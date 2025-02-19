"use client";

import { mapModelId } from "@/config/constants";
import { MapFrame } from "@/components/containers/map-frame";
import { useSdkInstanceStore } from "@/store/matterport-sdk";

export function MapView(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const { instanceChanged } = useSdkInstanceStore();

  return <MapFrame modelId={mapModelId} onInit={instanceChanged} {...props} />;
}
