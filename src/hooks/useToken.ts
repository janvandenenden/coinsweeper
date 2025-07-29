import { useQuery } from "@tanstack/react-query";

export function useToken(address: string, chain: number = 1) {
  return useQuery({
    queryKey: ["token", address, chain],
    queryFn: () =>
      fetch(`/api/token?address=${address}&chain=${chain}`).then((res) =>
        res.json()
      ),
    enabled: !!address,
  });
}
