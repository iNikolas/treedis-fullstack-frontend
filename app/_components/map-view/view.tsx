"use client";

import React from "react";

import { mapModelId } from "@/config/constants";
import { MapFrame } from "@/components/containers/map-frame";
import { useSdkInstanceStore } from "@/store/matterport-sdk";
import { useCameraData, useCurrentSweepData } from "@/utils/hooks";

export function MapView(props: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const { instance, instanceChanged } = useSdkInstanceStore();

  useCurrentSweepData(instance);

  useCameraData(instance);

  React.useEffect(() => {
    async function initializeScene() {
      if (!instance) {
        return;
      }

      const [sceneObject] = await instance.Scene.createObjects(1);
      const node = sceneObject.addNode();

      await instance.Scene.configure(function (renderer, three) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = three.PCFSoftShadowMap;

        console.log(renderer);
      });

      node.addComponent("mp.ambientLight", {
        enabled: true,
        color: {
          r: 1,
          g: 0.94,
          b: 0.85,
        },
        intensity: 0.8,
      });

      node.addComponent("mp.gltfLoader", {
        url: "/models/cat.glb",
        visible: true,
        localScale: {
          x: 0.01,
          y: 0.01,
          z: 0.01,
        },
        localPosition: {
          x: 0,
          y: 0,
          z: 0,
        },
        localRotation: { x: -90, y: -175, z: 0 },
      });

      node.addComponent("mp.directionalLight", {
        enabled: true,
        color: {
          r: 1,
          g: 0.94,
          b: 0.85,
        },
        intensity: 0.8,
        position: {
          x: 15,
          y: 2,
          z: 8,
        },
        target: {
          x: 0,
          y: 0,
          z: 0,
        },
        debug: true,
      });

      node.position.x = -16.55393409729004;
      node.position.y = 0;
      node.position.z = -4.34904670715332;

      node.start();
    }

    initializeScene();
  }, [instance]);

  return <MapFrame modelId={mapModelId} onInit={instanceChanged} {...props} />;
}
