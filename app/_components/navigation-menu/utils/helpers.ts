import * as THREE from "three";

import { officeLightColor } from "@/config/constants";
import { Graph, MpSdk, Sweep, Vector3 } from "@/types/sdk";

import {
  accentMarkerColor,
  markerSize,
  primaryMarkerColor,
} from "../config/constants";

export function createMarker(
  position: Vector3,
  three: typeof THREE,
  color = primaryMarkerColor
) {
  const geometry = new three.CircleGeometry(markerSize, 64);
  const material = new three.MeshStandardMaterial({ color });
  const point = new three.Mesh(geometry, material);

  point.rotation.x = -Math.PI / 2;
  point.receiveShadow = true;
  point.position.set(position.x, position.y - 1, position.z);

  return point;
}

export async function buildPathMarkersNode({
  instance,
  path,
}: {
  instance: MpSdk;
  path: Graph.Vertex<Sweep.ObservableSweepData>[];
}) {
  const [sceneObject] = await instance.Scene.createObjects(1);
  const node = sceneObject.addNode();

  const lightComponent = node.addComponent(
    instance.Scene.Component.AMBIENT_LIGHT,
    {
      enabled: true,
      color: officeLightColor,
      intensity: 0.8,
    }
  );

  node.start();
  const THREE = lightComponent.context.three;

  const stepDistance = markerSize * 4;
  const root = lightComponent.outputs.objectRoot;

  if (!root || path.length < 2) {
    return;
  }

  root.add(createMarker(path[0].data.position, THREE, accentMarkerColor));

  for (let i = 0; i < path.length - 1; i++) {
    const { position: start } = path[i].data;
    const { position: end } = path[i + 1].data;

    const distance = Math.hypot(end.x - start.x, end.z - start.z);
    const numPoints = Math.floor(distance / stepDistance);

    for (let j = 1; j <= numPoints; j++) {
      const t = j / numPoints;
      const interpolated = {
        x: start.x + t * (end.x - start.x),
        y: start.y + t * (end.y - start.y),
        z: start.z + t * (end.z - start.z),
      };
      root.add(createMarker(interpolated, THREE));
    }
  }

  return node;
}
