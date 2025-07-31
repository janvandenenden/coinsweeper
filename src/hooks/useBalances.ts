import { useQuery } from "@tanstack/react-query";
import { useSupportedChains } from "./useSupportedChains";

interface Chain {
  chain_id: number;
  name: string;
  [key: string]: unknown;
}

export function useBalances(address: string) {
  const {
    data: supportedChains,
    isLoading: isLoadingChains,
    error: chainsError,
  } = useSupportedChains();

  const _supportedChains = supportedChains?.filter(
    (chain: Chain) => chain.chain_id !== 324 && chain.chain_id !== 59144
  );

  const balanceResults = useQuery({
    queryKey: ["balances", address],
    queryFn: async () => {
      if (!_supportedChains || !address) return {};

      const balancePromises = _supportedChains.map((chain: Chain) =>
        fetch(`/api/balance?address=${address}&chain=${chain.chain_id}`).then(
          (res) => res.json()
        )
      );

      const balances = await Promise.all(balancePromises);

      const result: Record<number, unknown> = {};

      _supportedChains.forEach((chain: Chain, index: number) => {
        const balance = balances[index];
        if (
          balance &&
          typeof balance === "object" &&
          Object.keys(balance).length > 0
        ) {
          result[chain.chain_id] = balance;
        }
      });
      return result;
    },
    enabled: !!address && !!_supportedChains && _supportedChains.length > 0,
  });

  return {
    data: balanceResults.data,
    isLoading: isLoadingChains || balanceResults.isLoading,
    error: chainsError || balanceResults.error,
    _supportedChains,
  };
}
