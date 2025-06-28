'use client';

import { useState, useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface WalletInfoProps {
  address: string;
}

export function WalletInfo({ address }: WalletInfoProps) {
  const [copied, setCopied] = useState(false);
  const { chain } = useAccount();

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy address');
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='card p-6'
    >
      <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
        <div className='flex items-center space-x-4'>
          {/* Avatar */}
          <div className='gradient-border rounded-full p-0.5'>
            <div className='w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center'>
              <span className='text-xl font-bold text-white'>
                {address.slice(2, 4).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Wallet Details */}
          <div>
            <div className='flex items-center space-x-2 mb-2'>
              <h2 className='text-2xl font-bold text-white'>
                {ensName || 'Anonymous User'}
              </h2>
              {ensName && (
                <span className='bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium'>
                  ENS
                </span>
              )}
            </div>

            <div className='flex items-center space-x-2'>
              <code className='bg-slate-700 px-3 py-1 rounded-lg text-gray-300 font-mono text-sm'>
                {formatAddress(address)}
              </code>
              <button
                onClick={copyToClipboard}
                className='p-1 hover:bg-slate-700 rounded transition-colors duration-200'
                title='Copy full address'
              >
                {copied ? (
                  <CheckIcon className='w-4 h-4 text-green-400' />
                ) : (
                  <ClipboardIcon className='w-4 h-4 text-gray-400 hover:text-white' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Network Info */}
        <div className='flex items-center space-x-4'>
          <div className='text-right'>
            <p className='text-sm text-gray-400'>Connected to</p>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
              <span className='text-white font-semibold'>
                {chain?.name || 'Ethereum Mainnet'}
              </span>
            </div>
          </div>

          {/* Network Icon */}
          <div className='w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>
              {chain?.name?.charAt(0) || 'E'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
