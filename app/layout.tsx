import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/providers/Web3Provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 SaaS Dashboard',
  description: 'A comprehensive Web3 dashboard for managing your crypto assets',
  keywords: 'Web3, cryptocurrency, dashboard, MetaMask, WalletConnect, DeFi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Web3Provider>
          {children}
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}
