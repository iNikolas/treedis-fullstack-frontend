import React from "react";

import { assertIsShowcaseEmbedWindow } from "@/utils/assertions";

import { MapFrameProps } from "../types";

export function useSdkInit(onInit: MapFrameProps["onInit"]) {
  const [error, setError] = React.useState("");
  const mapRef = React.useRef<HTMLIFrameElement>(null);
  const inInitHandlerRef = React.useRef<MapFrameProps["onInit"] | null>(null);

  React.useLayoutEffect(() => {
    inInitHandlerRef.current = onInit ?? null;
  }, [onInit]);

  React.useEffect(() => {
    async function connectSdk() {
      if (!mapRef.current?.contentWindow) {
        return;
      }

      try {
        const showcaseWindow = mapRef.current.contentWindow;

        assertIsShowcaseEmbedWindow(showcaseWindow);

        const mapSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);

        if (inInitHandlerRef.current) {
          inInitHandlerRef.current(mapSdk);
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Oops, something went wrong..."
        );
      }
    }

    connectSdk();
  }, []);

  return { ref: mapRef, error };
}
