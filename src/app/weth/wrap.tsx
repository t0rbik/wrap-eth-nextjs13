'use client';

import { useState } from 'react';
import {
  usePrepareSendTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import * as Switch from '@radix-ui/react-switch';
import { Label } from '@radix-ui/react-label';
import * as Toast from '@radix-ui/react-toast';

import { Token, CheckedAmount } from '@/types/types';
import { wethABI } from '@/abis/wethABI';

export default function Wrap({ tokens }: { tokens: Token[] }) {
  const [amount, setAmount] = useState('0');
  const [isUnwrap, setIsUnwrap] = useState(false);
  const [error, setError] = useState<Error>();

  const { config: wrapConfig, error: wrapError } = usePrepareSendTransaction({
    request: {
      to: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      value: parseEther(amount),
    },
  });
  const { sendTransaction: wrap, data: wrapData } = useSendTransaction(wrapConfig);

  const { config: unwrapConfig, error: unwrapError } = usePrepareContractWrite({
    chainId: 42161,
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    abi: wethABI,
    functionName: 'withdraw',
    args: [parseEther(amount)],
  });
  const { write: unwrap, data: unwrapData } = useContractWrite(unwrapConfig);

  const {
    fetchStatus: transactionStatus,
    data: receipt,
    error: transactionError,
  } = useWaitForTransaction({
    chainId: 42161,
    hash: wrapData?.hash || unwrapData?.hash,
  });

  const onSwitchChange = () => {
    setIsUnwrap(!isUnwrap);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(CheckedAmount.parse(e.target.value));
  };
  const onClick = isUnwrap === false ? () => wrap?.() : () => unwrap?.();

  const inputText1 = isUnwrap === false ? 'ETH' : 'WETH';
  const inputText2 = isUnwrap === false ? 'WETH' : 'ETH';
  const buttonText = isUnwrap === false ? 'Wrap' : 'Unwrap';

  return (
    <div className="relative my-auto mt-0 flex flex-col items-center p-4 pt-0 md:p-6">
      <section className="w-full max-w-md">
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
          <div className="mb-2 flex h-24 w-full items-center justify-between rounded-xl bg-white p-1.5 transition-shadow hover:shadow hover:shadow-gray-300">
            <input
              id="token0"
              type="number"
              autoComplete="false"
              className="h-12 w-48 bg-transparent p-2 text-2xl font-medium outline-none md:w-60"
              value={amount}
              onChange={onInputChange}
            />
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
          disabled={(isUnwrap && !unwrap) || (!isUnwrap && !wrap) || amount === '0'}
        >
          {buttonText}
        </button>
      </section>
      {error && (
        <Toast.Root
          type="foreground"
          className="flex flex-col items-center rounded-md p-4 shadow-xl radix-state-closed:animate-hide radix-state-open:animate-slideIn radix-swipe-cancel:translate-x-0 radix-swipe-cancel:transition-transform radix-swipe-end:animate-swipeOut radix-swipe-move:translate-x-radix-toast-swipe-move-x"
        >
          <Toast.Title>Error!</Toast.Title>
          <Toast.Description>{error.message}</Toast.Description>
          <Toast.Close aria-label="Close">
            <span aria-hidden>x</span>
          </Toast.Close>
        </Toast.Root>
      )}
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-96 max-w-screen-sm flex-col gap-2 p-6" />
      Currently support:
      {tokens.map((token) => token.symbol)}
    </div>
  );
}

// layout
// handle errors and amount of tokens user have (useBalance)
