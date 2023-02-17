import Link from 'next/link';

import { kalam, roboto_mono } from '../utils/fonts';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className={`flex w-full items-center justify-between text-sm ${roboto_mono.className}`}>
        <p>Next.js 13 project</p>
        <a href="https://github.com/t0rbik" target="_blank" rel="noopener noreferrer">
          By <span className="underline visited:bg-green-600">t0rbik</span>
        </a>
      </div>
      <div className="relative">
        <div className="text-5xl font-bold">Wrapped ETH</div>
        <div className={`absolute text-3xl ${kalam.className} -right-1/4 w-max -rotate-6`}>On Arbitrum</div>
      </div>
      <div className="rounded-md border border-zinc-300 p-4 transition-shadow duration-300 hover:shadow-md">
        <Link href="/weth">
          <h2 className="">
            Wrap ETH <span>-&gt;</span>
          </h2>
          <p className="">Easily wrap and unwrap your ETH.</p>
        </Link>
      </div>
    </main>
  );
}
