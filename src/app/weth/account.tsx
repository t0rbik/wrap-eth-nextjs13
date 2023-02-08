'use client';

import { useConnect, useDisconnect, useAccount } from 'wagmi';

import { useBalances } from '@/hooks/useBalances';

export default function Account() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { address, isDisconnected } = useAccount();

  const { wethBalance, ethBalance } = useBalances();

  return isDisconnected ? (
    <button onClick={() => connect({ connector: connectors[0] })}>Connect</button>
  ) : (
    <>
      <div>Connected {address}</div>
      <button onClick={() => disconnect()}>Disconnect</button>
      <div>
        Balance is {wethBalance?.formatted ?? '0'} WETH and {ethBalance?.formatted ?? '0'} ETH
      </div>
    </>
  );
}
