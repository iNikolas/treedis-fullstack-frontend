import { MpSdk } from "@/types/sdk";

export interface MapFrameProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  modelId: string;
  onInit?: (sdk: MpSdk) => void;
  autoplay?: boolean;
}
