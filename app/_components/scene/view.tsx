import React from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";

import { Cat } from "@/components/containers/models/cat";

import { Light } from "./components/light";

export function Scene(props: CanvasProps) {
  return (
    <Canvas shadows {...props}>
      <Light />
      <React.Suspense fallback={null}>
        <Cat />
      </React.Suspense>
    </Canvas>
  );
}
