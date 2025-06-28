'use client';

import { useAccount } from 'wagmi';
import { LandingPage } from '@/components/LandingPage';
import { Dashboard } from '@/components/Dashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useEffect, useState } from 'react';

export default function Home() {
  const { address, isConnecting, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to prevent hydration mismatch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isConnecting) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  return (
    <main className='min-h-screen'>
      {isConnected && address ? (
        <Dashboard address={address} />
      ) : (
        <LandingPage />
      )}
    </main>
  );
}
