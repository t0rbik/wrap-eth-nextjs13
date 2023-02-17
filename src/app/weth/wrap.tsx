'use client';

import { useState } from 'react';
import {
  useNetwork,
  useSwitchNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { parseEther } from 'ethers/lib/utils';
import { Label } from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';
import * as Toast from '@radix-ui/react-toast';

import { useBalances } from '@/hooks/useBalances';

import { getNetworkExplorerUrl } from '@/utils/network';
import { Token, CheckedAmount } from '@/types/types';
import { wethABI } from '@/abis/wethABI';

export default function Wrap({ tokens }: { tokens: Token[] }) {
  const { chain } = useNetwork();
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork({
    chainId: arbitrum.id,
  });

  const [amount, setAmount] = useState('0');
  const [isUnwrap, setIsUnwrap] = useState(false);
  const { ethBalance, wethBalance } = useBalances();

  const { config: wrapConfig } = usePrepareSendTransaction({
    request: {
      to: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      value: parseEther(amount),
    },
  });
  const { sendTransaction: wrap, data: wrapData, isLoading: isWrapping } = useSendTransaction(wrapConfig);

  const { config: unwrapConfig } = usePrepareContractWrite({
    chainId: 42161,
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    abi: wethABI,
    functionName: 'withdraw',
    args: [parseEther(amount)],
  });
  const { write: unwrap, data: unwrapData, isLoading: isUnwrapping } = useContractWrite(unwrapConfig);

  const {
    isLoading: isWaitingForTransaction,
    data: receipt,
    error: transactionError,
  } = useWaitForTransaction({
    chainId: 42161,
    hash: wrapData?.hash || unwrapData?.hash,
    onSuccess: () => {
      setAmount('0');
    },
  });

  const onSwitchChange = () => {
    setIsUnwrap(!isUnwrap);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(CheckedAmount.parse(e.target.value));
  };
  const onClick = isUnwrap === false ? () => wrap?.() : () => unwrap?.();

  const insufficientBalance =
    (isUnwrap && wethBalance?.value.lt(parseEther(amount))) || (!isUnwrap && ethBalance?.value.lt(parseEther(amount)));

  const inputText1 = isUnwrap === false ? 'ETH' : 'WETH';
  const inputText2 = isUnwrap === false ? 'WETH' : 'ETH';
  const buttonText =
    isWaitingForTransaction || isWrapping || isUnwrapping ? 'Minting...' : isUnwrap === false ? 'Wrap' : 'Unwrap';
  const buttonDisabled =
    (isUnwrap && !unwrap) ||
    (!isUnwrap && !wrap) ||
    amount === '0' ||
    isUnwrapping ||
    isWrapping ||
    isWaitingForTransaction;

  console.info('got tokens from server side component <<', tokens);
  return (
    <div className="relative my-auto mt-0 flex flex-col items-center p-4 pt-0 md:p-6">
      <section
        className={`relative w-full max-w-md ${
          chain?.unsupported
            ? 'after:absolute after:-top-2 after:-left-2 after:h-[110%] after:w-[110%] after:backdrop-blur-sm'
            : ''
        }`}
      >
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-1 md:justify-end">
            <Label htmlFor="wrap-switch">Wrap</Label>
            <Switch.Root
              id="wrap-switch"
              checked={isUnwrap}
              onCheckedChange={onSwitchChange}
              className="h-6 w-10 rounded-full bg-slate-900 shadow-sm focus:shadow-md radix-state-checked:bg-black"
            >
              <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white shadow-sm transition-transform will-change-transform radix-state-checked:translate-x-4" />
            </Switch.Root>
            <Label htmlFor="wrap-switch">Unwrap</Label>
          </div>
          <div className="relative mb-2 flex h-24 w-full items-center justify-between rounded-xl bg-white p-1.5 transition-shadow hover:shadow hover:shadow-gray-300">
            <input
              id="token0"
              type="number"
              autoComplete="false"
              className={`h-12 w-48 flex-grow bg-transparent p-2 text-2xl font-medium ${
                insufficientBalance ? 'pb-4 text-red-500' : 'text-black'
              } outline-none transition-all duration-300 md:w-60`}
              value={amount}
              onChange={onInputChange}
            />
            <div className={`${insufficientBalance ? 'absolute bottom-2 left-4 inline-block text-red-500' : 'hidden'}`}>
              Insufficient balance
            </div>
            <Label htmlFor="token0" className="pr-2">
              {inputText1}
            </Label>
          </div>
          <div className="flex h-24 w-full items-center justify-between rounded-xl bg-white p-1.5">
            <input
              id="token1"
              type="number"
              className="h-12 w-48 bg-transparent p-2 text-2xl font-medium outline-none md:w-60"
              value={amount}
              readOnly
            />
            <Label htmlFor="token1" className="pr-2">
              {inputText2}
            </Label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-black p-4 text-lg font-semibold text-white transition-colors hover:bg-green-400 active:bg-green-600 disabled:bg-zinc-300 disabled:opacity-60"
          onClick={onClick}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
        {chain?.unsupported && (
          <button
            disabled={isSwitching}
            className="absolute bottom-1/3 left-0 z-10 w-full rounded-xl bg-black p-4 text-lg font-semibold text-white transition-colors hover:bg-green-400 active:bg-green-600 disabled:bg-green-600 disabled:shadow-sm disabled:shadow-slate-400"
            onClick={() => switchNetwork?.()}
          >
            {isSwitching ? 'Switching...' : 'Switch Network'}
          </button>
        )}
      </section>
      <ReceiptOrErrorToast receipt={receipt} transactionError={transactionError} chain={chain} />
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-96 max-w-screen-sm flex-col gap-2 p-6" />
    </div>
  );
}

function ReceiptOrErrorToast({
  receipt,
  transactionError,
  chain,
}: {
  receipt: ReturnType<typeof useWaitForTransaction>['data'];
  transactionError: Error | null;
  chain: ReturnType<typeof useNetwork>['chain'];
}) {
  if (!!receipt)
    return (
      <Toast.Root
        type="foreground"
        className="relative flex flex-col items-start gap-2 rounded-md p-4 shadow-xl radix-state-closed:animate-hide radix-state-open:animate-slideIn radix-swipe-cancel:translate-x-0 radix-swipe-cancel:transition-transform radix-swipe-end:animate-swipeOut radix-swipe-move:translate-x-radix-toast-swipe-move-x"
      >
        <Toast.Title>LFG!</Toast.Title>
        <Toast.Description>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`${getNetworkExplorerUrl(chain?.id)}/tx/${receipt.transactionHash}`}
            className="text-blue-500 transition-colors duration-300 ease-in-out hover:text-blue-700"
          >
            Transaction receipt
          </a>
        </Toast.Description>
        <Toast.Close aria-label="Close" className="absolute top-2 right-2">
          <span aria-hidden>x</span>
        </Toast.Close>
      </Toast.Root>
    );

  if (!!transactionError)
    return (
      <Toast.Root
        type="foreground"
        className="flex flex-col items-center rounded-md p-4 shadow-xl radix-state-closed:animate-hide radix-state-open:animate-slideIn radix-swipe-cancel:translate-x-0 radix-swipe-cancel:transition-transform radix-swipe-end:animate-swipeOut radix-swipe-move:translate-x-radix-toast-swipe-move-x"
      >
        <Toast.Title className="text-red-500">Error!</Toast.Title>
        <Toast.Description>{transactionError?.message}</Toast.Description>
        <Toast.Close aria-label="Close" className="absolute top-1 right-1">
          <span aria-hidden>x</span>
        </Toast.Close>
      </Toast.Root>
    );

  return null;
}
