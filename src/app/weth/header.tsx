'use client';

import Link from 'next/link';

import { useConnect, useDisconnect, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { arbitrum } from 'wagmi/chains';

import { useBalances } from '@/hooks/useBalances';

import { shortenAddress } from '@/utils/address';
import { roboto_mono } from '@/utils/fonts';

export default function Header() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork();
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork({
    chainId: arbitrum.id,
  });

  const { address } = useAccount();

  const { wethBalance, ethBalance } = useBalances();

  const renderBalance = (formatted: string | undefined) => {
    if (!formatted) return '0';
    if (parseFloat(formatted) < 0.01) return '<0.01';
    return formatted;
  };

  return (
    <header className="flex h-12 items-center justify-between">
      <div className={`flex items-center justify-start gap-2 px-4 ${roboto_mono.className}`}>
        <Link href="/">Arbitrum Wrap-Eth</Link>
      </div>
      <div className="flex items-center justify-end gap-2 px-4">
        {!address ? (
          <button
            onClick={() => connect({ connector: connectors[0] })}
            className="h-9 rounded-xl border border-[#21232514] bg-white px-2 text-center text-xs font-semibold text-black transition-colors hover:bg-green-400 hover:text-white active:bg-green-500 active:text-white md:px-11 md:text-sm"
          >
            Connect wallet
          </button>
        ) : (
          <>
            <div className="flex h-9 items-center justify-between rounded-xl border border-[#21232514] bg-white px-4">
              {renderBalance(wethBalance?.formatted)} WETH
            </div>
            <div className="flex h-9 items-center justify-between rounded-xl border border-[#21232514] bg-white px-4">
              {renderBalance(ethBalance?.formatted)} ETH
            </div>
            <div className="hidden rounded-lg bg-green-200 px-2 py-1 font-light sm:block md:text-sm">
              {shortenAddress(address)}
            </div>
            <button
              disabled={isSwitching}
              onClick={chain?.unsupported ? () => switchNetwork?.() : () => disconnect()}
              className={`h-9 rounded-xl border border-[#21232514] ${
                chain?.unsupported ? 'bg-red-600 text-white' : 'bg-white text-black'
              } px-2 text-center text-xs font-semibold transition-colors hover:bg-green-400 hover:text-white active:bg-green-500 active:text-white disabled:bg-red-600 disabled:opacity-50 md:px-11 md:text-sm`}
            >
              {chain?.unsupported ? (isSwitching ? 'Switching...' : 'Switch Network') : 'Disconnect'}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
