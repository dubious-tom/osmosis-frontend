import { queryICNSName } from "@osmosis-labs/server";
import { useQuery } from "@tanstack/react-query";

import { ChainList } from "~/config/generated/chain-list";
import { OSMOSIS_CHAIN_ID_OVERWRITE } from "~/config/env";

export const useICNSName = ({ address }: { address: string }) => {
  // Disable ICNS for local chains (e.g., localosmosis-oasis)
  const isLocalChain = OSMOSIS_CHAIN_ID_OVERWRITE?.startsWith("localosmosis") || OSMOSIS_CHAIN_ID_OVERWRITE?.includes("local");
  
  return useQuery({
    queryKey: ["icns-name", address],
    queryFn: () => queryICNSName({ address, chainList: ChainList }),
    enabled: !isLocalChain && Boolean(address) && typeof address === "string",
    select: ({ data: { names, primary_name } }) => {
      return {
        names: names,
        primaryName: primary_name,
      };
    },
  });
};
