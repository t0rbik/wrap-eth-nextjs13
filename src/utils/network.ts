import type { Chain } from 'wagmi';
import { arbitrum } from 'wagmi/chains';

const getNetworkExplorerUrl = (chain: Chain['id'] | undefined) => {
  switch (chain) {
    case arbitrum.id:
      return 'https://arbiscan.io/';
    default:
      return undefined;
  }
};

export { getNetworkExplorerUrl };
