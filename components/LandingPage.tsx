'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
  WalletIcon,
  ChartBarIcon,
  CubeIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function LandingPage() {
  const { open } = useWeb3Modal();

  const features = [
    {
      icon: WalletIcon,
      title: 'Multi-Wallet Support',
      description:
        'Connect with MetaMask, WalletConnect, and more popular wallets',
    },
    {
      icon: ChartBarIcon,
      title: 'Portfolio Tracking',
      description:
        'Monitor your ETH and token balances across multiple networks',
    },
    {
      icon: CubeIcon,
      title: 'NFT Gallery',
      description:
        'View and manage your NFT collection with beautiful thumbnails',
    },
    {
      icon: BoltIcon,
      title: 'Real-time Updates',
      description: 'Get live transaction history and portfolio notifications',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-800/20 to-indigo-800/20' />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h1 className='text-5xl md:text-7xl font-bold mb-6'>
              <span className='text-gradient'>Web3</span>{' '}
              <span className='text-white'>Dashboard</span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto'>
              Your comprehensive Web3 portfolio manager. Track assets, view
              NFTs, and monitor transactions across multiple blockchain
              networks.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => open()}
              className='btn-primary text-lg px-8 py-4 mb-16'
            >
              Connect Wallet to Get Started
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20'
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className='card p-6 text-center hover:bg-slate-700/50 transition-all duration-300'
              >
                <div className='gradient-border rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                  <feature.icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-400'>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow' />
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow' />
        </div>
      </div>

      {/* Footer */}
      <footer className='relative border-t border-slate-700 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-gray-400'>
            <p>
              &copy; 2024 Web3 SaaS Dashboard. Built with Next.js and Web3
              technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
