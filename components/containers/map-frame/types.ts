import { CommonMpSdk } from "@/types/sdk";

export interface MapFrameProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  modelId: string;
  onInit?: (sdk: CommonMpSdk) => void;
  autoplay?: boolean;
}
