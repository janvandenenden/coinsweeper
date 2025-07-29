import { useQuery } from "@tanstack/react-query";

export function usePrice(
  address: string,
  currency: string = "USD",
  chain: number = 1
) {
  return useQuery({
    queryKey: ["price", address, currency, chain],
    queryFn: () =>
      fetch(
        `/api/price?address=${address}&currency=${currency}&chain=${chain}`
      ).then((res) => res.json()),
    enabled: !!address,
  });
}
