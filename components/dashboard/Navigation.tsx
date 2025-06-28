'use client';

import { useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
  HomeIcon,
  ChartBarIcon,
  CubeIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: HomeIcon },
    { id: 'portfolio', label: 'Portfolio', icon: ChartBarIcon },
    { id: 'nfts', label: 'NFTs', icon: CubeIcon },
    { id: 'transactions', label: 'Transactions', icon: ClockIcon },
  ];

  return (
    <nav className='bg-slate-800 border-b border-slate-700 sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-gradient'>Web3 Dashboard</h1>
          </div>

          {/* Navigation Tabs */}
          <div className='hidden md:flex space-x-1'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className='w-5 h-5 mr-2' />
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-4'>
            <button onClick={() => open()} className='btn-secondary text-sm'>
              Wallet Settings
            </button>
            <button
              onClick={handleDisconnect}
              className='flex items-center text-gray-300 hover:text-red-400 transition-colors duration-200'
              title='Disconnect Wallet'
            >
              <ArrowRightOnRectangleIcon className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden pb-4'>
          <div className='flex space-x-1 overflow-x-auto'>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <item.icon className='w-4 h-4 mr-2' />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
