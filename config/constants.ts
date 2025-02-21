if (!process.env.NEXT_PUBLIC_MATTER_PORT_SDK) {
  throw new Error("NEXT_PUBLIC_MATTER_PORT_SDK is not defined");
}

if (!process.env.NEXT_PUBLIC_MATTER_MODEL_ID) {
  throw new Error("NEXT_PUBLIC_MATTER_MODEL_ID is not defined");
}

export const mapSdkKey = process.env.NEXT_PUBLIC_MATTER_PORT_SDK;

export const mapModelId = process.env.NEXT_PUBLIC_MATTER_MODEL_ID;

export const sunPosition: [number, number, number] = [10, 10, 30];
export const shadowCameraResolution = 40;
export const ambientLightIntensity = 0.8;

export const sceeneNodePosition = {
  x: -16.55393409729004,
  y: 0,
  z: -4.34904670715332,
};
