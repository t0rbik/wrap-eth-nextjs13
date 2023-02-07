'use client';

import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, provider } = configureChains(
  [arbitrum],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? 'will fallback to public' }), publicProvider()],
);

const client = createClient({
  autoConnect: false,
  provider,
  connectors: [new InjectedConnector({ chains })],
});

export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
