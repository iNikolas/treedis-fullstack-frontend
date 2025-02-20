if (!process.env.NEXT_PUBLIC_MATTER_PORT_SDK) {
  throw new Error("NEXT_PUBLIC_MATTER_PORT_SDK is not defined");
}

if (!process.env.NEXT_PUBLIC_MATTER_MODEL_ID) {
  throw new Error("NEXT_PUBLIC_MATTER_MODEL_ID is not defined");
}

export const mapSdkKey = process.env.NEXT_PUBLIC_MATTER_PORT_SDK;

export const mapModelId = process.env.NEXT_PUBLIC_MATTER_MODEL_ID;
