interface PositionApiResponse {
  x: number;
  y: number;
  z: number;
}

export interface TagApiResponse {
  id: string;
  label: string;
  description: string;
  position: PositionApiResponse;
  stemVector: PositionApiResponse;
  sweepId: string;
}
