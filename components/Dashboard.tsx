'use client';

import { useState, useEffect } from 'react';
import { WalletInfo } from './dashboard/WalletInfo';
import { BalanceCard } from './dashboard/BalanceCard';
import { NFTGallery } from './dashboard/NFTGallery';
import { TransactionHistory } from './dashboard/TransactionHistory';
import { ActivityFeed } from './dashboard/ActivityFeed';
import { Navigation } from './dashboard/Navigation';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import toast from 'react-hot-toast';

interface DashboardProps {
  address: string;
}

export function Dashboard({ address }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useAccount();

  const { data: ethBalance } = useBalance({
    address: address as `0x${string}`,
  });

  useEffect(() => {
    if (isConnected) {
      // Simulate initial loading
      const timer = setTimeout(() => {
        setIsLoading(false);
        toast.success('Dashboard loaded successfully!');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-900'>
        <div className='text-center'>
          <LoadingSpinner size='lg' />
          <p className='mt-4 text-gray-400'>Loading your Web3 dashboard...</p>
        </div>
      </div>
    );
  }

  const ethBalanceFormatted = ethBalance
    ? parseFloat(formatEther(ethBalance.value)).toFixed(4)
    : '0.0000';

  return (
    <div className='min-h-screen bg-slate-900'>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Welcome to your Web3 Dashboard
          </h1>
          <p className='text-gray-400'>
            Monitor your crypto assets, NFTs, and blockchain activity
          </p>
        </div>

        {activeTab === 'overview' && (
          <div className='space-y-8'>
            {/* Wallet Info */}
            <WalletInfo address={address} />

            {/* Balance Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <BalanceCard
                title='ETH Balance'
                balance={ethBalanceFormatted}
                symbol='ETH'
                usdValue='$0.00' // Would be calculated from real price API
                change='+0.00%'
                isPositive={true}
              />
              <BalanceCard
                title='Total Tokens'
                balance='0'
                symbol='TOKENS'
                usdValue='$0.00'
                change='+0.00%'
                isPositive={true}
              />
              <BalanceCard
                title='NFTs Owned'
                balance='0'
                symbol='NFTs'
                usdValue='$0.00'
                change='+0.00%'
                isPositive={true}
              />
            </div>

            {/* NFT Gallery Preview */}
            <div className='card p-6'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                NFT Collection
              </h2>
              <NFTGallery address={address} preview={true} />
            </div>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='card p-6'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  Recent Transactions
                </h2>
                <TransactionHistory address={address} limit={5} />
              </div>
              <div className='card p-6'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  Activity Feed
                </h2>
                <ActivityFeed address={address} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <BalanceCard
                title='ETH Balance'
                balance={ethBalanceFormatted}
                symbol='ETH'
                usdValue='$0.00'
                change='+0.00%'
                isPositive={true}
              />
              <BalanceCard
                title='Total Portfolio'
                balance='0.0000'
                symbol='USD'
                usdValue='$0.00'
                change='+0.00%'
                isPositive={true}
              />
              <BalanceCard
                title='24h Change'
                balance='0.00'
                symbol='%'
                usdValue='$0.00'
                change='+0.00%'
                isPositive={true}
              />
            </div>
          </div>
        )}

        {activeTab === 'nfts' && (
          <div className='space-y-8'>
            <NFTGallery address={address} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className='space-y-8'>
            <TransactionHistory address={address} />
          </div>
        )}
      </main>
    </div>
  );
}
