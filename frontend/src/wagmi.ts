import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "MegaRacing",
  projectId: "MEGARACING_DEMO",
  chains: [baseSepolia],
  ssr: false,
});
