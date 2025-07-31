import { TabsContent } from "./ui/tabs";
import { usePrice } from "@/hooks/usePrice";
import { useToken } from "@/hooks/useToken";
import { useState, useEffect } from "react";
import { ChainWithBalances, TokenMap, TokenInfo } from "@/lib/types";
import Image from "next/image";
import { formatUnits } from "viem";

export default function AssetsPerChain({
  chain,
  balances,
}: {
  chain: ChainWithBalances;
  balances: Record<string, string>;
}) {
  const [tokens, setTokens] = useState<TokenMap>({});
  const [loading, setLoading] = useState(true);
  const { data: priceInUSD, isLoading: isPriceInUSDLoading } = usePrice(
    Object.keys(balances).join(","),
    "USD",
    chain.id
  );
  const { data: token, isLoading: isTokenLoading } = useToken(
    Object.keys(balances).join(","),
    chain.id
  );

  useEffect(() => {
    if (
      token &&
      priceInUSD &&
      balances &&
      Object.keys(token).length > 0 &&
      !isPriceInUSDLoading &&
      !isTokenLoading
    ) {
      const combinedTokenData = Object.keys(token).reduce((acc, key) => {
        acc[key] = {
          ...token[key],
          balance: balances[key],
          priceInUSD: priceInUSD[key],
          isSelected: true,
        };
        return acc;
      }, {} as Record<string, TokenInfo>);
      setTokens(combinedTokenData);
      setLoading(false);
    }
  }, [token, priceInUSD, balances]);

  const formatBalance = (balance: string, decimals: number) => {
    const balanceNum = parseFloat(formatUnits(BigInt(balance), decimals));
    return balanceNum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const formatDollarValue = (
    balance: string,
    decimals: number,
    priceInUSD: string
  ) => {
    const balanceNum = parseFloat(formatUnits(BigInt(balance), decimals));
    const price = parseFloat(priceInUSD);
    const dollarValue = balanceNum * price;
    return dollarValue.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <TabsContent className="w-full p-4" value={chain.name}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-2">
          {Object.values(tokens).map((token) => (
            <div
              key={token.address}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={token.isSelected}
                  onChange={() => {
                    // Handle checkbox change if needed
                  }}
                  className="w-4 h-4"
                />
                <Image
                  src={token.logoURI}
                  alt={token.symbol}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="font-medium">{token.symbol}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {formatBalance(token.balance, token.decimals)} {token.symbol}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDollarValue(
                    token.balance,
                    token.decimals,
                    token.priceInUSD
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
  );
}
