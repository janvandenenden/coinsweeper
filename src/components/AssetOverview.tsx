"use client";

import { useAccount } from "wagmi";
import { useBalances } from "@/hooks/useBalances";
import { useSupportedChains } from "@/hooks/useSupportedChains";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetsPerChain from "./AssetsPerChain";
import { ChainInfo, ChainWithBalances } from "@/lib/types";

export default function AssetOverview() {
  const { address, isConnected, isConnecting } = useAccount();
  const { data: balances, isLoading: isBalancesLoading } = useBalances(
    address as string
  );
  const { data: supportedChains, isLoading: isSupportedChainsLoading } =
    useSupportedChains();

  if (!isConnected) return <div>Connect your wallet to view your assets</div>;

  if (isConnecting || isBalancesLoading || isSupportedChainsLoading)
    return <div>Loading...</div>;

  if (!balances) return <div>No balances found</div>;

  const chainsWithBalances = supportedChains
    .filter((chain: ChainInfo) => balances[chain.chain_id])
    .map((chain: ChainInfo) => {
      return {
        name: chain.chain_name,
        logo: chain.chain_icon,
        id: chain.chain_id,
      };
    });

  return (
    <Tabs defaultValue={chainsWithBalances[0].name} className="w-full">
      <TabsList className="w-full">
        {chainsWithBalances.map((chain: ChainWithBalances) => (
          <TabsTrigger key={chain.name} value={chain.name}>
            {chain.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {chainsWithBalances.map((chain: ChainWithBalances) => (
        <AssetsPerChain
          key={chain.name}
          chain={chain}
          balances={balances[chain.id] as Record<string, string>}
        />
      ))}
    </Tabs>
  );
}
