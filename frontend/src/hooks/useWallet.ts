import { useAccount, connect, disconnect } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export function useWallet() {
  const account = useAccount();

  return {
    address: account.address,
    chain: account.chain,
    isConnected: account.isConnected,
    connect,
    disconnect,
  };
}
