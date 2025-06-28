'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CubeIcon, EyeIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface NFT {
  id: string;
  name: string;
  description?: string;
  image: string;
  collection: string;
  tokenId: string;
}

interface NFTGalleryProps {
  address: string;
  preview?: boolean;
}

export function NFTGallery({ address, preview = false }: NFTGalleryProps) {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  useEffect(() => {
    // Simulate NFT loading - in real app, fetch from Alchemy or similar
    const timer = setTimeout(() => {
      // Demo NFTs with base64 encoded images to avoid network issues
      const demoNFTs: NFT[] = [
        {
          id: '1',
          name: 'Cool Cat #1234',
          description: 'A cool cat from the Cool Cats collection',
          image:
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4YjVjZjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNHB4IiBmb250LXdlaWdodD0iYm9sZCI+Q29vbCBDYXQ8L3RleHQ+PC9zdmc+',
          collection: 'Cool Cats',
          tokenId: '1234',
        },
        {
          id: '2',
          name: 'Bored Ape #5678',
          description: 'A bored ape from the BAYC collection',
          image:
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNTllMGIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlZjQ0NDQiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNiKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMHB4IiBmb250LXdlaWdodD0iYm9sZCI+Qm9yZWQgQXBlPC90ZXh0Pjwvc3ZnPg==',
          collection: 'Bored Ape Yacht Club',
          tokenId: '5678',
        },
        {
          id: '3',
          name: 'Doodle #9999',
          description: 'A colorful doodle',
          image:
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMGI5ODEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZjc2NmUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNjKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNHB4IiBmb250LXdlaWdodD0iYm9sZCI+RG9vZGxlPC90ZXh0Pjwvc3ZnPg==',
          collection: 'Doodles',
          tokenId: '9999',
        },
      ];

      setNfts(demoNFTs);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [address]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-center'>
          <LoadingSpinner size='lg' />
          <p className='mt-4 text-gray-400'>Loading your NFT collection...</p>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className='text-center py-12'>
        <CubeIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <h3 className='text-xl font-medium text-gray-300 mb-2'>
          No NFTs Found
        </h3>
        <p className='text-gray-400'>
          Connect a wallet with NFTs to see your collection here.
        </p>
      </div>
    );
  }

  const displayNFTs = preview ? nfts.slice(0, 3) : nfts;

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {displayNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='card p-4 hover:scale-105 transition-all duration-300 group cursor-pointer'
            onClick={() => setSelectedNFT(nft)}
          >
            <div className='relative aspect-square mb-4 rounded-lg overflow-hidden'>
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover transition-transform duration-300 group-hover:scale-110'
                priority={index < 3}
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center'>
                <EyeIcon className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
            </div>

            <div>
              <h4 className='font-bold text-white mb-1 truncate'>{nft.name}</h4>
              <p className='text-sm text-gray-400 mb-2 truncate'>
                {nft.collection}
              </p>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-gray-500'>#{nft.tokenId}</span>
                <div
                  className='w-2 h-2 bg-green-400 rounded-full'
                  title='Owned'
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {preview && nfts.length > 3 && (
        <div className='text-center mt-6'>
          <p className='text-gray-400'>
            Showing 3 of {nfts.length} NFTs.{' '}
            <button className='text-indigo-400 hover:text-indigo-300 font-medium'>
              View all NFTs →
            </button>
          </p>
        </div>
      )}

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setSelectedNFT(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='card p-6 max-w-md w-full'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative aspect-square mb-4 rounded-lg overflow-hidden'>
              <Image
                src={selectedNFT.image}
                alt={selectedNFT.name}
                fill
                sizes='400px'
                className='object-cover'
              />
            </div>

            <h3 className='text-xl font-bold text-white mb-2'>
              {selectedNFT.name}
            </h3>
            <p className='text-gray-400 mb-4'>{selectedNFT.collection}</p>
            {selectedNFT.description && (
              <p className='text-gray-300 text-sm mb-4'>
                {selectedNFT.description}
              </p>
            )}

            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>
                Token ID: #{selectedNFT.tokenId}
              </span>
              <button
                onClick={() => setSelectedNFT(null)}
                className='btn-secondary text-sm'
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
