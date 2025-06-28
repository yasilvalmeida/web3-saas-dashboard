'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3 SaaS Dashboard',
  description: 'A comprehensive Web3 dashboard for managing your crypto assets',
  url: typeof window !== 'undefined' ? window.location.origin : '',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, polygon, arbitrum] as const;

// Only create config on client side
let wagmiConfig: any = null;
let web3ModalInitialized = false;

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      // Create wagmi config only once on client side
      if (!wagmiConfig) {
        wagmiConfig = defaultWagmiConfig({
          chains,
          projectId,
          metadata: {
            ...metadata,
            url: window.location.origin,
          },
          enableWalletConnect: true,
          enableInjected: true,
          enableEIP6963: true,
          enableCoinbase: true,
        });
      }

      // Initialize Web3Modal only once
      if (!web3ModalInitialized) {
        createWeb3Modal({
          wagmiConfig,
          projectId,
          enableAnalytics: false,
          themeMode: 'dark',
          themeVariables: {
            '--w3m-color-mix': '#6366f1',
            '--w3m-color-mix-strength': 20,
          },
        });
        web3ModalInitialized = true;
      }

      setIsReady(true);
    } catch (error) {
      console.warn('Web3 initialization error:', error);
      setIsReady(true); // Still set ready to avoid infinite loading
    }
  }, []);

  // Show loading spinner while initializing
  if (!isReady || !wagmiConfig) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-900'>
        <div className='text-center'>
          <div className='animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600 w-12 h-12 mx-auto mb-4' />
          <p className='text-gray-400'>Initializing Web3...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
