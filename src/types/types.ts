import { z } from 'zod';
import { parseEther } from 'ethers/lib/utils';

export interface Token {
  address: string;
  name: string;
  symbol: SupportedTokens;
  chainId: number;
  decimals: number;
  logoURI: string;
}

export enum SupportedTokens {
  WETH = 'WETH',
  ETH = 'ETH',
}

export const CheckedAmount = z
  .string()
  .refine((val) => {
    try {
      if (+val < 0) throw new Error('Negative number');
      return parseEther(val);
    } catch (e) {
      return false;
    }
  })
  .catch('0');
