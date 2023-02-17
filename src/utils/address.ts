import type { Address } from 'wagmi';

export function shortenAddress(str: Address) {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4);
}
