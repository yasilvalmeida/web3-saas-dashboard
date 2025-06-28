'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

interface Transaction {
  hash: string;
  type: 'send' | 'receive' | 'swap' | 'mint';
  amount: string;
  token: string;
  to?: string;
  from?: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed';
  gasUsed?: string;
  value?: string;
}

interface TransactionHistoryProps {
  address: string;
  limit?: number;
}

export function TransactionHistory({
  address,
  limit,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate transaction loading - in real app, fetch from Alchemy or similar
    const timer = setTimeout(() => {
      const demoTransactions: Transaction[] = [
        {
          hash: '0x1234567890abcdef1234567890abcdef12345678',
          type: 'receive',
          amount: '0.5',
          token: 'ETH',
          from: '0xabcdef1234567890abcdef1234567890abcdef12',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          status: 'success',
          gasUsed: '21000',
          value: '$1,234.56',
        },
        {
          hash: '0xabcdef1234567890abcdef1234567890abcdef12',
          type: 'send',
          amount: '100',
          token: 'USDC',
          to: '0x1234567890abcdef1234567890abcdef12345678',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          status: 'success',
          gasUsed: '45000',
          value: '$100.00',
        },
        {
          hash: '0x9876543210fedcba9876543210fedcba98765432',
          type: 'swap',
          amount: '1000',
          token: 'USDT → ETH',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          status: 'success',
          gasUsed: '120000',
          value: '$1,000.00',
        },
        {
          hash: '0xfedcba9876543210fedcba9876543210fedcba98',
          type: 'mint',
          amount: '1',
          token: 'NFT',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          status: 'success',
          gasUsed: '85000',
          value: '$0.05',
        },
      ];

      const filteredTransactions = limit
        ? demoTransactions.slice(0, limit)
        : demoTransactions;
      setTransactions(filteredTransactions);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [address, limit]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>
          <LoadingSpinner size='md' />
          <p className='mt-2 text-gray-400 text-sm'>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='text-center py-8'>
        <ClockIcon className='w-12 h-12 text-gray-400 mx-auto mb-3' />
        <h3 className='text-lg font-medium text-gray-300 mb-1'>
          No Transactions
        </h3>
        <p className='text-gray-400 text-sm'>
          Your transaction history will appear here.
        </p>
      </div>
    );
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'receive':
        return <ArrowDownIcon className='w-5 h-5 text-green-400' />;
      case 'send':
        return <ArrowUpIcon className='w-5 h-5 text-red-400' />;
      case 'swap':
        return (
          <div className='w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-xs'>
            ⇄
          </div>
        );
      case 'mint':
        return (
          <div className='w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center text-xs'>
            M
          </div>
        );
      default:
        return <div className='w-5 h-5 bg-gray-400 rounded-full' />;
    }
  };

  const getTransactionTitle = (tx: Transaction) => {
    switch (tx.type) {
      case 'receive':
        return 'Received';
      case 'send':
        return 'Sent';
      case 'swap':
        return 'Swapped';
      case 'mint':
        return 'Minted';
      default:
        return 'Transaction';
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className='space-y-3'>
      {transactions.map((tx, index) => (
        <motion.div
          key={tx.hash}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className='flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200 group'
        >
          <div className='flex items-center space-x-4'>
            <div className='flex-shrink-0'>{getTransactionIcon(tx.type)}</div>

            <div className='min-w-0 flex-1'>
              <div className='flex items-center space-x-2 mb-1'>
                <p className='text-sm font-medium text-white'>
                  {getTransactionTitle(tx)}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    tx.status === 'success'
                      ? 'bg-green-400/20 text-green-400'
                      : tx.status === 'pending'
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-red-400/20 text-red-400'
                  }`}
                >
                  {tx.status}
                </span>
              </div>

              <p className='text-sm text-gray-400'>
                {tx.amount} {tx.token}
                {tx.from && ` from ${formatAddress(tx.from)}`}
                {tx.to && ` to ${formatAddress(tx.to)}`}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <div className='text-right'>
              <p className='text-sm font-medium text-white'>{tx.value}</p>
              {tx.gasUsed && (
                <p className='text-xs text-gray-400'>
                  Gas: {parseInt(tx.gasUsed).toLocaleString()}
                </p>
              )}
            </div>

            <a
              href={`https://etherscan.io/tx/${tx.hash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-slate-600 rounded'
              title='View on Etherscan'
            >
              <ArrowTopRightOnSquareIcon className='w-4 h-4 text-gray-400 hover:text-white' />
            </a>
          </div>
        </motion.div>
      ))}

      {limit && (
        <div className='text-center pt-4'>
          <button className='text-indigo-400 hover:text-indigo-300 text-sm font-medium'>
            View all transactions →
          </button>
        </div>
      )}
    </div>
  );
}
