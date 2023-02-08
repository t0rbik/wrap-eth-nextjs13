import { useAccount, useBalance } from 'wagmi';

export const useBalances = () => {
  const { address } = useAccount();

  const { data: wethBalance, error: wethBalanceError } = useBalance({
    chainId: 42161,
    address,
    token: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  });
  const { data: ethBalance, error: ethBalanceError } = useBalance({
    chainId: 42161,
    address,
  });

  return {
    wethBalance,
    wethBalanceError,
    ethBalance,
    ethBalanceError,
  };
};
