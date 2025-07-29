import { useQuery } from "@tanstack/react-query";

export function useSupportedChains() {
  return useQuery({
    queryKey: ["supported-chains"],
    queryFn: () => fetch(`/api/supported-chains`).then((res) => res.json()),
    enabled: true,
  });
}
