'use client';

import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface BalanceCardProps {
  title: string;
  balance: string;
  symbol: string;
  usdValue: string;
  change: string;
  isPositive: boolean;
}

export function BalanceCard({
  title,
  balance,
  symbol,
  usdValue,
  change,
  isPositive,
}: BalanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='card p-6 hover:bg-slate-700/50 transition-all duration-300 group'
    >
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>
          {title}
        </h3>
        <div
          className={`flex items-center space-x-1 text-sm ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isPositive ? (
            <ArrowUpIcon className='w-4 h-4' />
          ) : (
            <ArrowDownIcon className='w-4 h-4' />
          )}
          <span className='font-medium'>{change}</span>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='flex items-baseline space-x-2'>
          <span className='text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300'>
            {balance}
          </span>
          <span className='text-lg text-gray-400 font-medium'>{symbol}</span>
        </div>

        <p className='text-lg text-gray-300 font-semibold'>{usdValue}</p>
      </div>

      {/* Decorative element */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl' />
    </motion.div>
  );
}
