'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface Activity {
  id: string;
  type: 'notification' | 'alert' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface ActivityFeedProps {
  address: string;
}

export function ActivityFeed({ address }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate activity loading - in real app, this would come from notifications service
    const timer = setTimeout(() => {
      const demoActivities: Activity[] = [
        {
          id: '1',
          type: 'achievement',
          title: 'Portfolio Milestone',
          message: 'Your portfolio has reached a new all-time high! 🎉',
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
          read: false,
        },
        {
          id: '2',
          type: 'notification',
          title: 'New NFT Received',
          message: 'You received a new NFT in your collection: Cool Cat #1234',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          read: false,
        },
        {
          id: '3',
          type: 'alert',
          title: 'Gas Price Alert',
          message:
            'Gas prices have dropped below 50 gwei. Good time to make transactions!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true,
        },
        {
          id: '4',
          type: 'info',
          title: 'Market Update',
          message: 'ETH price has increased by 5.2% in the last 24 hours',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: true,
        },
        {
          id: '5',
          type: 'notification',
          title: 'Transaction Confirmed',
          message: 'Your swap of 1000 USDT to ETH has been confirmed',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
        },
      ];

      setActivities(demoActivities);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [address]);

  const markAsRead = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, read: true } : activity
      )
    );
  };

  const markAllAsRead = () => {
    setActivities((prev) =>
      prev.map((activity) => ({ ...activity, read: true }))
    );
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'achievement':
        return <SparklesIcon className='w-5 h-5 text-yellow-400' />;
      case 'notification':
        return <BellIcon className='w-5 h-5 text-blue-400' />;
      case 'alert':
        return <ExclamationTriangleIcon className='w-5 h-5 text-orange-400' />;
      case 'info':
        return <InformationCircleIcon className='w-5 h-5 text-gray-400' />;
      default:
        return <InformationCircleIcon className='w-5 h-5 text-gray-400' />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'achievement':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'notification':
        return 'border-blue-400/30 bg-blue-400/5';
      case 'alert':
        return 'border-orange-400/30 bg-orange-400/5';
      case 'info':
        return 'border-gray-400/30 bg-gray-400/5';
      default:
        return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>
          <LoadingSpinner size='md' />
          <p className='mt-2 text-gray-400 text-sm'>Loading activity...</p>
        </div>
      </div>
    );
  }

  const unreadCount = activities.filter((a) => !a.read).length;

  return (
    <div className='space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <BellIcon className='w-5 h-5 text-gray-400' />
          <span className='text-sm text-gray-400'>Activity Feed</span>
          {unreadCount > 0 && (
            <span className='bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium'>
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className='text-xs text-indigo-400 hover:text-indigo-300 font-medium'
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Activities */}
      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`border rounded-lg p-4 transition-all duration-200 hover:bg-slate-700/30 ${getActivityColor(
              activity.type
            )} ${!activity.read ? 'border-l-4' : ''}`}
          >
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0 mt-0.5'>
                {getActivityIcon(activity.type)}
              </div>

              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between mb-1'>
                  <h4
                    className={`text-sm font-medium ${
                      !activity.read ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {activity.title}
                  </h4>

                  {!activity.read && (
                    <button
                      onClick={() => markAsRead(activity.id)}
                      className='flex-shrink-0 p-1 hover:bg-slate-600 rounded transition-colors duration-200'
                      title='Mark as read'
                    >
                      <CheckIcon className='w-3 h-3 text-gray-400 hover:text-white' />
                    </button>
                  )}
                </div>

                <p className='text-sm text-gray-400 mb-2'>{activity.message}</p>

                <p className='text-xs text-gray-500'>
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className='text-center py-8'>
          <BellIcon className='w-12 h-12 text-gray-400 mx-auto mb-3' />
          <h3 className='text-lg font-medium text-gray-300 mb-1'>
            No Activity
          </h3>
          <p className='text-gray-400 text-sm'>
            Your wallet activity and notifications will appear here.
          </p>
        </div>
      )}

      {/* Settings */}
      <div className='border-t border-slate-700 pt-4'>
        <button className='text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200'>
          Notification Settings →
        </button>
      </div>
    </div>
  );
}
