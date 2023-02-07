'use client';

import { useConnect, useDisconnect, useAccount, useBalance } from 'wagmi';

export default function Account() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { address, isDisconnected } = useAccount();

  const { data: wethBalance } = useBalance({
    chainId: 42161,
    address,
    token: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  });
  const { data: ethBalance } = useBalance({
    chainId: 42161,
    address,
  });

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
