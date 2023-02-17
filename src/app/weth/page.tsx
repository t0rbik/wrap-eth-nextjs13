import Wrap from './wrap';
import { Token, SupportedTokens } from '@/types/types';

const tokenlist: Token[] = [
  {
    address: 'ETH',
    name: 'ETH',
    symbol: SupportedTokens.ETH,
    chainId: 42161,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    name: 'Wrapped Ether',
    symbol: SupportedTokens.WETH,
    chainId: 42161,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
];

const getTokens = async (): Promise<typeof tokenlist> => {
  return new Promise((resolve) => setTimeout(() => resolve(tokenlist), 1000));
};

export default async function WethPage() {
  const tokens = await getTokens();

  return (
    <>
      <Wrap tokens={tokens} />
    </>
  );
}
