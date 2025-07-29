import { useQuery } from "@tanstack/react-query";

export function useBalance(address: string, chain: number = 1) {
  return useQuery({
    queryKey: ["balance", address, chain],
    queryFn: () =>
      fetch(`/api/balance?address=${address}&chain=${chain}`).then((res) =>
        res.json()
      ),
    enabled: !!address,
  });
}
