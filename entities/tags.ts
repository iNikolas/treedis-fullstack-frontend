import { Vector3 } from "@/types/sdk";

export interface Tag {
  id: string;
  position: Vector3;
  stemVector: Vector3;
  label: string;
  description: string;
  sweepId: string;
}
