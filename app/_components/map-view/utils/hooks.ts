"use client";

import React from "react";

import { sceeneNodePosition } from "@/config/constants";
import { useSdkInstanceStore } from "@/store/matterport-sdk";

export function useInitializeSceene() {
  const { instance } = useSdkInstanceStore();

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
      });

      node.addComponent(instance.Scene.Component.AMBIENT_LIGHT, {
        enabled: true,
        color: {
          r: 1,
          g: 0.94,
          b: 0.85,
        },
        intensity: 0.8,
      });

      node.addComponent(instance.Scene.Component.GLTF_LOADER, {
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

      const lightComponent = node.addComponent(
        instance.Scene.Component.DIRECTIONAL_LIGHT,
        {
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
        }
      );

      node.position.x = sceeneNodePosition.x;
      node.position.y = sceeneNodePosition.y;
      node.position.z = sceeneNodePosition.z;

      node.start();

      const directionalLight = lightComponent.outputs.objectRoot?.children.find(
        ({ type }) => type === "DirectionalLight"
      );

      if (directionalLight) {
        directionalLight.castShadow = true;
      }
    }

    initializeScene();
  }, [instance]);
}
