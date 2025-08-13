import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { MessageCircle, Clock } from 'lucide-react';

export const ChatPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <GlassCard className="p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat Coming Soon</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Real-time messaging and collaboration features are currently in development. 
          Stay tuned for updates!
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Expected release: Q2 2024</span>
        </div>
      </GlassCard>
    </div>
  );
};
