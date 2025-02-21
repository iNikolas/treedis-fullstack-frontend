import React from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useLoader, ThreeElements } from "@react-three/fiber";

import { catModelScale } from "./config/constants";

export function Cat(props: Partial<ThreeElements["primitive"]>) {
  const { scene: cat } = useLoader(GLTFLoader, "./models/cat.glb");

  return (
    <primitive
      children-0-castShadow
      children-0-rotation-x={0}
      children-0-rotation-y={Math.PI / 4}
      children-0-scale={[catModelScale, catModelScale, catModelScale]}
      object={cat}
      {...props}
    />
  );
}
